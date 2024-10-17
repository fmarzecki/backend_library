const { getAllNewsPosts, addNewsPost, updateNewsPost, deleteNewsPost } = require('../models/newsModel');

exports.getNewsPosts = async (req, res) => {
    try {
        const newsPosts = await getAllNewsPosts();
        res.status(200).json({ success: true, data: newsPosts });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving news posts', error });
    }
};

exports.addNewsPost = async (req, res) => {
    try {
        const { name, contents } = req.body;
        console.log(req.body)
        if (!name || !contents) {
            return res.status(400).json({ message: 'Name and contents are required.' });
        }
        const newPost = await addNewsPost({ name, contents});
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Error adding news post', error });
    }
};

exports.updateNewsPost = async (req, res) => {
    try {
        const { postId, name, contents } = req.body;
        await updateNewsPost({ postId, name, contents });
        res.status(200).json({ success: true, message: 'News post updated.' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating news post', error });
    }
};

exports.deleteNewsPost = async (req, res) => {
    try {
        await deleteNewsPost(req.params.postId);
        res.status(200).json({ success: true, message: 'News post deleted.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting news post', error });
    }
};
