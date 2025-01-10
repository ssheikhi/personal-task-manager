import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../styles/addtodo.css';
import config from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  // const [title, setTitle] = useState('');
  const handleAddTodo = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Validate required fields
    if (!title || !status || !deadline) {
      toast.error('Title, Status, and Deadline are required fields.', {
        position: 'top-center',
      });
      return;
    }

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const formattedStatus = status === 'in progress' ? 'in-progress' : status;
    const newTodo = {
      title,
      description,
      status: formattedStatus,
      deadline,
    };

    try {
      const response = await fetch(`${config.baseURL}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        // Redirect to the todo list page after successful creation
        toast.success('Todo added successfully!', {
          position: 'top-center',
        });
        navigate('/todo-list');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to add todo: ${errorData.message}`, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      }
    } catch (error) {
      console.error('Error creating todo:', error);
      toast.error(
        'An error occurred while adding the todo. Please try again.',
        {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        }
      );
    }
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };
  const options = ['in progress', 'pending', 'completed'];
  return (
    <form className='add-todo-form' onSubmit={handleAddTodo}>
      <input
        placeholder='Title'
        value={title}
        onChange={handleTitleChange}
        required
      />
      <input
        placeholder='Description'
        value={description}
        onChange={handleDescriptionChange}
      />
      <input
        type='date'
        placeholder='Deadline'
        value={deadline}
        onChange={handleDeadlineChange}
      />
      <Dropdown
        options={options}
        onChange={(option) => setStatus(option.value)} // Update state when dropdown changes
        value={status} // Bind the dropdown to the current state
        placeholder='Select a status'
        required
      />
      <button type='submit'>Add Todo</button>
      {/* ToastContainer for toast messages */}
      <ToastContainer />
    </form>
  );
};

export default AddTodo;
