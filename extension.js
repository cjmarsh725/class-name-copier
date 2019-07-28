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
    let testIndex = 0;
    vscode.window.showTextDocument(vscode.Uri.file(document.fileName.replace(".js", ".css")))
    .then(textDoc => {
      editor = vscode.window.activeTextEditor;
      editor.edit(editorBuilder => {
        const doc = editor.document;
        testIndex = doc.lineCount - 1;
        while (testIndex >= 0) {
          if (doc.lineAt(testIndex).isEmptyOrWhitespace) testIndex -= 1;
          else break;
        }
        const endPos = doc.lineAt(testIndex).range.end;
        editorBuilder.insert(endPos, "\n\n." + className + " {\n\t\n}");
      }).then(result => {
        const newPos = new vscode.Position(testIndex + 3, 1);
        const newSelection = new vscode.Selection(newPos, newPos);
        editor.selection = newSelection;
        editor.revealRange(newSelection.with());
      });
    });
  });
  context.subscriptions.push(disposable);
}

module.exports = {
  activate
};