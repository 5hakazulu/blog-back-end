const { Sequelize } = require('sequelize');
const { Post } = require('./models');

const express = require('express')
const app = express()
const port = 3001;

app.set('view engine', 'ejs');
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/newPost', async (req, res) => {
    const { title, contents, category } = req.body;
    const newPost = await Post.create({
        title,
        contents,
        category
    });
    res.json({
        id: newPost.id
    });
})

app.get('/allposts', async (req, res) => {
    const posts = await Post.findAll();
    res.json(posts);
})

app.get('/posts/:id', async (req, res) => {
    try {
        const postById = await Post.findByPk(req.params.id);
        res.json(postById);
    } catch (e) {
        console.log(e);
        res.status(404).json({
            message: 'Post not found'
        });
    }


})

app.get('/posts/by-category', async (req, res) => {
    const posts = await Post.findAll({
        attributes: ['category']
    });
    res.json(posts);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

