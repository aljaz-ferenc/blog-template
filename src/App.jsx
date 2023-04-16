import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Posts, { postsLoader } from "./pages/Posts";
import SinglePost from "./pages/SinglePost";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} loader={postsLoader}/>
        <Route path="posts" element={<Posts />} loader={postsLoader} />
        <Route path="posts/:post" element={<SinglePost />} loader={postsLoader}/>
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
