// src/webview.ts
import * as vscode from 'vscode';

export function createWebviewPanel(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
        'codeComments',
        'Code Comments',
        vscode.ViewColumn.One,
        {
            enableScripts: true
        }
    );

    panel.webview.html = getWebviewContent();

    return panel;
}

function getWebviewContent() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Code Comments</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background-color: #f5f5f5;
                }
                h1 {
                    color: #333;
                }
                #comments {
                    background: #fff;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .comment {
                    margin-bottom: 10px;
                    padding: 10px;
                    background: #e8f5e9;
                    border-left: 4px solid #4caf50;
                }
                .comment:last-child {
                    margin-bottom: 0;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .button {
                    background-color: #4caf50;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                    border-radius: 4px;
                    border: none;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Generated Comments</h1>
                <button class="button" onclick="sendSaveCommand()">Save Comments</button>
            </div>
            <div id="comments"></div>
            <script>
                const vscode = acquireVsCodeApi();
                window.addEventListener('message', event => {
                    const message = event.data;
                    const commentsContainer = document.getElementById('comments');
                    commentsContainer.innerHTML = '';
                    message.comments.split('\\n').forEach(comment => {
                        const commentElement = document.createElement('div');
                        commentElement.className = 'comment';
                        commentElement.innerText = comment.trim();
                        commentsContainer.appendChild(commentElement);
                    });
                });

                function sendSaveCommand() {
                    vscode.postMessage({
                        command: 'saveComments'
                    });
                }
            </script>
        </body>
        </html>
    `;
}
