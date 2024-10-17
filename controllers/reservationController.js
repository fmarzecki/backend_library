const { getReaderByUserId } = require('../models/readerModel');
const { getReservationsByReaderIdExtra } = require('../models/reservationModel');
const { getUserByEmail } = require('../models/userModel');

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

        let reservations = await getReservationsByReaderIdExtra(reader.readerId);
        if (!reservations) {
            reservations = []
        }

        return res.status(200).json({
            success: true,
            data: reservations
        });
    }
    catch (error) {
        console.error('Error retrieving user reservations:', error);
        return res.status(500).json({ message: 'Error retrieving user reservations', error });
    }
};

