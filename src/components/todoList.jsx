/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import config from '../config';
import '../styles/todolist.css';

const TodoList = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${config.baseURL}/todo`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const todos = await response.json();
          console.log(todos);

          setData(todos);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch todos');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      }
    };
    fetchTodos();
  }, []);

  // Show error message if any
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Welcome to Your Todo List</h1>
      <div className='todo-container'>
        <table className='todo-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((todo) => {
              return (
                <tr key={todo._id}>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>{todo.status}</td>
                  <td>{new Date(todo.deadline).toLocaleDateString()}</td>
                  <td>{new Date(todo.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
