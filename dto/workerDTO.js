class WorkerDTO {
    constructor({ workerId, name, surname, phoneNumber, monthlyPay }) {
        this.workerId = workerId;
        this.name = name;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.monthlyPay = monthlyPay;
    }

    static fromEntity(workerEntity) {
        return new WorkerDTO({
            workerId: workerEntity[0], // Assuming workerId is the first field
            name: workerEntity[1],
            surname: workerEntity[2],
            phoneNumber: workerEntity[3],
            monthlyPay: workerEntity[4]
        });
    }
}

module.exports = WorkerDTO;
