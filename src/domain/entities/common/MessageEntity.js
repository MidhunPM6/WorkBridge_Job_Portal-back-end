export default class MessageEntity {
  constructor ({ sender, receiver, message, updatedAt, createdAt }) {
    {
      this.sender = sender
      this.receiver = receiver
      this.message = message
      this.updatedAt = updatedAt || new Date()
      this.createdAt = createdAt || new Date()
      this.validate()
    }
  }

  async validate () {
    if (!this.sender || typeof this.sender !== 'string') {
      throw new Error('Invalid sender')
    }

    if (!this.receiver || typeof this.receiver !== 'string') {
      throw new Error('Invalid receiver')
    }

    if (!this.message || typeof this.message !== 'string') {
      throw new Error('Invalid message')
    }

    if (!(this.createdAt instanceof Date)) {
      throw new Error('Invalid createdAt date')
    }

    if (!(this.updatedAt instanceof Date)) {
      throw new Error('Invalid updatedAt date')
    }
  }
  
  static create (data) {
    const message = new MessageEntity(data)
    return message
  }

  toDTO () {
    return {
      sender: this.sender,
      receiver: this.receiver,
      message: this.message,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt
    }
  }
}
