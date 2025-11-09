import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Toggle Search Ignore Files Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Extension should be present', () => {
		assert.ok(vscode.extensions.getExtension('undefined_publisher.search-toggle-ignore-files'));
	});

	test('Command should be registered', async () => {
		// Activate the extension first
		const ext = vscode.extensions.getExtension('undefined_publisher.search-toggle-ignore-files');
		if (ext && !ext.isActive) {
			await ext.activate();
		}
		
		const commands = await vscode.commands.getCommands(true);
		assert.ok(commands.includes('search-toggle-ignore-files.toggle'));
	});

	test('Toggle command should change search.useIgnoreFiles setting', async () => {
		// Activate the extension first
		const ext = vscode.extensions.getExtension('undefined_publisher.search-toggle-ignore-files');
		if (ext && !ext.isActive) {
			await ext.activate();
		}
		
		// Store the initial value
		let config = vscode.workspace.getConfiguration('search');
		const initialValue = config.get<boolean>('useIgnoreFiles', true);
		
		// Execute the toggle command
		await vscode.commands.executeCommand('search-toggle-ignore-files.toggle');
		
		// Wait a bit for the configuration to update
		await new Promise(resolve => setTimeout(resolve, 100));
		
		// Re-fetch the configuration to get the updated value
		config = vscode.workspace.getConfiguration('search');
		const newValue = config.get<boolean>('useIgnoreFiles');
		assert.strictEqual(newValue, !initialValue);
		
		// Toggle back to restore original state
		await vscode.commands.executeCommand('search-toggle-ignore-files.toggle');
		await new Promise(resolve => setTimeout(resolve, 100));
		
		config = vscode.workspace.getConfiguration('search');
		const restoredValue = config.get<boolean>('useIgnoreFiles');
		assert.strictEqual(restoredValue, initialValue);
	});

	test('Toggle command should flip between true and false', async () => {
		// Activate the extension first
		const ext = vscode.extensions.getExtension('undefined_publisher.search-toggle-ignore-files');
		if (ext && !ext.isActive) {
			await ext.activate();
		}
		
		let config = vscode.workspace.getConfiguration('search');
		
		// Set to a known state (true)
		await config.update('useIgnoreFiles', true, vscode.ConfigurationTarget.Workspace);
		await new Promise(resolve => setTimeout(resolve, 100));
		
		// Toggle to false
		await vscode.commands.executeCommand('search-toggle-ignore-files.toggle');
		await new Promise(resolve => setTimeout(resolve, 100));
		
		config = vscode.workspace.getConfiguration('search');
		assert.strictEqual(config.get<boolean>('useIgnoreFiles'), false);
		
		// Toggle to true
		await vscode.commands.executeCommand('search-toggle-ignore-files.toggle');
		await new Promise(resolve => setTimeout(resolve, 100));
		
		config = vscode.workspace.getConfiguration('search');
		assert.strictEqual(config.get<boolean>('useIgnoreFiles'), true);
		
		// Clean up
		await config.update('useIgnoreFiles', undefined, vscode.ConfigurationTarget.Workspace);
	});
});
