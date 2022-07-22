import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log(message);
    if (message.includes('fantastic')) {
        actions.handleFantastic()
      }

      if (message.includes('dog')) {
        actions.handleDog();
      }

      if (message.includes('regis')) {
        actions.handleRegistro();
      }

      const feedbackTriggers = ['queja', 'suger', 'opin']
      feedbackTriggers.forEach(element => {
        if (message.includes(element)) {
            actions.handleFeedback();
          }
      });
    //   if (!message.includes('fantastic', 'dog', 'registro', 'registrarse', 'registrar')){
    //     actions.handleNotFound()
    //   }
  };

  

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;