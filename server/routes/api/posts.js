const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray())

});

// Add post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();

});

// Delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});


async function loadPostsCollection(){
    let connectionUrl = 'mongodb+srv://vue-express-app-tutorial:testDB@cluster0-pm6gf.mongodb.net/test?retryWrites=true&w=majority';
    const client = await mongodb.MongoClient.connect(connectionUrl, {useNewUrlParser: true});

    return client.db('vue-express').collection('posts');
}




module.exports = router;