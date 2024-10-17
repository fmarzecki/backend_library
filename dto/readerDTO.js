class ReaderDTO {
    constructor({ readerId, userId, user = null }) {
        this.readerId = readerId;
        this.userId = userId;
        this.user = user;
    }

    static fromEntity(readerEntity) {
        return new ReaderDTO({
            readerId: readerEntity[0],
            userId: readerEntity[1],
        });
    }

    static fromEntities(readerEntities) {
        return readerEntities.map(reader => this.fromEntity(reader));
    }
}

module.exports = ReaderDTO;