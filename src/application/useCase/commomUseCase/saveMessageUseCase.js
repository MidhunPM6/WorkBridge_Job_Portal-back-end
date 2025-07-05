export default class SaveMessageUseCase {
  constructor (messageRepository, messageEntity) {
    this.messageRepository = messageRepository
    this.messageEntity = messageEntity
  }

  async execute (data) {
    try {
      if (!data) {
        throw new Error('Data is missing or invalid please check')
      }
      const messageEntity = this.messageEntity.create(data).toDTO()
      const saveMessage = await this.messageRepository.saveMessage(messageEntity)
      return saveMessage
    } catch (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}
