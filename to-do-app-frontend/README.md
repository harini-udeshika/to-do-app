# To-Do App Frontend

A React-based frontend application for managing todo tasks.

## Features

- Add new todos with title and description
- View all todos in a clean interface
- Mark todos as completed
- Delete todos
- Responsive design with modern UI
- Toast notifications for user feedback

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Testing

This project includes simple unit tests for all components using Vitest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Structure

The tests are organized as follows:

- **Component Tests**: Simple unit tests for each React component
  - `App.test.jsx` - Tests for the main App component
  - `Form.test.jsx` - Tests for the todo form component
  - `TodoDisplay.test.jsx` - Tests for the todo list display component
  - `Navbar.test.jsx` - Tests for the navigation component

### Test Coverage

The tests cover basic functionality:

- **Component Rendering**: Verifies that components render correctly
- **User Interactions**: Tests form submissions, button clicks, and user input
- **State Management**: Ensures proper state updates and data flow
- **Form Validation**: Tests input validation and error messages
- **Toast Notifications**: Verifies success and error notifications

### Testing Technologies

- **Vitest**: Fast unit testing framework
- **React Testing Library**: Utilities for testing React components
- **User Event**: Simulates user interactions
- **Jest DOM**: Custom matchers for DOM testing

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
src/
├── components/
│   ├── Form/
│   │   ├── Form.jsx
│   │   └── Form.css
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   └── TodoDisplay/
│       ├── TodoDisplay.jsx
│       └── TodoDisplay.css
├── apis/
│   └── api.js
├── test/
│   ├── setup.js
│   ├── App.test.jsx
│   ├── Form.test.jsx
│   ├── TodoDisplay.test.jsx
│   └── Navbar.test.jsx
├── App.jsx
└── main.jsx
```

## Dependencies

### Production Dependencies
- React 18.2.0
- React DOM 18.2.0
- Axios 1.11.0
- React Toastify 9.1.3
- React Icons 5.5.0
- FontAwesome Icons

### Development Dependencies
- Vite 5.0.8
- ESLint
- Vitest 1.0.4
- React Testing Library 14.1.2
- User Event 14.5.1
- Jest DOM 6.1.5

## Contributing

1. Write tests for new features
2. Ensure all tests pass before submitting
3. Follow the existing code style
4. Update documentation as needed 