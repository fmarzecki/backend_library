class ReservationDTO {
    constructor({ id, copyId, userId, reservationDate }) {
        this.id = id;
        this.copyId = copyId;
        this.userId = userId;
        this.reservationDate = reservationDate;
    }

    static fromEntity(reservationEntity) {
        return new ReservationDTO({
            id: reservationEntity[0],
            copyId: reservationEntity[1],
            userId: reservationEntity[2],
            reservationDate: reservationEntity[3]
        });
    }

    static fromEntities(reservationEntities) {
        return reservationEntities.map(reservation => this.fromEntity(reservation));
    }
}

module.exports = ReservationDTO;
