import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import { Layout } from './components/Layout';
import AddPost from './components/Post/AddPost';
import PostDetail from './components/Post/PostDetail';
import Posts from './components/Post/Posts';
import UpdatePost from './components/Post/UpdatePost';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Posts />} />
          <Route path='add'>
            <Route index element={<AddPost />} />
          </Route>
          <Route path='post'>
            <Route path=':id' element={<PostDetail />} />
            <Route path='edit/:id' element={<UpdatePost />} />
          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
