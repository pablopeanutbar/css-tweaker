import * as vscode from 'vscode';
import postcss from 'postcss';
import valueParser from 'postcss-value-parser';
import safeParser from 'postcss-safe-parser';



function getCSSValueAtCursor(editor) {
    const document = editor.document;
    const position = editor.selection.active;

    const css = document.getText();
    const offset = document.offsetAt(position);

    let result = null;

    try {
        const root = safeParser(css);

        root.walkDecls(decl => {
            if (result) return;

            const declarationStart = decl.source.start.offset;

            const rawValue = decl.raws.value?.raw ?? decl.value;

            const valueStart =
                declarationStart +
                decl.prop.length +
                decl.raws.between.length;

            const parsed = valueParser(rawValue);

            parsed.walk(node => {
                if (node.type !== 'word') return;

                const match = node.value.match(
                    /^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)([a-zA-Z%]*)$/i
                );

                if (!match) return;

                const startOffset = valueStart + node.sourceIndex;
                const endOffset = startOffset + node.value.length;

                if (offset >= startOffset && offset < endOffset) {
                    const start = document.positionAt(startOffset);
                    const end = document.positionAt(endOffset);

                    result = {
                        number: Number(match[1]),
                        unit: match[2],
                        line: start.line,
                        start: start.character,
                        end: end.character
                    };

                    return false;
                }
            });
        });
    } catch (error) {
        console.error('CSS parsing error:', error);
    }

    return result;
}


async function adjustValue(editor, step) {
    const result = getCSSValueAtCursor(editor);

    if (!result) return;

    const newNumber = Number(
        (result.number + step).toFixed(10)
    );

    const newValue = `${newNumber}${result.unit}`;

    const range = new vscode.Range(
        result.line,
        result.start,
        result.line,
        result.end
    );

    await editor.edit(editBuilder => {
        editBuilder.replace(range, newValue);
    });
}

export function activate(context) {
    console.log('CSS Tweaker activated!');

    // Check whether cursor is currently on a CSS numeric value
    function updateValueContext(editor) {
        const hasValue = !!(
            editor &&
            editor.document.languageId === 'css' &&
            getCSSValueAtCursor(editor)
        );

        vscode.commands.executeCommand(
            'setContext',
            'cssTweaker.valueAtCursor',
            hasValue
        );
    }

    // Read increment settings from VS Code settings
    function getStep(setting) {
        return vscode.workspace
            .getConfiguration('cssTweaker')
            .get(`steps.${setting}`);
    }

    // Watch cursor movement
    const cursorListener =
        vscode.window.onDidChangeTextEditorSelection(event => {
            const editor = event.textEditor;

            updateValueContext(editor);

            const result = editor.document.languageId === 'css'
                ? getCSSValueAtCursor(editor)
                : null;

            if (result) {
                console.log(
                    'Detected value:',
                    `${result.number}${result.unit}`
                );
            }
        });

    // Watch active editor changes
    const editorListener =
        vscode.window.onDidChangeActiveTextEditor(editor => {
            updateValueContext(editor);
        });

    // Register all six adjustment commands
    const commands = [
        ['cssTweaker.increaseValue', () => getStep('normal')],
        ['cssTweaker.decreaseValue', () => -getStep('normal')],
        ['cssTweaker.increaseTen', () => getStep('large')],
        ['cssTweaker.decreaseTen', () => -getStep('large')],
        ['cssTweaker.increaseDecimal', () => getStep('precise')],
        ['cssTweaker.decreaseDecimal', () => -getStep('precise')]
    ];

    const commandSubscriptions = commands.map(
        ([command, getAmount]) =>
            vscode.commands.registerCommand(command, () => {
                const editor = vscode.window.activeTextEditor;

                if (editor && editor.document.languageId === 'css') {
                    adjustValue(editor, getAmount());
                }
            })
    );

    // Initialize cursor context
    updateValueContext(vscode.window.activeTextEditor);

    // Register everything for cleanup
    context.subscriptions.push(
        cursorListener,
        editorListener,
        ...commandSubscriptions
    );
}

export function deactivate() {}
