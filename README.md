# Subtle Solve - Frontend

A React-based frontend application for the Subtle Solve puzzle game. This repository contains the user interface and client-side logic for the application.

**Note:** The backend API is maintained in a separate repository.

## Technology Stack

- **React 18** - UI library
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Keycloak** - Authentication and authorization
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Chart.js** - Data visualization

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Project Structure

- `src/` - Source code
  - `components/` - Reusable React components
  - `hooks/` - Custom React hooks
  - `services/` - API service integrations
  - `security/` - Authentication configuration (Keycloak)
- `public/` - Static assets
- `build/` - Production build output

## Deployment

The application includes Docker support for containerized deployment. See `README.Docker.md` for more details on building and running the Docker image.

### Additional Resources
