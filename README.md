# CodeDocGen - VS Code Extension

## Abstract

**CodeDocGen** is a Visual Studio Code extension designed to automatically generate documentation for codebases using Hugging Face models. By leveraging advanced NLP capabilities, it reads and understands the entire codebase, allowing developers to generate contextual comments with a simple right-click in the editor. This tool enhances code readability and maintainability, making it easier for developers to understand and work with complex codebases.

## Features

- **Contextual Understanding:** Reads the entire codebase to provide more accurate and relevant comments.
- **Easy Integration:** Right-click in the editor to generate documentation for the selected code.
- **Webview Panel:** Displays generated comments in a styled webview panel.
- **Interactive UI:** Save comments directly from the webview.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd code-doc-gen
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Package the Extension:**
   ```bash
   vsce package
   ```

4. **Install the Extension:**
   - Open Visual Studio Code.
   - Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
   - Click on the three dots at the top right corner of the Extensions view, and select `Install from VSIX...`.
   - Select the generated `.vsix` file.

## Usage

1. **Open a Project:**
   Open a project folder in Visual Studio Code.

2. **Select Code:**
   Highlight the code block you want to generate documentation for.

3. **Generate Documentation:**
   Right-click on the highlighted code and select `Generate Docs` from the context menu.

4. **View Comments:**
   The generated comments will be inserted next to the selected code and displayed in the webview panel.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [VS Code Extension Manager (vsce)](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

### Project Structure

- **src/huggingface.ts:** Handles interaction with Hugging Face models for generating comments.
- **src/webview.ts:** Manages the webview panel that displays generated comments.
- **src/extension.ts:** Main entry point of the extension, registering commands and integrating functionalities.

### Building the Extension

1. **Compile the TypeScript:**
   ```bash
   npm run compile
   ```

2. **Launch the Extension:**
   - Press `F5` in Visual Studio Code to open a new window with your extension loaded.
   - Test the extension by selecting code and using the context menu to generate documentation.
  
### IntelliJ Plugin
So I added some files that are in java. You can build a plugin in IntelliJ to generate documentation for your code!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more details.

## Acknowledgments

Special thanks to Hugging Face for providing the models used in this extension.
