import React from 'react';
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Root from "../components/Root/Root"
import HomePage from '../components/Homepage/HomePage';

const mockTopPosts = {

}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Root/> }>
          <Route index element={ <HomePage/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;