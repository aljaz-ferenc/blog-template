import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import SinglePost, { loader as postLoader } from "./pages/SinglePost";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />}/>
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:post" element={<SinglePost />} loader={postLoader}/>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
