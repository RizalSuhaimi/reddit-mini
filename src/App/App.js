import React, { useEffect } from 'react';
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

function App() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.clear();
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Root/> }>
          <Route index element={ <HomePage/> } />
          <Route path="subreddits" element={ <Subreddits calledFrom="App"/> } />
          <Route path="r/:subreddit" element={ <Subreddit/> } />
          <Route path="r/:subreddit/comments/:postId/:postTitle" element={ <FullPost/> } />
          <Route path="search" element={ <SearchResults/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;