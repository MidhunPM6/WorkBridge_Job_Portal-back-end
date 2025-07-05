export default class FetchChatHistoryUseCase {
  constructor (messageRepository, messageEntity) {
    this.messageRepository = messageRepository
    this.messageEntity = messageEntity
  }
  async execute(senderId, recevierId) {
    if (!senderId || !recevierId) {
      throw new Error('senderId or recevierId is missing')
    }

    try {
      const chatHistory = await this.messageRepository.fetchChatHistory(
        senderId,
        recevierId
      )
     
      
      const rehydrateData = chatHistory.map(data => this.messageEntity.rehydrate(data))
      const toDTOObj = rehydrateData.map(data => data.toDTO())
      
      
      return toDTOObj
    } catch (error) { 
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}
