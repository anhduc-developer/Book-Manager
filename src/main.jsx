// import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import UserPage from "./pages/user";
import BookPage from "./pages/book";
import "./styles/global.css";
import TodoApp from "./components/todo/TodoApp";
import ErrorPage from "./pages/error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />,
      },
      {
        path: "books",
        element: <BookPage />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  // </React.StrictMode>,
  <RouterProvider router={router} />,
);
