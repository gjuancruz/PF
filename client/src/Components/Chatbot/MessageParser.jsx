import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log(message);
    if (message.includes('fantastic')) {
        actions.handleFantastic()
      }

      else if (message.includes('dog')) {
        actions.handleDog();
      }

      else if (message.includes('regis')) {
        actions.handleRegistro();
      }

      // const feedbackTriggers = ['queja', 'suger', 'opin']
      // feedbackTriggers.forEach(element => {
      //  if (message.includes(element)) {
      //       actions.handleFeedback();
      //     }
      // });
      
      else if (message.includes('queja')) {
        actions.handleFeedback();
      }

      else if (message.includes('suger')) {
        actions.handleFeedback();
      }

      else if (message.includes('opin')) {
        actions.handleFeedback();
      }

      else if (message.includes('compr')) {
        actions.handleCompras();
      }

      else if (message.includes('gracias')) {
        actions.handleGracias();
      }

      else{
        actions.handleNotFound();
      }
    
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