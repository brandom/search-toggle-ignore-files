import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const toggleCommand = vscode.commands.registerCommand(
		'search-toggle-ignore-files.toggle',
		async () => {
			const config = vscode.workspace.getConfiguration('search');
			const current = config.get<boolean>('useIgnoreFiles', true);
			const newValue = !current;

			await config.update('useIgnoreFiles', newValue, vscode.ConfigurationTarget.Workspace);

			vscode.window.showInformationMessage(
				`search.useIgnoreFiles is now ${newValue ? 'ON (ignoring .gitignore)' : 'OFF (showing all files)'}`
			);
		}
	);

	context.subscriptions.push(toggleCommand);
}

export function deactivate() {}
