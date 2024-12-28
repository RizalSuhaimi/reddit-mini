import React from 'react';
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Root from "../components/Root/Root"
import HomePage from '../components/Homepage/HomePage';
import Subreddits from '../components/Subreddits/Subreddits';
import Subreddit from '../components/Subreddit/Subreddit';
import FullPost from '../components/FullPost/FullPost';
import SearchResults from '../components/SearchResults/SearchResults';
// import styles from "../../css/bootstrap.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Root/> }>
          <Route index element={ <HomePage/> } />
          <Route path="subreddits" element={ <Subreddits/> } />
          <Route path="r/:subreddit" element={ <Subreddit/> } />
          <Route path="r/:subreddit/comments/:postId/:postTitle" element={ <FullPost/> } />
          <Route path="search" element={ <SearchResults/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Route structure:
// localhost:3000/r/subreddit_name/comments/post_id/post_title/

export default App;