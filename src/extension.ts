import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	let defaultCommmitMessage = 'files updated';
	let statusBarItem = createStatutBarItem('commit', 'comcom.commit');
	context.subscriptions.push(statusBarItem);

 
	vscode.commands.registerCommand('commit', (message) => {
		let commitMessage = message || defaultCommmitMessage;
		let terminal = createTerminal('comcom-cli');
		
		terminal.sendText(`echo git commit -a -m ${commitMessage}`);
		vscode.window.showInformationMessage('Last changes commited');
	});


	let comcomcommit = vscode.commands.registerCommand('comcom.commit', (message) => {

		vscode.window.showInputBox({
			placeHolder: `Default:${defaultCommmitMessage}`
		}).then( inputMessage => {
			vscode.commands.executeCommand('commit', inputMessage);
		});
	});

	context.subscriptions.push(comcomcommit);
}

export function deactivate() {}

const createStatutBarItem = (title:string, command:string) => {
	let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1);
	item.command = command;
	item.text =  title;
	item.show();
	return item;
};

const createTerminal = (terminalName:string) => {
	for (const terminal of vscode.window.terminals) {
		if (terminal.name === terminalName) {
			return terminal;
		}
	}
	return vscode.window.createTerminal(terminalName);
};
	
// const pattern = /commit:(.*)/gm;
// const editor = vscode.window.activeTextEditor;
// vscode.window.onDidChangeTextEditorSelection(retrieveSelect);
// function retrieveSelect() {
// 	if (editor) {
// 		const document = editor.document;
// 		const selection = editor.selection;
// 		const selected = document.getText(selection);
// 		let commitMessage = pattern.exec(selected);
// 		console.log(commitMessage);
// 	}
// }
