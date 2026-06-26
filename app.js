const express = require('express');
const app = express();

app.use(express.json());

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
];

// GET All
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// GET One
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json(todo);
});

// POST
app.post('/todos', (req, res) => {
  if (!req.body.task) {
    return res.status(400).json({
      message: 'Task field is required'
    });
  }

  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// PATCH
app.patch('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  Object.assign(todo, req.body);

  res.status(200).json(todo);
});

// DELETE
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  todos = todos.filter(t => t.id !== id);

  res.status(204).send();
});

// ACTIVE
app.get('/todos/active', (req, res) => {
  const activeTodos = todos.filter(t => !t.completed);

  res.status(200).json(activeTodos);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});