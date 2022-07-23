import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from './widgets/DogPicture.jsx'
import FeedbackButton from './widgets/FeedbackButton.jsx';
import RegisterButton from './widgets/RegisterButton.jsx';

const botName = 'tuturrito 2014 :$'
const config = {
  initialMessages: [createChatBotMessage(`q onda wacho soy ${botName} todo piolita llegaste al mejor cine pa`)],
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
      backgroundColor: '#E6CC05',
    },
    
    },
};

export default config;