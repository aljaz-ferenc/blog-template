import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import PostsProvider from "./postsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PostsProvider>
      <App />
    </PostsProvider>
  </React.StrictMode>
);
