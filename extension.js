const vscode = require("vscode");

const activate = context => {
  console.log ("className Copier is now active.");
  let disposable = vscode.commands.registerCommand("extension.classNameCopier", () => {
    let editor = vscode.window.activeTextEditor;
    const document = editor.document;
    const position = editor.selection.start;
    const range = document.getWordRangeAtPosition(position, /[a-z\-]+/);
    const className = document.getText(range);
    vscode.window.showInformationMessage("classNameCopier: " + document.fileName.replace(".js", ".css"));
    vscode.window.showTextDocument(vscode.Uri.file(document.fileName.replace(".js", ".css")))
    .then(textDoc => {
      editor = vscode.window.activeTextEditor;
      editor.edit(editorBuilder => {
        const doc = editor.document;
        const pos = doc.lineAt(doc.lineCount - 1).range.end;
        editorBuilder.insert(pos, "This is a test");
      });
    });
  });
  context.subscriptions.push(disposable);
}

module.exports = {
  activate
};