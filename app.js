const sequelize = require('sequelize');
const { Post } = require('./models');


const express = require('express')
const app = express()
const port = 3001;

app.set('view engine', 'ejs');
app.use(express.json());




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

app.get('/allPosts', async (req, res) => {
    const posts = await Post.findAll();
    res.json(posts);
})

app.get('/posts/:title', async (req, res) => {
    try {
        const postByTitle = await Post.findOne({
            where: {
                title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + req.params.title.toLowerCase() + '%')

            }
        });
        res.json(postByTitle);
    } catch (e) {
        console.log(e);
        res.status(404).json({
            message: 'Post not found'
        });
    }


})

app.get('/posts/title', async (req, res) => {
    const posts = await Post.findAll({
        attributes: ['title']
    });
    res.json(posts);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

