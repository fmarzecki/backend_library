class BookCopyDTO {
    constructor({ copyId, rentalStatus, dateOfPurchase, bookId, addedBy }) {
        this.copyId = copyId;
        this.rentalStatus = rentalStatus;
        this.dateOfPurchase = dateOfPurchase;
        this.bookId = bookId;
        this.addedBy = addedBy;
    }

    static fromEntity(bookCopyEntity) {
        return new BookCopyDTO({
            copyId: bookCopyEntity[0],
            rentalStatus: bookCopyEntity[1],
            dateOfPurchase: bookCopyEntity[2],
            bookId: bookCopyEntity[3],
            addedBy: bookCopyEntity[4],
        });
    }

    static fromEntities(bookCopyEntities) {
        return bookCopyEntities.map(bookCopy => this.fromEntity(bookCopy));
    }
}

module.exports = BookCopyDTO;