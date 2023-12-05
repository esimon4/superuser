import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Routes/root'
import Index from './Routes/index'
import User from './Routes/user'
import Project from './Routes/project'
import 'bootstrap/dist/css/bootstrap.min.css'
import Account from './Routes/account'
import CreateProject from './Routes/create-project'
import About from './Routes/about'
import Admin from './Routes/admin'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Index />,
        loader() {
          const usersPromise = fetch('http://localhost:3001/users').then(
            (response) => response.json(),
          )
          const projectsPromise = fetch('http://localhost:3001/projects').then(
            (response) => response.json(),
          )
          return Promise.all([usersPromise, projectsPromise]).then(
            ([users, projects]) => {
              return { users, projects }
            },
          )
        },
      },
      {
        path: '/user/:userId',
        element: <User />,
        loader(loaderData) {
          const userId = loaderData.params.userId

          const userPromise = fetch(
            `http://localhost:3001/users/${userId}`,
          ).then((response) => response.json())
          const projectsPromise = fetch('http://localhost:3001/projects').then(
            (response) => response.json(),
          )
          const commentsPromise = fetch('http://localhost:3001/comments').then(
            (response) => response.json(),
          )

          return Promise.all([
            userPromise,
            projectsPromise,
            commentsPromise,
          ]).then(([user, projects, comments]) => {
            const userComments = comments.filter(
              (comment) => comment.userId === userId,
            )
            const userWithComments = {
              ...user,
              comments: userComments,
            }
            return { user: userWithComments, projects }
          })
        },
      },
      {
        path: '/account',
        element: <Account />,
        loader() {
          return fetch('http://localhost:3001/projects').then((response) => {
            return response.json()
          })
        },
      },
      {
        path: '/project/:projectId',
        element: <Project />,
        loader(loaderData) {
          const projectPromise = fetch(
            `http://localhost:3001/projects/${loaderData.params.projectId}`,
          ).then((response) => response.json())
          const usersPromise = fetch('http://localhost:3001/users').then(
            (response) => response.json(),
          )
          return Promise.all([projectPromise, usersPromise]).then(
            ([project, users]) => {
              return { project, users }
            },
          )
        },
      },
      {
        path: '/create-project',
        element: <CreateProject />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/admin',
        element: <Admin />,
        loader() {
          return fetch('http://localhost:3001/users').then((response) => {
            return response.json()
          })
        },
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
