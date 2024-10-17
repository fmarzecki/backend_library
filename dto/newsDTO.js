class NewsDTO {
    constructor(postId, name, contents, imageUrl) {
        this.postId = postId;
        this.name = name;
        this.contents = contents;
        this.imageUrl = imageUrl;
    }

    static fromEntity(row) {
        return new NewsDTO(row[0], row[1], row[2], row[3]);
    }

    static fromEntities(rows) {
        return rows.map(row => NewsDTO.fromEntity(row));
    }
}

module.exports = NewsDTO;
