import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

    const handleFantastic = () => {
        const botMessage = createChatBotMessage('cocacolastic.');
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };

      const handleDog = () => {
        const botMessage = createChatBotMessage(
          "Here's a nice dog picture for you!",
          {
            widget: 'dogPicture',
          }
        );
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
    };

    const handleRegistro = () => {
        const botMessage = createChatBotMessage(
            'Regístrate aquí',
            {
                widget: 'registerButton'
            }
            );
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };

      const handleFeedback = () => {
        const botMessage = createChatBotMessage(
            'Para quejas, sugerencias, opiniones, etc:',
            {
                widget: 'feedback'
            }
            );
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };

      const handleNotFound = () => {
        const botMessage = createChatBotMessage(
            'No entiendo'
            );
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleFantastic,
            handleDog,
            handleRegistro,
            handleFeedback,
            handleNotFound
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;