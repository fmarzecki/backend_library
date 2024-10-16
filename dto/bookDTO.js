class BookDTO {
    constructor({ bookId, title, bookAuthor, bookCategory, imageUrl, description }) {
        this.bookId = bookId;
        this.title = title;
        this.bookAuthor = bookAuthor;
        this.bookCategory = bookCategory;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    static fromEntity(bookEntity) {
        return new BookDTO({
            bookId: bookEntity[0],
            title: bookEntity[1],
            bookAuthor: bookEntity[2],
            bookCategory: bookEntity[3],
            imageUrl: bookEntity[4],
            description: bookEntity[5]
        });
    }

    static fromEntities(bookEntities) {
        return bookEntities.map(book => this.fromEntity(book));
    }
}

module.exports = BookDTO;