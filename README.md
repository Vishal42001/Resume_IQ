# Resume AI - OpenAI Integration

An AI-powered resume analyzer that helps you optimize your resume against job descriptions using OpenAI's GPT models.

## Features

- **Resume Review**: Get detailed feedback on your resume's strengths and weaknesses
- **Resume Rewrite**: Automatically tailor your resume to match job descriptions
- **Job Analysis**: Analyze job descriptions to understand requirements and expectations
- **Multiple AI Models**: Choose between GPT-4o Mini, GPT-4o, or GPT-4 Turbo

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure OpenAI API Key

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your OpenAI API key:

```env
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
```

> **Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### 3. Get Your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to API Keys
4. Create a new secret key
5. Copy the key and paste it into your `.env` file

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Upload Resume**: Paste or upload your resume text
2. **Add Job Description**: Paste the job description you're applying for
3. **Select Model**: Choose your preferred GPT model from the dropdown
4. **Choose Mode**:
   - **Review**: Get feedback on your resume
   - **Rewrite**: Get a tailored version of your resume
   - **Analysis**: Analyze the job description
5. **Run Analysis**: Click the button to process

## Technology Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT Models
- **Document Processing**: PDF.js, Mammoth

## Security Note

The API key is stored in environment variables and never exposed in the UI. Make sure to:
- Keep your `.env` file secure
- Never commit API keys to version control
- Rotate your API keys regularly
- Monitor your OpenAI usage and billing

