const vscode = require('vscode');

const activate = context => {
  console.log ('className Copier is now active.');
  let disposable = vscode.commands.registerCommand('extension.classNameCopier', () => {
    vscode.window.showInformationMessage('classNameCopier activated');
  });
  context.subscriptions.push(disposable);
}

module.exports = {
  activate
};