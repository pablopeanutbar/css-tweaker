# CSS Tweaker

Adjust CSS numeric values directly inside VS Code using your keyboard.

No DevTools, no manual editing of numbers, and no switching between your editor and browser.

## Features

- Increase and decrease CSS numeric values directly in the editor.
- Supports pixels, percentages, rem, em, viewport units, degrees, milliseconds and more.
- Works with decimal and negative values.
- Supports values inside `calc()` and CSS custom properties.
- Ignores numbers inside comments and strings.
- Configurable adjustment steps.
- Changes are part of your normal editor history, so you can undo them with `Ctrl + Z`.

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `↑` | Increase by 1 |
| `↓` | Decrease by 1 |
| `Shift + ↑` | Increase by 10 |
| `Shift + ↓` | Decrease by 10 |
| `Alt + ↑` | Increase by 0.1 |
| `Alt + ↓` | Decrease by 0.1 |

Shortcuts activate when your cursor is positioned on a supported CSS numeric value.

## Configuration

Customize the adjustment amounts through VS Code Settings.

Search for **CSS Tweaker** in Settings.

| Setting | Default |
|---|---:|
| `cssTweaker.steps.normal` | 1 |
| `cssTweaker.steps.large` | 10 |
| `cssTweaker.steps.precise` | 0.1 |

## Example

Before:

```css
.box {
    width: 300px;
    opacity: 0.5;
    transform: rotate(45deg);
}
```

Place your cursor on `300px` and press `↑`.

After:

```css
.box {
    width: 301px;
    opacity: 0.5;
    transform: rotate(45deg);
}
```

## Requirements

- Visual Studio Code 1.80.0 or later.
- A CSS file.

## Support

Found a bug or have a feature request? Open an issue in the project's GitHub repository.