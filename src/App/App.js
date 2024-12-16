import React from 'react';
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Root from "../components/Root/Root"
import HomePage from '../components/Homepage/HomePage';
import Subreddit from '../components/Subreddit/Subreddit';
import FullPost from '../components/FullPost/FullPost';

// import styles from "../../css/bootstrap.css";

const mockTopPosts = {

}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Root/> }>
          <Route index element={ <HomePage/> } />
          <Route path="r/:subreddit" element={ <Subreddit/> } />
          <Route path="r/:subreddit/comments/:postId/:postTitle" element={ <FullPost/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Route structure:
// localhost:3000/r/subreddit_name/comments/post_id/post_title/

export default App;