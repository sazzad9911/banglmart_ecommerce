import Header from "components/headers";
import React, { useEffect, useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { url } from "api/authApi";
import { getApi } from "api/api";
import { useSelector } from "react-redux";
import { postApi } from "api/api";
import socket from "api/socket";
import { useLocation, useNavigate } from "react-router-dom";

export default function ChatScreen() {
  const [messages, setMessages] = useState();
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState();
  const allUser = useSelector((state) => state.allUser);
  const [sender, setSender] = useState();
  const location = useLocation();
  const allConversation = useSelector((state) => state.allConversation);
  const id = new URLSearchParams(location.search).get("id");
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    //console.log(id);
    getApi(`/message/get/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  }, [id]);

  useEffect(() => {
    data && setSender(allUser?.filter((d) => d.id === data.senderId)[0]);
    data &&
      getApi(`/message/chats?conversationId=${data.id}`, user.token).then(
        (res) => {
          setMessages(res.data.data);
          //console.log(res.data.data);
        }
      );
  }, [data, allUser]);

  useEffect(() => {
    data &&
      socket.on("join", (e) => {
        getApi(`/auth/get-user-by-id/${data.senderId}`).then((res) => {
          setSender(res.data.user);
        });
      });
    data &&
      socket.on("disconnect", (e) => {
        getApi(`/auth/get-user-by-id/${data.senderId}`).then((res) => {
          setSender(res.data.user);
        });
      });
    data &&
      socket.on("message", (e) => {
        if (id === e.conversationId) {
          setMessages((d) => [...d, e]);
        }
      });
  }, [data]);
  if(!data||!sender){
    return null
  }
  return (
    <div className="mt-4" style={{ position: "relative", height: "80vh" }}>
      <input id="image" accept="image/*" type={"file"} className="hidden" />
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back onClick={() => navigate(-1)} />
            <Avatar
              src={
                sender?.image
                  ? `${url}${sender?.image}`
                  : "https://media.defense.gov/2020/Feb/19/2002251686/700/465/0/200219-A-QY194-002.JPG"
              }
              name={sender?.name}
            />
            <ConversationHeader.Content
              userName={sender?.name}
              info={sender?.active ? "Active" : "Inactive"}
            />
            <ConversationHeader.Actions>
              <Avatar
                src={
                  sender?.image
                    ? `${url}${data?.product?.thumbnail}`
                    : "https://media.defense.gov/2020/Feb/19/2002251686/700/465/0/200219-A-QY194-002.JPG"
                }
                name={sender?.name}
              />
              <ConversationHeader.Content
                userName={data?.product?.title}
                
              />
            </ConversationHeader.Actions>
          </ConversationHeader>

          <MessageList>
            {messages?.map((doc, i) => (
              <Message
                key={i}
                model={{
                  message: doc.message,
                  sentTime: "Just now",
                  sender: "Zoe",
                  direction:
                    doc.receiverId === user.user.id ? "incoming" : "outgoing",
                  position: "first",
                }}
              >
                {doc.receiverId === user.user.id && (
                  <Avatar
                    src={
                      sender?.image
                        ? `${url}${sender?.image}`
                        : "https://media.defense.gov/2020/Feb/19/2002251686/700/465/0/200219-A-QY194-002.JPG"
                    }
                    name={data.receiver.name}
                  />
                )}
                <Message.Footer  sentTime={new Date(doc.date).toLocaleString()} />
              </Message>
            ))}

            {/* <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Eliot",
                direction: "incoming",
                position: "first",
              }}
            >
              
            </Message> */}
          </MessageList>
          <MessageInput
            onSend={() => {
              const from = new FormData();
              from.append("conversationId", data.id);
              from.append("message", message);
              // from.append("image")
              from.append("receiverId", sender.id);
              postApi("/message/send", from, user.token).catch((e) => {
                console.error(e.response.data.message);
              });
            }}
            onChange={(e) => {
              setMessage(e);
            }}
            onAttachClick={() => {
              document.getElementById("image").click();
            }}
            placeholder="Type message here"
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
