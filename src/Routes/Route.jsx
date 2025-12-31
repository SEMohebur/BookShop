import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Books from "../Pages/Books";
import AddBooks from "../Pages/AddBooks";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import NotFoundPage from "../Pages/NotFoundPage";
import Details from "../Pages/Details";
import BookList from "../Pages/BookList";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, Component: Home },
      { path: "/books", Component: Books },
      { path: "/addBook", Component: AddBooks },
      { path: "/about", Component: About },
      { path: "/contact", Component: Contact },
      { path: "/detaile/:id", Component: Details },
      { path: "/bookList", Component: BookList },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
