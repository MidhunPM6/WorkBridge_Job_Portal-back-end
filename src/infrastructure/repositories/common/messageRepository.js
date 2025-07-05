import IMessageRepository from "../../../domain/repositories/common/IMessageRepository.js";
import Message from "../../database/commonModels/MessageModel.js";

export default class MessageRepository extends IMessageRepository {
    async saveMessage(messageData) {
        const saveMessage =  new Message({
            sender: messageData.sender,
            receiver: messageData.receiver,
            message: messageData.message
        })
        return await saveMessage.save()
    }
}