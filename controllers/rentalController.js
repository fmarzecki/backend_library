const { deleteReservation } = require('../models/reservationModel');
const { addRental, getActiveRentalsByReaderIdExtra, returnRental } = require('../models/rentalModel');
const { getBookCopyByCopyId, updateRentalStatus } = require('../models/bookCopyModel');
const { getUserByEmail } = require('../models/userModel');
const { getReaderByUserId } = require('../models/readerModel');

exports.rentBook = async (req, res) => {
    try {
        const { readerId, copyId, rentalInWeeks } = req.body;

        await addRental(readerId, copyId, rentalInWeeks);

        let bookCopy = await getBookCopyByCopyId(copyId);
        if (!bookCopy) {
            return res.status(404).json({ message: 'Copy not found', error });
        }

        await updateRentalStatus(bookCopy, 'RENTED');

        await deleteReservation(bookCopy);


        return res.status(200).json({
            success: true,
            message: 'Book rented'
        });
    }
    catch (error) {
        console.error('Error renting book:', error);
        return res.status(500).json({ message: 'Error renting book', error });
    }
};

exports.getReservationsForUserEmail = async (req, res) => {
    try {
        const { email } = req.body;

        let user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let reader = await getReaderByUserId(user.id);
        if (!reader) {
            return res.status(404).json({ message: 'Reader not found' });
        }

        let rentals = await getActiveRentalsByReaderIdExtra(reader.readerId);
        if (!rentals) {
            rentals = []
        }

        return res.status(200).json({
            success: true,
            data: rentals
        });
    }
    catch (error) {
        console.error('Error retrieving user rentals:', error);
        return res.status(500).json({ message: 'Error retrieving user rentals', error });
    }
};

exports.returnBook = async (req, res) => {
    try {
        let { rentalId } = req.body;

        await returnRental(rentalId);
        return res.status(200).json({ message: 'Book returned' });
    }
    catch (error) {
        console.error('Error returning book:', error);
        return res.status(500).json({ message: 'Error returning book', error });
    }
}