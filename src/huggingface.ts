import axios from 'axios';

const API_URL = 'https://api-inference.huggingface.co/models/Salesforce/codegen-16B-multi';
const API_TOKEN = '<your-huggingface-token>';

export async function generateComments(code: string, context: string): Promise<string> {
    try {
        const response = await axios.post(
            API_URL,
            { inputs: `${context}\n\n${code}` },
            { headers: { Authorization: `Bearer ${API_TOKEN}` } }
        );
        return response.data[0].generated_text;
    } catch (error) {
        console.error('Error generating comments:', error);
        return 'Failed to generate comments.';
    }
}

export async function analyzeCodebase(dir: string): Promise<string> {
    let codebaseContext = '';
    
    function readFiles(dir: string) {
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                readFiles(fullPath);
            } else {
                const content = fs.readFileSync(fullPath, 'utf-8');
                codebaseContext += `\n\n${content}`;
            }
        });
    }

    readFiles(dir);
    return codebaseContext;
}
