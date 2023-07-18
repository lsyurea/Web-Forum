import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import Create from './components/Create';
import Posts from './components/Posts';
import MyPosts from './components/MyPosts';
import Post from './components/Post';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Posts />},
      {
        path: '/create',
        element: <Create />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/myposts',
        element: <MyPosts />,
      },
      {
        path: '/:id',
        element: <Post />,
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);