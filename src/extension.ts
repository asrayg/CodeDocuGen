import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { generateComments, analyzeCodebase } from './huggingface';
import { createWebviewPanel } from './webview';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.generateDocs', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No editor is active');
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No folder or workspace opened');
            return;
        }

        const folderPath = workspaceFolders[0].uri.fsPath;
        const codebaseContext = await analyzeCodebase(folderPath);

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        if (!selectedText) {
            vscode.window.showErrorMessage('No code is selected');
            return;
        }

        const comments = await generateComments(selectedText, codebaseContext);

        editor.edit(editBuilder => {
            const commentPosition = selection.end.translate(0, 0);
            editBuilder.insert(commentPosition, `\n/* ${comments.trim()} */\n`);
        });

        const panel = createWebviewPanel(context);
        panel.webview.postMessage({ comments });

        panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'saveComments':
                    vscode.window.showInformationMessage('Comments saved.');
                    return;
            }
        });

        vscode.window.showInformationMessage('Comments generated and added to the code.');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
