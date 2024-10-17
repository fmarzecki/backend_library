class RentalDTO {
    constructor({ rentalId, rentalDate, returnDate = null, status, readerId, bookCopyId, returnDateExpected, book = null }) {
        this.rentalId = rentalId;
        this.rentalDate = rentalDate;
        this.returnDate = returnDate;
        this.status = status;
        this.readerId = readerId;
        this.bookCopyId = bookCopyId;
        this.returnDateExpected = returnDateExpected;
        this.book = book;
    }

    static fromEntity(rentalEntity) {
        return new RentalDTO({
            rentalId: rentalEntity[0],
            rentalDate: rentalEntity[1],
            returnDate: rentalEntity[2],
            status: rentalEntity[3],
            readerId: rentalEntity[4],
            bookCopyId: rentalEntity[5],
            returnDateExpected: rentalEntity[6],
        });
    }

    static fromEntities(rentalEntities) {
        return rentalEntities.map(rental => this.fromEntity(rental));
    }
}

module.exports = RentalDTO;