const { getBooksPaginated, getBookById, getFreeBookCopyByBookId, reserveBookCopy } = require('../models/bookModel');

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

exports.reserveBook = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.userId
    try {
        const book = await getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const freeCopy = await getFreeBookCopyByBookId(bookId);
        if (!freeCopy) {
            return res.status(404).json({ message: 'No free book copies found' });
        }

        // Zarezerwuj książkę
        freeCopy.rentalStatus = 'Reserved'; // lub odpowiednia wartość dla zarezerwowanej kopii
        freeCopy.readerId = readerId; // Przypisanie ID czytelnika

        // Zapisz zmiany w bazie
        await reserveBookCopy(freeCopy);

        return res.status(200).json({ message: 'Book copy reserved', bookCopy: freeCopy });
    }
    catch (error) {
        console.error('Error reserving book:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

