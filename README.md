# CodeHub - Advanced Repository Management Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Status](https://img.shields.io/badge/status-Production-success.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [AI Features](#ai-features)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**CodeHub** is an enterprise-grade repository management platform built with the MERN stack (MongoDB, Express, React, Node.js). It provides a Git-like workflow experience with modern features including version control, issue tracking, collaborative development, and AI-powered commit message generation.

This project is a **GitHub-inspired clone** that replicates the core functionality and workflow of GitHub while offering a self-hosted, customizable alternative for teams and organizations.

The platform is designed for teams and developers who need a centralized solution for managing code repositories, tracking changes, and maintaining project documentation without relying on external Git hosting services.

### Key Highlights

- **Self-Hosted Solution**: Full control over your repository data
- **Git-Like Workflow**: Familiar commit, push, pull, and revert operations
- **Real-Time Collaboration**: Socket.IO integration for live updates
- **Secure Authentication**: JWT-based authentication with role-based access control
- **Cloud Storage**: Cloudinary integration for file uploads and version storage
- **AI-Enhanced**: Smart commit message generation using OpenAI
- **Scalable Architecture**: MongoDB for distributed data management

---

## ✨ Features

### Core Repository Management
- **Version Control**: Track file changes with unique commit IDs
- **Commit System**: Create commits with descriptive messages and metadata
- **Push/Pull Operations**: Synchronize repositories across environments
- **Revert Functionality**: Safely rollback to previous commit states
- **File Staging**: Stage files before committing changes

### Issue Tracking & Project Management
- **Issue Creation**: Create, assign, and track issues
- **Status Management**: Track issue lifecycle (Open, In Progress, Closed)
- **Issue Categorization**: Classify issues by type and priority
- **Issue Resolution**: Link commits to issue resolution
- **Issue Tracking Dashboard**: Visual overview of all project issues

### User Management & Security
- **User Authentication**: Secure JWT-based authentication system
- **Role-Based Access Control**: Different permission levels for users
- **User Profiles**: Comprehensive user information and contribution statistics
- **Repository Ownership**: Clear ownership and access control
- **Activity Logging**: Track all user actions and modifications

### Collaboration Features
- **Real-Time Updates**: Socket.IO for instant notifications
- **Collaborative Editing**: Multiple developers can work simultaneously
- **Repository Sharing**: Share repositories with team members
- **Permission Management**: Granular control over repository access

### AI-Powered Features (New)
- **Smart Commit Messages**: AI generates contextual commit messages from code changes
- **Conventional Commits Format**: Automatic adherence to commit standards
- **Code Analysis**: AI analyzes diffs to suggest improvements
- **Message Suggestions**: Multiple message options with one-click selection

### Cloud Integration
- **Cloudinary Upload**: Seamless file upload and storage
- **CDN Delivery**: Fast file distribution globally
- **Auto Optimization**: Automatic media optimization

---

## 🛠 Technology Stack

### Backend
| Technology | Purpose 
|------------|---------
| **Node.js** | Runtime Environment 
| **Express.js** | Web Framework 
| **MongoDB** | NoSQL Database | Cloud |
| **Mongoose** | ODM 
| **JWT** | Authentication 
| **Socket.IO** | Real-Time Communication 
| **Bcryptjs** | Password Hashing 
| **Cloudinary** | File Storage
| **OpenAI** | AI Integration 
| **Multer** | File Upload 

### Frontend
| Technology | Purpose 
|------------|---------
| **React** | UI Library 
| **Vite** | Build Tool 
| **React Router** | Navigation 
| **Axios** | HTTP Client 
| **Styled Components** | CSS-in-JS 
| **Primer UI** | Component Library 
| **Heat Map** | Data Visualization 

---

## 🏗 Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       CodeHub Platform                      │
└─────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
        ┌───▼────┐      ┌────▼─────┐      ┌───▼────┐
        │Frontend│      │ Backend  │      │External│
        │(React) │      │(Node.js) │      │Services│
        └───┬────┘      └────┬─────┘      └───┬────┘
            │                │                 │
        ┌───▼────────────────┼─────────────────┴────┐
        │                    │                      │
    ┌───▼────┐     ┌────────▼────────┐     ┌─────▼──┐
    │Socket  │     │   API Routes    │     │MongoDB │
    │  .IO   │     │   Controllers   │     │        │
    └────────┘     │   Middleware    │     └────────┘
                   └────────┬────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    ┌───▼────┐      ┌──────▼──────┐      ┌───▼────┐
    │JWT Auth│      │ Cloudinary  │      │OpenAI  │
    │        │      │   (Files)   │      │(AI)    │
    └────────┘      └─────────────┘      └────────┘
```

### Data Flow

1. **User Authentication**: JWT tokens issued on login
2. **Repository Operations**: init, add, commit, push, pull, revert
3. **Issue Management**: Create and track issues
4. **File Storage**: Files uploaded to Cloudinary
5. **AI Processing**: Code diffs sent to OpenAI for suggestions
6. **Real-Time Updates**: Socket.IO notifications to all connected clients

---

## 🚀 Installation

### Prerequisites
- Node.js v20 or higher
- MongoDB (Atlas or local)
- npm or yarn
- Git

### Backend Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Start Backend Server**
```bash
node index.js start
```

### Frontend Setup

1. **Navigate to Frontend**
```bash
cd ../frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Build for Production**
```bash
npm run build
```

## 💻 Usage

### CLI Commands

#### Initialize Repository
```bash
node index.js init
```

#### Add Files to Staging
```bash
node index.js add <filename>
```

#### Create Commit
```bash
node index.js commit "Your commit message"
```

#### Push Repository
```bash
node index.js push
```

#### Pull Repository
```bash
node index.js pull
```

#### Revert to Commit
```bash
node index.js revert <commitID>
```

### Web Interface

1. **Sign Up/Login**: Create account or login
2. **Create Repository**: Initialize new repository
3. **Manage Files**: Upload and organize files
4. **Track Issues**: Create and manage issues
5. **View Dashboard**: Monitor repository activity
6. **Generate Messages**: Use AI to create commit messages

---

## 📡 API Endpoints

### Authentication Endpoints
```
POST   /api/users/signup          - Register new user
POST   /api/users/login           - Login user
GET    /api/users/profile         - Get user profile
PUT    /api/users/profile         - Update user profile
```

### Repository Endpoints
```
GET    /api/repos                 - Get all repositories
POST   /api/repos                 - Create repository
GET    /api/repos/:id             - Get repository details
PUT    /api/repos/:id             - Update repository
DELETE /api/repos/:id             - Delete repository
GET    /api/repos/:id/commits     - Get repository commits
```

### Issue Endpoints
```
GET    /api/issues                - Get all issues
POST   /api/issues                - Create issue
GET    /api/issues/:id            - Get issue details
PUT    /api/issues/:id            - Update issue
DELETE /api/issues/:id            - Delete issue
```

### AI Endpoints
```
POST   /api/ai/generate-commit-message   - Generate commit message
```

### File Upload Endpoint
```
POST   /upload                    - Upload file to Cloudinary
```

---

## 📂 Project Structure

```
CodeHub-Project/
├── Backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── repoController.js
│   │   ├── issueController.js
│   │   ├── aiController.js
│   │   ├── commit.js
│   │   ├── push.js
│   │   ├── pull.js
│   │   ├── revert.js
│   │   └── add.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── repoModel.js
│   │   └── issueModel.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── authorizeMiddleware.js
│   ├── routes/
│   │   ├── user.router.js
│   │   ├── repo.router.js
│   │   ├── issue.router.js
│   │   ├── ai.router.js
│   │   └── main.router.js
│   ├── config/
│   │   └── cloudinary.js
│   ├── .env
│   ├── package.json
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── AiCommitHelper.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── StarButton.jsx
│   │   │   ├── repo/
│   │   │   │   └── Repository.jsx
│   │   │   ├── issue/
│   │   │   └── user/
│   │   │       ├── Profile.jsx
│   │   │       ├── HeatMap.jsx
│   │   │       └── StarRepos.jsx
│   │   ├── App.jsx
│   │   ├── Routes.jsx
│   │   ├── authContext.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── README.md
├── LICENSE
└── AI_SETUP_GUIDE.md
```

---

## 🤖 AI Features

### Smart Commit Message Generator

Powered by OpenAI's GPT-3.5 Turbo model, the AI feature automatically generates professional commit messages based on code changes.

**Features:**
- Analyzes code diffs automatically
- Follows Conventional Commits format
- Suggests appropriate commit type (feat, fix, refactor, etc.)
- Generates descriptive titles and detailed descriptions
- One-click message selection

**Usage:**
```jsx
import AiCommitHelper from "./components/AiCommitHelper";

<AiCommitHelper 
  changes={fileChanges}
  onSelectMessage={(message) => console.log(message)}
/>
```

**Setup:**
1. Get API key from https://platform.openai.com/api-keys
2. Add to `.env`: `OPENAI_API_KEY=sk-proj-your_key`
3. Component automatically generates suggestions

---

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: Bcryptjs for secure password storage
- **Role-Based Access**: Different permission levels
- **Token Expiration**: Automatic token refresh

### Data Protection
- **Encrypted Passwords**: SHA-256 with salt
- **Environment Variables**: Sensitive data not in code
- **CORS Protection**: Restricted cross-origin requests
- **Input Validation**: All inputs sanitized and validated

---



## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd Backend
npm test

# Frontend tests
cd ../frontend
npm test
```

### Test Coverage
- API endpoints
- Authentication flows
- Database operations
- Component rendering
- Error handling

---


## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Standards
- Use ESLint for linting
- Follow project folder structure
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before PR

---

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Vikrant Jadhav**
- GitHub: [@vikrantjadhav09](https://github.com/vikrantjadhav09)
- Email: vikrantj636@gmail.com
- LinkedIn: [jadhav-vikrant09](https://www.linkedin.com/in/jadhav-vikrant09)

---

## 🙏 Acknowledgments

- MongoDB for robust database
- Express.js for powerful backend framework
- React for amazing UI library
- OpenAI for cutting-edge AI capabilities
- Cloudinary for reliable file storage

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- 📧 Email: vikrantj636@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/vikrantjadhav09/CodeHub-Project/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/vikrantjadhav09/CodeHub-Project/discussions)

---

