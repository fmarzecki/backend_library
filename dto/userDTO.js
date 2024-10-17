class UserDTO {
    constructor({ id, name, surname, email, phoneNumber, password, role }) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
    }

    static fromEntity(userEntity) {
        return new UserDTO({
            id: userEntity[0],
            name: userEntity[1],
            surname: userEntity[2],
            email: userEntity[3],
            phoneNumber: userEntity[4],
            password: userEntity[5],
            role: userEntity[6],
        });
    }
}

module.exports = UserDTO;
