const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Todo API running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
