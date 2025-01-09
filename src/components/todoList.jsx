/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import config from '../config';
import '../styles/todolist.css';
const TodoList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false); // To toggle the form
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    status: 'pending',
    deadline: '',
  }); // For new todo

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${config.baseURL}/todo`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const todos = await response.json();
        setData(todos);
      } else {
        console.error('Failed to fetch todos');
      }
    } catch (err) {
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await fetch(`${config.baseURL}/todo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      if (response.ok) {
        fetchTodos(); // Refetch todos after adding
        setShowAddForm(false); // Close the form
        setNewTodo({
          title: '',
          description: '',
          status: 'pending',
          deadline: '',
        }); // Reset the form
      } else {
        console.error('Failed to add todo');
      }
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className='todo-container'>
      <h1>Your Todo List</h1>

      {/* Add New Todo Button */}
      <button
        className='add-todo-button'
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? 'Close Form' : 'Add New Todo'}
      </button>

      {/* Add New Todo Form */}
      {showAddForm && (
        <div className='add-todo-form'>
          <input
            type='text'
            placeholder='Title'
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <input
            type='text'
            placeholder='Description'
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          />
          <select
            value={newTodo.status}
            onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
          >
            <option value='pending'>Pending</option>
            <option value='in-progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
          <input
            type='date'
            value={newTodo.deadline}
            onChange={(e) =>
              setNewTodo({ ...newTodo, deadline: e.target.value })
            }
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
      )}

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
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
