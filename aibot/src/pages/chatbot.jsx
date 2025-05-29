import '../App';
import chatData from './sampleData.json';
import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { useContext } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Theme } from '../theme/Theme';
import Navbar  from '../components/Navbar/Navbar';
import InitialChat from '../components/InitialChat/InitialChat';
import ChattingCard from '../components/ChattingCard/ChattingCard';
import ChatInput  from '../components/ChatInput/ChatInput';
import FeedBackModal from '../components/FeedBackModal/FeedBackModal';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const [showModal, setShowModal] = useState(false)
    const listRef = useRef(null)
    const [chatId, setChatId] = useState(1)
    const [selectedChatId, setSelectedChatId] = useState(null)
    const [scrollToBottom, setScrollToBottom] = useState(false)
    const { chat, setChat } = useOutletContext();
    const { mode } = useContext(Theme);

  const handleSend = () => {
    const res = chatData.find(item => input.toLowerCase() == item.question.toLowerCase());
    let answer = "Sorry, Did not understand your query!";
    if (res != undefined) {
            answer = res.response;
        }
        setChat(prev => ([...prev,
        {
            type: 'Human',
            text: input,
            time: new Date(),
            id: chatId
        },
        {
            type: 'AI',
            text: answer,
            time: new Date(),
            id: chatId + 1
        }
        ]))

        setChatId(prev => prev + 2);

  };

  useEffect(() => {
        listRef.current?.lastElementChild?.scrollIntoView()
    }, [scrollToBottom])

  return (
        <Stack
            height={'100vh'}
            justifyContent={'space-between'}
            sx={{
                '@media (max-width:767px)': {
                    background: mode == 'light' ? 'linear-gradient(#F9FAFA 60%, #EDE4FF)' : ''
                }
            }}
        >

            <Navbar />

            {chat.length == 0 && <InitialChat handleSend={handleSend} />}

            {chat.length > 0 && (
                <Stack
                    height={1}
                    flexGrow={0}
                    p={{ xs: 2, md: 3 }}
                    spacing={{ xs: 2, md: 3 }}
                    sx={{
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '10px',
                        },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
                            borderRadius: '8px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(151, 133, 186,0.4)',
                            borderRadius: '8px'
                        }
                    }}
                    ref={listRef}
                >
                    {chat.map((item, index) => (
                        <ChattingCard
                            details={item}
                            key={index}
                            updateChat={setChat}
                            setSelectedChatId={setSelectedChatId}
                            showFeedbackModal={() => setShowModal(true)}
                        />
                    ))}
                </Stack>
            )}

            <ChatInput handleSend={handleSend} setScroll={setScrollToBottom} chat={chat} clearChat={() => setChat([])} />

            <FeedBackModal open={showModal} updateChat={setChat} chatId={selectedChatId} handleClose={() => setShowModal(false)} />
        </Stack>
    )
};

export default Chatbot;