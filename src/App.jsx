/* eslint-disable no-unused-vars */

// import './styles/App.css';
import Login from './components/login';
import TodoList from './components/todoList';
import AddTodo from './components/addTodo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/todo-list' element={<TodoList />} />
        <Route path='/add-todo' element={<AddTodo />} />
      </Routes>
    </Router>
  );
}

export default App;
