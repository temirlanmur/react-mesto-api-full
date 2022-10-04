class CardAPIModel {
  constructor(cardData) {
    this.createdAt = cardData.createdAt;
    this.likes = cardData.likes;
    this.link = cardData.link;
    this.name = cardData.name;
    this.owner = cardData.owner;
    this._id = cardData._id;
  }
}

module.exports = CardAPIModel;
