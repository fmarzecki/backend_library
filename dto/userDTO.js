class UserDTO {
    constructor({ id, name, surname, email, phoneNumber, password, imageUrl, role, isBlocked }) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.imageUrl = imageUrl;
        this.role = role;
        this.isBlocked = isBlocked;
    }

    static fromEntity(userEntity) {
        return new UserDTO({
            id: userEntity[0],
            name: userEntity[1],
            surname: userEntity[2],
            email: userEntity[3],
            phoneNumber: userEntity[4],
            password: userEntity[5],
            imageUrl: userEntity[6],
            role: userEntity[7],
            isBlocked: userEntity[8]
        });
    }

    static fromEntities(userEntities) {
        return userEntities.map(user => this.fromEntity(user));
    }
}

module.exports = UserDTO;
