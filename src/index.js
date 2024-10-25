import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App"
import LandingPageForm from "./components/LandingPage/LandingPageForm";
import TrackerPage from "./components/TrackerPage/TrackerPage";
import ErrorPage from "./ErrorPage";
import store from "./redux/Store"
import "./index.css"


// DO NOT TOUCH THE BELOW LINE
import reportWebVitals from "./reportWebVitals";

// DO NOT TOUCH THE BELOW 3 LINES
if (window.Cypress) {
  window.store = store;
}

// WRITE YOUR CODE HERE
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPageForm />,
      },
      {
        path: "/tracker",
        element: <TrackerPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);

// DO NOT TOUCH THE BELOW LINE
reportWebVitals();
