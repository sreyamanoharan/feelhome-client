import  { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import { allChats } from '../../../services';
import HostNavbar from '../../hostComponents/HostNavbar';
import { useParams } from 'react-router-dom';

const UserChat = ({ role }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setselectedUser] = useState();
  const [details, setDetails] = useState('');
  const selectedRef = useRef();
  const scrolldownRef = useRef(null);
  const userId = useSelector((state) => state.User.userId);

  let socket = io('https://feelhome.site/');
  let roles=role

const hostid=useParams()
const hostId=hostid.hostId
console.log(hostId,'hooossstttIiiidddd');


  useEffect(() => {
    // Add 'no-scroll' class to body when component mounts
    document.body.classList.add('no-scroll');
    return () => {
      // Remove 'no-scroll' class when component unmounts
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    const initializeChat = async () => {
      if (!userId) return;

      try {
        let activeChat = null;

        if (hostId) {
          const res = await axiosInstance.post('/chat/create-chat', { userId, hostId });
          if (res.data && res.data.chat) {
            const rawChat = res.data.chat;
            const filteredUsers = rawChat.User.filter((item) => item._id !== userId);
            activeChat = {
              ...rawChat,
              User: filteredUsers,
            };
          }
        }

        const data = await allChats(userId);
        let lists = data?.map((obj) => {
          let filteredUsers = obj.User.filter((item) => item._id !== userId);
          return {
            ...obj,
            User: filteredUsers,
          };
        }) || [];

        if (activeChat) {
          const existingChatIndex = lists.findIndex((chat) => chat._id === activeChat._id);
          if (existingChatIndex !== -1) {
            const [target] = lists.splice(existingChatIndex, 1);
            lists.unshift(target);
          } else {
            lists.unshift(activeChat);
          }
        }

        setChats(lists);

        if (lists.length > 0) {
          const chatToSelect = activeChat 
            ? lists.find((c) => c._id === activeChat._id) || lists[0]
            : lists[0];
          
          selectChat(chatToSelect);
          handleMessageFetch(chatToSelect._id);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initializeChat();
  }, [userId, hostId]);

  useEffect(() => {
    socket.emit('setup', userId);
    socket.emit('join chat', userId);
  }, [messages, userId]);

  useEffect(() => {
    axiosInstance.get(`/getUser/${userId}`).then((res) => {
      setDetails(res.data.users);
    });
  }, []);

  const selectChat = (user) => {
    setselectedUser(user);
    selectedRef.current = user;
  };

  const handleMessageFetch = async (chatId) => {
    const { data } = await axiosInstance.get(`/message/${chatId}`);
    setMessages(data.messages);
  };

  const handleMessageSent = async (e) => {
    e.preventDefault();

    if (newMessage.trim().length > 0) {
      const res = await sendMessage(newMessage, selectedUser?._id, userId);

      socket.emit('new message', res.message);

      setNewMessage('');
      setMessages([...messages, res.message]);

      // Move the active chat to the top of the list with updated latestMessage
      setChats((prevChats) => {
        const updated = prevChats.map((chat) =>
          chat._id === selectedUser?._id
            ? { ...chat, latestMessage: { content: newMessage } }
            : chat
        );
        const activeChat = updated.find((chat) => chat._id === selectedUser?._id);
        const rest = updated.filter((chat) => chat._id !== selectedUser?._id);
        return activeChat ? [activeChat, ...rest] : updated;
      });
    }
  };

  const sendMessage = async (content, chatId, userId) => {
    const { data } = await axiosInstance.post(`/message`, {
      content,
      chatId,
      userId,
    });

    return data;
  };

  const setMessageFn = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    socket.on('message received', (message) => {
      if (selectedRef?.current?.User[0]?._id === message.sender._id) {
        setMessages((messages) => [...messages, message]);
      }
      // Move that chat to top with latest message
      setChats((prevChats) => {
        const updated = prevChats.map((chat) =>
          chat.User[0]?._id === message.sender._id
            ? { ...chat, latestMessage: { content: message.content } }
            : chat
        );
        const activeChat = updated.find((chat) => chat.User[0]?._id === message.sender._id);
        const rest = updated.filter((chat) => chat.User[0]?._id !== message.sender._id);
        return activeChat ? [activeChat, ...rest] : updated;
      });
    });
  }, [socket]);

  useEffect(() => {
    if (scrolldownRef.current) {
      scrolldownRef.current.scrollTo({
        top: scrolldownRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <>
      {/* Fixed full-screen chat layout */}
      <div className="fixed inset-0 pt-20 flex bg-white text-gray-900">

        {/* Sidebar — chat list */}
        <div className="w-80 flex-shrink-0 border-r border-gray-200 flex flex-col h-full">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Conversations</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul>
              {chats?.map((obj) => (
                <li
                  key={obj._id}
                  onClick={() => {
                    selectChat(obj);
                    handleMessageFetch(obj._id);
                  }}
                  className={`flex items-center px-4 py-3 gap-3 border-b border-gray-100 cursor-pointer transition-colors duration-150 hover:bg-blue-50 ${
                    selectedUser?._id === obj._id ? 'bg-blue-50' : ''
                  }`}
                >
                  <img
                    width={40}
                    height={40}
                    className="object-cover w-10 h-10 rounded-full flex-shrink-0"
                    src={obj?.User[0]?.profileImage}
                    alt={obj?.User[0]?.name}
                  />
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-gray-900 truncate">{obj?.User[0]?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{obj?.latestMessage?.content || 'No messages yet'}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col h-full min-w-0">

          {/* Chat header */}
          <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-200 bg-sky-950 flex-shrink-0">
            {selectedUser ? (
              <>
                <div className="relative">
                  <img
                    width={42}
                    height={42}
                    className="object-cover w-11 h-11 rounded-full border-2 border-white/20"
                    src={selectedUser?.User[0]?.profileImage}
                    alt="username"
                  />
                </div>
                <span className="font-semibold text-gray-900 text-base">
                  {selectedUser?.User[0]?._id === userId
                    ? selectedUser?.User[1]?.name
                    : selectedUser?.User[0]?.name}
                </span>
              </>
            ) : (
              <span className="text-gray-300 text-sm">Select a conversation</span>
            )}
          </div>

          {/* Messages */}
          <div ref={scrolldownRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-2 bg-gray-50">
            {messages.map((obj, index) => (
              <div
                key={index}
                className={`flex ${obj?.sender?._id === userId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-sm px-4 py-2 rounded-2xl text-sm shadow-sm ${
                    obj?.sender?._id === userId
                      ? 'bg-sky-950 text-gray-900 rounded-br-none'
                      : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {obj?.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleMessageSent}
            className="flex items-center gap-3 px-4 py-3 border-t border-gray-200 bg-white flex-shrink-0"
          >
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 py-2.5 px-4 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm"
              name="message"
              onChange={(e) => setMessageFn(e)}
              value={newMessage}
              required
            />
            <button
              type="submit"
              className="w-10 h-10 flex items-center justify-center bg-sky-950 hover:bg-sky-800 text-white rounded-full transition-colors duration-200 flex-shrink-0"
            >
              <svg
                className="w-5 h-5 transform rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserChat;
