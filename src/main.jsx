import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import "./styles";
import ChatBot from "./components/chatbot"



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ChatBot />
  </StrictMode>
);