class ReservationDTO {
    constructor({ id, copyId, readerId, reservationDate, book = null }) {
        this.id = id;
        this.copyId = copyId;
        this.readerId = readerId;
        this.reservationDate = reservationDate;
        this.book = book;
    }

    static fromEntity(reservationEntity) {
        return new ReservationDTO({
            id: reservationEntity[0],
            copyId: reservationEntity[1],
            readerId: reservationEntity[2],
            reservationDate: reservationEntity[3]
        });
    }

    static fromEntities(reservationEntities) {
        return reservationEntities.map(reservation => this.fromEntity(reservation));
    }
}

module.exports = ReservationDTO;
