const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/todos.json');

const readTodos = () => JSON.parse(fs.readFileSync(filePath));
const writeTodos = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

/* CREATE */
router.post('/', (req, res) => {
  const todos = readTodos();
  const newTodo = {
    id: todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    title: req.body.title,
    completed: false,
    priority: req.body.priority
  };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

/* READ */
router.get('/', (req, res) => {
  res.json(readTodos());
});

/* UPDATE single task */
router.put('/:id', (req, res) => {
  const todos = readTodos();
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  todos[index] = { ...todos[index], ...req.body };
  writeTodos(todos);
  res.json(todos[index]);
});

/* BULK UPDATE */
router.put('/', (req, res) => {
  const todos = readTodos();
  const updates = req.body; // array

  updates.forEach(update => {
    const index = todos.findIndex(t => t.id === update.id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...update };
    }
  });

  writeTodos(todos);
  res.json({ message: 'Tasks updated', todos });
});

/* DELETE */
router.delete('/:id', (req, res) => {
  const todos = readTodos().filter(t => t.id !== parseInt(req.params.id));
  writeTodos(todos);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
