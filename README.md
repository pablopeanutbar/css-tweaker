# CSS Tweaker

**Adjust CSS values directly inside VS Code using keyboard shortcuts.**

CSS Tweaker lets you increment and decrement numeric CSS values right from your editor, without manually selecting and editing numbers.

Inspired by the convenience of Chrome DevTools, it brings quick CSS value adjustments directly into your VS Code workflow.

[**Install CSS Tweaker**](https://marketplace.visualstudio.com/items?itemName=pablopeanutbar.css-tweaker) · [Report a Bug](https://github.com/pablopeanutbar/css-tweaker/issues)

 [**GitHub Repository**](https://github.com/pablopeanutbar/css-tweaker)

---

## Features

- **Quick adjustments:** Increase or decrease CSS values using keyboard shortcuts.
- **Multiple adjustment steps:** Make normal, large, or precise adjustments.
- **Unit support:** Works with `px`, `%`, `rem`, `em`, `deg`, and other CSS units.
- **Decimal support:** Handles decimal and negative values.
- **Unitless values:** Adjust values such as `opacity`, `z-index`, and more.
- **Smart detection:** Identifies numeric values inside CSS declarations.
- **Calc support:** Adjust values inside `calc()` expressions.
- **CSS custom properties:** Supports variables such as `--spacing` and `--radius`.
- **Safe editing:** Ignores numeric values inside comments and strings.
- **Undo support:** Use `Ctrl + Z` to revert your changes.

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `↑` | Increase by 1 |
| `↓` | Decrease by 1 |
| `Shift + ↑` | Increase by 10 |
| `Shift + ↓` | Decrease by 10 |
| `Alt + ↑` | Increase by 0.1 |
| `Alt + ↓` | Decrease by 0.1 |

Shortcuts activate when your cursor is positioned on a supported numeric CSS value. Normal arrow-key navigation remains unaffected elsewhere.

## Configuration

You can customize the adjustment steps through VS Code settings.

Open **Settings** (`Ctrl + ,`) and search for `CSS Tweaker`.

| Setting | Default | Description |
|---|---:|---|
| `cssTweaker.steps.normal` | `1` | Normal adjustment step |
| `cssTweaker.steps.large` | `10` | Large adjustment step |
| `cssTweaker.steps.precise` | `0.1` | Precise adjustment step |

## Example

Before:

```css
.card {
    width: 300px;
    opacity: 0.5;
    margin: -20px;
    transform: rotate(45deg);
    padding: calc(100% - 20px);
}
```

Place your cursor on a numeric value and use the shortcuts to adjust it instantly.

For example, pressing `Shift + ↑` on `300px` changes it to `310px`.

## Installation

1. Open [CSS Tweaker on the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=pablopeanutbar.css-tweaker).
2. Click **Install**.
3. Open a CSS file and place your cursor on a numeric value.
4. Use the keyboard shortcuts to adjust it.

## Supported Language

Currently supports **CSS** files.

## Feedback & Contributions

Found a bug or have an idea for improvement?

- [Report an Issue](https://github.com/pablopeanutbar/css-tweaker/issues)
- [View Source Code](https://github.com/pablopeanutbar/css-tweaker)

Contributions and suggestions are welcome!

---

**Made with ❤️ for developers who like tweaking CSS without the extra clicks.**