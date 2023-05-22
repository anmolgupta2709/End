const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
});

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Todo = mongoose.model('Todo', todoSchema, 'todos');

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/todos', async(req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async(req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.delete('/todos/:id', async(req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.patch('/todos/:id', async(req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        todo.title = req.body.title;
        todo.description = req.body.description;
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
});