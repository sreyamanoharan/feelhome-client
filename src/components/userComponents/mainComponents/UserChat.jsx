import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(()=>{
    axiosInstance.post('/chat/create-chat',{userId,hostId})
  },[])

  useEffect(() => {
    socket.emit('setup', userId);
    socket.emit('join chat',userId)
  }, [messages, userId]);

  useEffect(() => {
    const fetch = async () => {
      allChats(userId).then((data) => {
        let lists = data?.map((obj) => {
          let filteredUsers = obj.User.filter((item) => item._id !== userId);
          return {
            ...obj,
            User: filteredUsers,
          };
        });
        setChats(lists);
        if (lists.length > 0) {
          // Select the first chat and fetch its messages
          selectChat(lists[0]);
          handleMessageFetch(lists[0]._id);
        }
      });
    };
    fetch();
  }, [userId]);

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
    <div className="h-900px pt-20">      
 <div className="min-w-full border rounded lg:grid lg:grid-cols-3 bg-white text-gray-900">
        <div className="border-r border-gray-300 lg:col-span-1">
          <div className="overflow-auto">
            <div>
              <ul>
                {chats?.map((obj) => (
                  <li
                    key={obj._id}
                    onClick={() => {
                      selectChat(obj);
                      handleMessageFetch(obj._id);
                    }}
                  >
                    <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                      <img
                        width={40}
                        height={40}
                        className="object-cover w-10 h-10 rounded-full"
                        src={obj?.User[0]?.profileImage}
                        alt="username"
                      />
                      <div className="w-full pb-2">
                        <span className="block ml-2 text-sm text-red-900">
                          {obj?.User[0]?.name}
                        </span>
                        <span className="block ml-2 text-sm text-gray-600">
                          {obj?.latestMessage?.content}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-2 h-auto">
          <div className="hidden lg:col-span-2 lg:block">
            <div className="w-full">
              <div className="relative flex items-center p-3 border-b border-gray-300 bg-sky-950">
                {selectedUser && (
                  <img
                    width={40}
                    height={40}
                    className="object-cover w-10 h-10 rounded-full"
                    src={selectedUser?.User[0]?.profileImage}
                    alt="username"
                  />
                )}
                <span className="block ml-2 text-gray-900 font-semibold">
                  {selectedUser?.User[0]?._id === userId
                    ? selectedUser?.User[1]?.name
                    : selectedUser?.User[0]?.name}
                </span>
              </div>

              <div className="relative w-full p-6 overflow-y-auto h-[38rem]">
                <ul className="space-y-2">
                  {messages.map((obj, index) => (
                    <li
                      key={index}
                      className={`${
                        obj?.sender?._id === userId
                          ? 'justify-end'
                          : 'justify-start'
                      } flex `}
                    >
                      <div
                        className={`relative max-w-xl px-4 py-2 text-gray-700 rounded shadow ${
                          obj?.sender?._id !== userId ? 'bg-gray-200' : ''
                        }`}
                      >
                        <span className="block">{obj?.content}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <form
                onSubmit={handleMessageSent}
                className="flex items-center justify-between w-full p-3 border-t border-gray-300"
              >
                <input
                  type="text"
                  placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  onChange={(e) => setMessageFn(e)}
                  value={newMessage}
                  required
                />
                <button type="submit">
                  <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
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
        </div>
        </div>
 
      </div>
   
    </>
  );
};

export default UserChat;
