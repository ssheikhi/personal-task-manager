/* eslint-disable no-unused-vars */

import './styles/App.css';
import Login from './components/login';
import TodoList from './components/todoList';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/todo-list' element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
