import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res) =>{
    try{
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{
                $all:[senderId,receiverId]
            }
        })

        if(!conversation)
        {
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const  newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage)
        {
            conversation.messages.push(newMessage._id);
        }

        // await newMessage.save();
        // await conversation.save();

        await Promise.all([newMessage.save(),conversation.save()]);//this runs in parallel

        res.status(200).json(newMessage);

    }
    catch(error){
        console.log("Error in send message controller",err);
        res.status(500).json({error:"Internal Server Error"});
    }
}


export const getMessages = async (req,res) =>{
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages");


        if(!conversation)
        {
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);

    }
    catch(error){
        console.log("Error in get messages controller",err);
        res.status(500).json({error:"Internal Server Error"});
    }
}