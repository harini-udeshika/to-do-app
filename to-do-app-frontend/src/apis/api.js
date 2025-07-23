import axios from 'axios';

const baseURL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTodos = async () => {
  const response = await api.get('/task', {
    params: { type: 'latest' },
  });
  return response.data;
};

export const addTodo = async (title, desc) => {
  const response = await api.post('/task', {
    title,
    description: desc,
  });
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete('/task', {
    params: { id },
  });
  return response.data;
};

export const completeTodo = async (id) => {
  const response = await api.patch('/task/complete', {
    completed: true,
  }, {
    params: { id },
  });
  return response.data;
};
