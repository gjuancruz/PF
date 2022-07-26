import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from './widgets/DogPicture.jsx'
import FeedbackButton from './widgets/FeedbackButton.jsx';
import RegisterButton from './widgets/RegisterButton.jsx';

const botName = 'Pocho'
const config = {
  initialMessages: [createChatBotMessage(`¡Bienvenido a Moon Cinema! Soy ${botName}, el asistente virtual. ¿En qué puedo ayudarte?`)],
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },

    {
        widgetName: 'registerButton',
        widgetFunc: (props) => <RegisterButton {...props} />,
    },

    {
        widgetName: 'feedback',
        widgetFunc: (props) => <FeedbackButton {...props} />,
    },
    ],

  botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#141413',
    },
    chatButton: {
      backgroundColor: '#fbde21',
    },
    
    },
};

export default config;