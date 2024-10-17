const { getBooksPaginated, getBookById } = require('../models/bookModel');
const { getFreeBookCopyByBookId, updateRentalStatus } = require('../models/bookCopyModel');
const { addRental } = require('../models/rentalModel');
const { addReservation } = require('../models/reservationModel');
const { getReaderByUserId } = require('../models/readerModel');

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
    let { bookId } = req.body;
    let userId = req.userId
    try {
        let book = await getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        let freeCopy = await getFreeBookCopyByBookId(bookId);
        if (!freeCopy) {
            return res.status(404).json({ message: 'No free book copies found' });
        }

        let reader = await getReaderByUserId(userId);
        if (!reader) {
            return res.status(404).json({ message: 'Reader not found' });
        }
        await updateRentalStatus(freeCopy, 'RESERVED');
        await addReservation(reader.readerId, freeCopy);

        return res.status(200).json({ message: 'Book copy reserved' });
    }
    catch (error) {
        console.error('Error reserving book:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

