import { Avatar, CloseButton } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { AiOutlineSend } from "react-icons/ai";
import { postApi } from "../apis";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import socket from "../socket";
const Chat = () => {
  const {
    user,
    conversation,
    conversationShow,
    messages,
    setConversationShow,
  } = useContext(AuthContext);
  const url = "https://api.banglamartecommerce.com.bd";
  const [allMessages, setAllMessages] = useState(null);
  useEffect(() => {
    setAllMessages(messages);
  }, [messages]);
  // console.log(allMessages);
  const scrollbarsRef = useRef();

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToBottom();
    }
  };

  // Scroll to the bottom when the component mounts
  useEffect(() => {
    scrollToBottom();
  }, []);

  // Scroll to the bottom whenever new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);
  const [formData, setFormData] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(conversation);
    const token = localStorage.getItem("token");
    const from = new FormData();
    from.append("conversationId", conversation.id);
    from.append("message", formData);
    // from.append("image")
    from.append("receiverId", conversation.product.userId);
    postApi("/message/send", from, token);
    setFormData("");
  };

  const handleAddMessage = (event) => {
    if (event.conversationId === conversation?.id) {
      setAllMessages((res) => [...res, event]);
    }
  };

  useEffect(() => {
    socket.on("message", (event) => {
      handleAddMessage(event, conversation);
    });
  }, [conversation]);

  return (
    <div
      className={`bg-CardColor z-10 pb-4 rounded-t-xl bottom-0 w-[280px] lg:right-32 fixed ${
        conversationShow
          ? "transition-all transform translate-y-0"
          : "transition-all transform translate-y-full"
      } ease-in-out duration-700 shadow-2xl shadow-SubTextColor`}
    >
      <div className="flex justify-end text-SubTextColor">
        <CloseButton onClick={() => setConversationShow((v) => !v)} size="md" />
      </div>
      <div className="border border-BorderColor flex justify-center p-2 shadow-lg shadow-TextColor ">
        <div>
          <div className="flex items-center gap-2">
            <img
              src={`${url}${conversation?.product.thumbnail}`}
              className="h-16 w-16 rounded-full"
              alt=""
            />
            <div>
              <p className="text-MainColor">{conversation?.product.title}</p>
            </div>
          </div>
        </div>
      </div>
      <Scrollbars
        style={{ height: 350 }}
        renderThumbVertical={({ style }) => (
          <div
            style={{
              ...style,
              width: 3,
              backgroundColor: "#5dade2",
              borderRadius: 4,
            }}
          />
        )}
        ref={scrollbarsRef}
      >
        <div className="p-3 ">
          {allMessages?.map((message, i) => (
            <div key={i}>
              {/* chat start  */}
              <div
                className={`chat ${
                  user.id === message.receiverId ? "chat-start" : "chat-end"
                } `}
              >
                <div className="chat-image avatar">
                  <Avatar
                    size="sm"
                    name={
                      user.id === message.receiverId
                        ? conversation?.receiver?.name
                        : user.name
                    }
                    src={`${url}${
                      user.id === message.receiverId
                        ? conversation?.receiver?.image
                        : user.image
                    }`}
                  />
                </div>
                <div className="text-xs chat-header flex flex-col  text-SubTextColor ">
                  <p>
                    {user.id === message.receiverId
                      ? conversation?.receiver?.name
                      : user.name}
                  </p>
                  <time className=" ">
                    {new Date(message?.date).toLocaleString()}
                  </time>
                </div>
                <div className="chat-bubble">{message.message}</div>
              </div>
            </div>
          ))}
        </div>
      </Scrollbars>

      <div className="pt-2 pl-3">
        <form onSubmit={sendMessage} className="flex items-center">
          <input
            type="text"
            name="message"
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
            placeholder="Type Message..."
            className="border p-2 pl-4 rounded-full focus:outline-none focus:ring focus:border-blue-500 resize-none"
          ></input>
          {formData === "" ? (
            <button
              disabled
              className="ml-2 text-[18px] bg-CardColor rounded-full border border-SubTextColor h-8 w-8 "
            >
              <AiOutlineSend className="text-SubTextColor ml-2"></AiOutlineSend>
            </button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              type="submit"
              className="ml-2 text-[18px] bg-CardColor rounded-full border border-MainColor h-8 w-8 "
            >
              <AiOutlineSend className="text-MainColor ml-2"></AiOutlineSend>
            </motion.button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Chat;
