/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import config from '../config';
import '../styles/todolist.css';

const TodoList = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track the todo being edited
  const [editedTodo, setEditedTodo] = useState({}); // Store the updated values

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${config.baseURL}/todo/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Remove the deleted todo from the state
        setData(data.filter((todo) => todo._id !== id));
      } else {
        console.error('Failed to delete todo');
      }
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo._id); // Set the ID of the todo being edited
    setEditedTodo({ ...todo }); // Clone the todo into the state for editing
  };

  const saveEdit = async (id) => {
    try {
      const response = await fetch(`${config.baseURL}/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedTodo),
      });

      if (response.ok) {
        // Refetch the data after successful update
        const updatedTodos = await fetch(`${config.baseURL}/todo`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const todos = await updatedTodos.json();
        setData(todos); // Update the state with the new data
        setEditingId(null); // Exit edit mode
      } else {
        console.error('Failed to update todo');
      }
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((todo) =>
              editingId === todo._id ? (
                <tr key={todo._id}>
                  <td>
                    <input
                      type='text'
                      value={editedTodo.title}
                      onChange={(e) =>
                        setEditedTodo({ ...editedTodo, title: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={editedTodo.description}
                      onChange={(e) =>
                        setEditedTodo({
                          ...editedTodo,
                          description: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={editedTodo.status}
                      onChange={(e) =>
                        setEditedTodo({ ...editedTodo, status: e.target.value })
                      }
                    >
                      <option value='completed'>Completed</option>
                      <option value='in-progress'>In Progress</option>
                      <option value='pending'>Pending</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type='date'
                      value={
                        new Date(editedTodo.deadline)
                          .toISOString()
                          .split('T')[0]
                      }
                      onChange={(e) =>
                        setEditedTodo({
                          ...editedTodo,
                          deadline: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>{new Date(todo.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => saveEdit(todo._id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={todo._id}>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>{todo.status}</td>
                  <td>{new Date(todo.deadline).toLocaleDateString()}</td>
                  <td>{new Date(todo.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(todo)}>Edit</button>
                    <button onClick={() => handleDelete(todo._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
