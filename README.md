# To-Do App

A full-stack to-do application built with React frontend and Spring Boot backend, fully containerized with Docker.

## 🏗️ Architecture

- **Frontend**: React with Vite, using Vitest for testing
- **Backend**: Spring Boot (Java 21) with JPA/Hibernate
- **Database**: PostgreSQL
- **Containerization**: Docker with docker-compose

## 📋 Prerequisites

- Docker
- Docker Compose
- Linux development environment with Bash and GNU tools

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd to-do-app
```

### 2. Run the Application
```bash
# Start all services (frontend, backend, database)
docker-compose up
```

This will:
- Build and start the PostgreSQL database
- Build and start the Spring Boot backend API
- Build and start the React frontend
- Set up networking between all services

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Database**: localhost:5005 (if direct access needed)

## 🧪 Running Tests

### Option 1: Run All Tests
```bash
# Run both frontend and backend tests
docker-compose -f docker-compose.test.yml up --build
```

### Option 2: Run Frontend Tests Only
```bash
# Build and run frontend tests
docker build -f to-do-app-frontend/Dockerfile.test -t todo-frontend-test to-do-app-frontend
docker run --rm todo-frontend-test
```

### Option 3: Run Backend Tests Only
```bash
# Build and run backend tests
docker build -f to-do-app-backend/Dockerfile.test -t todo-backend-test to-do-app-backend
docker run --rm todo-backend-test
```

### Option 4: Run Tests Individually with docker-compose
```bash
# Run only frontend tests
docker-compose -f docker-compose.test.yml up frontend-test --build

# Run only backend tests
docker-compose -f docker-compose.test.yml up backend-test --build
```

## 📁 Project Structure

```
to-do-app/
├── docker-compose.yml              # Main application services
├── docker-compose.test.yml         # Test services
├── to-do-app-backend/              # Spring Boot backend
│   ├── Dockerfile                  # Production backend container
│   ├── Dockerfile.test             # Backend test container
│   ├── build.gradle               # Gradle build configuration
│   └── src/
│       ├── main/java/com/hus/todoapp/
│       │   ├── controller/        # REST controllers
│       │   ├── service/           # Business logic
│       │   ├── repository/        # Data access layer
│       │   ├── model/             # Entity classes
│       │   └── dto/               # Data transfer objects
│       └── test/java/com/hus/todoapp/
│           ├── controller/        # Controller tests
│           ├── service/           # Service tests
│           └── repository/        # Repository tests
└── to-do-app-frontend/             # React frontend
    ├── Dockerfile                  # Production frontend container
    ├── Dockerfile.test             # Frontend test container
    ├── package.json               # Node.js dependencies
    └── src/
        ├── components/            # React components
        │   ├── Form/             # Todo form component
        │   ├── TodoDisplay/      # Todo list component
        │   └── Navbar/           # Navigation component
        └── test/                 # Frontend tests
            ├── App.test.jsx
            ├── Form.test.jsx
            ├── TodoDisplay.test.jsx
            └── Navbar.test.jsx
```

## 🔧 Development

### Running in Development Mode

#### Frontend Development
```bash
cd to-do-app-frontend
npm install
npm run dev
```

#### Backend Development
```bash
cd to-do-app-backend
./gradlew bootRun
```

### Building Individual Components

#### Frontend Build
```bash
cd to-do-app-frontend
npm run build
```

#### Backend Build
```bash
cd to-do-app-backend
./gradlew build
```


## 🗄️ Database

The application uses PostgreSQL as the database. The database is automatically initialized when the containers start.

- **Database Name**: tododb
- **Username**: todo_user
- **Password**: todo_password
- **Port**: 5005 (mapped from container port 5432)

## 🔍 API Endpoints

The backend provides the following REST endpoints:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}/complete` - Mark task as complete
- `DELETE /api/tasks/{id}` - Delete a task

## 🧪 Test Coverage

### Frontend Tests
- **Framework**: Vitest with React Testing Library
- **Coverage**: Component unit tests for all React components
- **Test Files**: 4 test files covering App, Form, TodoDisplay, and Navbar components

### Backend Tests
- **Framework**: JUnit 5 with Spring Boot Test
- **Coverage**: Unit tests and integration tests for controllers, services, and repositories
- **Database**: Uses H2 in-memory database for testing



## 📝 Notes

- All build processes happen inside Docker containers
- No external build tools (Node.js, Java, Gradle) required on the host system
- Tests run in isolated containers with their own dependencies
- The application is designed to work with only Docker and Linux/Bash tools
