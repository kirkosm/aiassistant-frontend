# aiassistant-frontend

aiassistant-frontend is the frontend part of a full-stack AI chat application that allows users to register, log in, and chat with a Large Language Model (LLM) through a modern and interactive user interface.

The application is built using React and communicates with the backend (aiassistant-backend) via REST API.

## Features

- User registration and login with LocalStorage-based session handling
- Display and creation of new chat sessions
- Real-time message exchange with AI responses

## Tech Stack

- React (Vite)
- JavaScript
- CSS Modules
- Axios (for HTTP requests)
- LocalStorage (for user session management)

## Getting Started

1. Clone the repository

2. Install dependencies:

   npm install

3. Run the development server:

   npm run dev

## Backend Integration

The frontend sends HTTP requests to the backend (aiassistant-backend) using the following endpoints:

POST   /api/auth/signup      -> Register a new user  
POST   /api/auth/login       -> User login  
POST   /api/chat/message     -> Send message to the AI and receive response

Ensure that the backend server is running and accessible during frontend development.

![Login Page]([link](https://raw.githubusercontent.com/kirkosm/aiassistant-frontend/6b4af77507636781a845b1f956981b40cf3f018a/Log%20in.png))
![Settings]([link](https://raw.githubusercontent.com/kirkosm/aiassistant-frontend/6b4af77507636781a845b1f956981b40cf3f018a/Settings.png))
![Sign up]([link](https://raw.githubusercontent.com/kirkosm/aiassistant-frontend/6b4af77507636781a845b1f956981b40cf3f018a/Sign%20up.png))
![Welcome]([link](https://raw.githubusercontent.com/kirkosm/aiassistant-frontend/6b4af77507636781a845b1f956981b40cf3f018a/Welcome!.png))
![Chat]([link](https://raw.githubusercontent.com/kirkosm/aiassistant-frontend/6b4af77507636781a845b1f956981b40cf3f018a/Chat.png))
