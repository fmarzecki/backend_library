const { getReadersPaginated } = require('../models/readerModel');

exports.getReadersPaginated = async (req, res) => {
    try {
        const { filter, filterBy, page, size } = req.body;

        const readers = await getReadersPaginated(filter, filterBy, page, size);

        res.status(200).json({
            success: true,
            data: readers
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving paginated readers', error });
    }
};