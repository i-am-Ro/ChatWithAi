# Chatbot Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to create AI agents/projects, maintain persistent chat histories, and communicate with LLMs via OpenRouter.

## Features

*   **User Authentication**: Secure Signup and Login using JWT.
*   **Project Management**: Create and manage multiple chat agents (Projects).
*   **AI Chat**: Real-time chat interface integrated with OpenRouter (GPT-4o-mini).
*   **Persistent Memory**: Chat history is saved in MongoDB and reloaded when you revisit a project.
*   **Responsive UI**: Modern, clean interface built with React and CSS.

## Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas URL)
*   An [OpenRouter API Key](https://openrouter.ai/) for AI functionality.

## Setup Instructions

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` folder with the following credentials:
    ```env
    PORT=8080
    MONGO_CONN=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    OPEN_API=your_openrouter_api_key
    ```
    > **Note:** Replace `your_openrouter_api_key` with a valid key starting with `sk-or-v1-...`.

4.  Start the backend server:
    ```bash
    npm start
    ```
    *The server will run on `http://localhost:8080`*

### 2. Frontend Setup

1.  Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React application:
    ```bash
    npm start
    ```
    *The application will open at `http://localhost:3000`*

## How to Use

1.  **Register/Login**: Create an account or log in.
2.  **Dashboard**: You will see a button to "Create New Project". Click it to create a new agent (e.g., "Math Tutor").
3.  **Chat**: Click on the project card to enter the chat interface.
4.  **Message**: Type your message. The AI will respond, and the conversation will be saved automatically.

## Deployment

To deploy this application (e.g., on Render or Netlify):
*   **Backend**: Build command `npm install`, Start command `node index.js`. Root directory: `backend`.
*   **Frontend**: Build command `npm run build`, Publish directory `build`. Root directory: `frontend`.
