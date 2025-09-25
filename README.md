# DevOps Assistant

An AI-powered chat application designed to streamline DevOps tasks. It can generate Terraform scripts, help manage and monitor cloud infrastructure (simulated), and organize your workflow with an integrated task manager.

![DevOps Assistant Screenshot](https://storage.googleapis.com/aistudio-ux-team-public/dev-portal-sample-apps/devops-assistant.png)

## ✨ Features

*   **🤖 AI-Powered Code Generation**: Utilizes Google Gemini or Azure OpenAI to generate Terraform (HCL) scripts based on natural language prompts.
*   **☁️ Multi-Cloud Support**: Easily switch between target cloud providers (AWS, Azure, GCP) for your infrastructure code.
*   **⚡️ Streaming Responses**: The AI's response is streamed in real-time for a more interactive experience.
*   **💻 Code Explorer**: View the generated Terraform code with syntax highlighting and a one-click copy-to-clipboard feature.
*   **📊 Infrastructure Health Dashboard**: A simulated monitoring panel displays key metrics like CPU, memory, and network usage for different cloud providers.
*   **✅ Task Manager**: Keep track of your to-do items with a simple task manager that persists your tasks in local storage.
*   **🎨 Sleek & Responsive UI**: Built with Tailwind CSS for a modern, clean, and responsive user interface that works great on all screen sizes.

## 🛠️ Tech Stack

*   **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **AI Services**:
    *   [Google Gemini API](https://ai.google.dev/) via `@google/genai` SDK
    *   [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 18 or later recommended)
*   [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/) package manager
*   API keys for the AI services you wish to use.

### Configuration

The application requires API credentials to be set up as environment variables.

1.  Create a `.env` file in the root of the project.
2.  Add the necessary variables to the `.env` file. You can use the example below as a template.

```sh
# For Google Gemini API
API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"

# For Azure OpenAI Service
AZURE_OPENAI_API_KEY="YOUR_AZURE_OPENAI_API_KEY"
AZURE_OPENAI_ENDPOINT="YOUR_AZURE_OPENAI_ENDPOINT"
AZURE_OPENAI_DEPLOYMENT_NAME="YOUR_AZURE_DEPLOYMENT_NAME"
```

**Note**: You only need to provide keys for the service(s) you intend to use. The application will show a warning if you try to use a service without the corresponding keys set.

### Installation & Running the App

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/devops-assistant.git
    cd devops-assistant
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application should now be running and accessible in your web browser, typically at `http://localhost:5173`.

## How to Use

1.  **Select AI Service**: Use the dropdown menu in the chat panel to choose between `Gemini` and `Azure OpenAI`.
2.  **Select Cloud Provider**: Use the next dropdown to set the target cloud for your Terraform script (`AWS`, `Azure`, or `GCP`).
3.  **Enter a Prompt**: In the chat input, type a description of the infrastructure you want to create. For example:
    *   "Create a Terraform script for an AWS S3 bucket with versioning enabled."
    *   "Generate a script for a basic Azure Virtual Network."
    *   "I need Terraform for a Google Cloud Storage bucket."
4.  **Send and View**: Press Enter or click the send button. The AI will generate an explanation and the corresponding Terraform code, which will appear in the "Terraform Explorer" on the right.
5.  **Explore Other Panels**: Click on the headers for "Infrastructure Health" and "Task Manager" to expand them and interact with the monitoring dashboard and your to-do list.
