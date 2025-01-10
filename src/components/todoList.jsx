/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import config from '../config';
import '../styles/todolist.css';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  console.log(userName);

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDeleteTodo = async (id) => {
    console.log('in handle delete ', id);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${config.baseURL}/todo/${id}`, {
        method: 'DELETE',
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      if (response.ok) {
        setData(data.filter((todo) => todo._id !== id)); // Update local state
        toast.success('Todo deleted successfully!', {
          position: 'top-center',
        });
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete todo: ${errorData.message}`, {
          position: 'top-center',
        });
      }
    } catch (err) {
      toast.error(
        'An error occurred while deleting the todo. Please try again.',
        {
          position: 'top-center',
        }
      );
    }
  };
  const fetchTodos = async () => {
    const token = localStorage.getItem('token');
    console.log('in fetch data', token);
    try {
      const response = await fetch(`${config.baseURL}/todo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const todos = await response.json();
        setData(todos);
      } else {
        console.error('Failed to fetch todos');
      }
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  return (
    <div className='todo-container'>
      <h1>Hi {userName}, here is your Todo List</h1>
      {/* Add New Todo Button */}
      <button className='add-todo-button' onClick={() => navigate('/add-todo')}>
        Add New Todo
      </button>

      {/* Todo List Table */}
      <table className='todo-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((todo) => (
            <tr key={todo._id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.status}</td>
              <td>{new Date(todo.deadline).toLocaleDateString()}</td>
              <td>{new Date(todo.createdAt).toLocaleDateString()}</td>
              <td>
                <button>Edit</button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this todo?'
                      )
                    ) {
                      handleDeleteTodo(todo._id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
