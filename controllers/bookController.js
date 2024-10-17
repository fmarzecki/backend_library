const { getBooksPaginated, addBook } = require('../models/bookModel');

exports.getBooksPaginated = async (req, res) => {
    try {
        const { filter, filterBy, page, size } = req.body;

        const books = await getBooksPaginated(filter, filterBy, page, size);

        res.status(200).json({
            success: true,
            data: books
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving paginated books', error });
    }
};

exports.addBook = async (req, res) => {
    try {
        const { title, bookCategory, imageUrl, bookAuthor, description } = req.body;

        // Validate required fields
        if (!title || !bookCategory || !imageUrl || !bookAuthor || !description) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Call the model function to add the book
        const newBook = await addBook({ title, bookCategory, imageUrl, bookAuthor, description });

        res.status(201).json({
            success: true,
            data: newBook,
        });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Error adding book', error });
    }
};