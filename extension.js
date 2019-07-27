const vscode = require('vscode');

const activate = context => {
  console.log ('className Copier is now active.');
  let disposable = vscode.commands.registerCommand('extension.classNameCopier', () => {
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    const position = editor.selection.start;
    const range = document.getWordRangeAtPosition(position, /[a-z\-]+/);
    const word = document.getText(range);
    vscode.window.showInformationMessage("classNameCopier: " + word);
  });
  context.subscriptions.push(disposable);
}

module.exports = {
  activate
};