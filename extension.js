const vscode = require("vscode");

const activate = context => {
  let disposable = vscode.commands.registerCommand("extension.classNameCopier", () => {
    let editor = vscode.window.activeTextEditor;
    const document = editor.document;
    const position = editor.selection.start;
    const range = document.getWordRangeAtPosition(position, /[A-Za-z\-]+/);
    const className = document.getText(range);
    let testIndex = 0;
    let isFirstLine = true;
    vscode.window.showTextDocument(vscode.Uri.file(document.fileName.replace(".js", ".css")))
    .then(textDoc => {
      editor = vscode.window.activeTextEditor;
      editor.edit(editorBuilder => {
        const doc = editor.document;
        testIndex = doc.lineCount - 1;
        while (testIndex > 0) {
          if (doc.lineAt(testIndex).isEmptyOrWhitespace) testIndex -= 1;
          else break;
        }
        const endPos = doc.lineAt(testIndex).range.end;
        let snippet = "." + className + " {\n\t\n}";
        isFirstLine = testIndex === 0 && endPos.character === 0;
        if (!isFirstLine)
          snippet = "\n\n" + snippet;
        editorBuilder.insert(endPos, snippet);
      }).then(result => {
        const newPos = new vscode.Position(testIndex + (isFirstLine ? 1 : 3), 1);
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