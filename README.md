# Search Toggle Ignore Files

A simple VS Code extension that adds a command to quickly toggle the `search.useIgnoreFiles` setting. This allows you to easily switch between searching all files or respecting `.gitignore` patterns.

## Features

- **Quick Toggle**: Instantly toggle between showing all files and respecting `.gitignore` in search results
- **Visual Feedback**: Shows a notification message indicating the current state
- **Simple & Lightweight**: Does one thing well with no configuration needed

## Usage

1. Open the Command Palette (`Cmd+Shift+P` on macOS or `Ctrl+Shift+P` on Windows/Linux)
2. Type "Toggle Search: Use Ignore Files" and press Enter
3. The setting will toggle and you'll see a confirmation message

**Tip**: Assign a keyboard shortcut for even faster access! Go to `Preferences: Open Keyboard Shortcuts` and search for "Toggle Search: Use Ignore Files"

## What it does

When you toggle the setting:

- **ON (true)**: Search respects `.gitignore` - files in `.gitignore` won't appear in search results
- **OFF (false)**: Search shows all files - even those listed in `.gitignore`

This is especially useful when you need to search through `node_modules`, build artifacts, or other normally-ignored directories without permanently changing your settings.

## Extension Settings

This extension contributes the following settings:

- `toggleIgnoreFiles.toggleGlobally`: When enabled, the toggle command will update global (user) settings instead of workspace settings. Default: `false`

The extension toggles these built-in VS Code settings:

- `search.useIgnoreFiles`: When enabled, search will respect `.gitignore` files

## License

MIT
