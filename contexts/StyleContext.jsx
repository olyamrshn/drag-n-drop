import React, {createContext, useContext} from 'react'

const StyleContext = createContext()

export const useGlobalStyles = () => useContext(StyleContext)

export const StyleProvider = ({children}) => {
  const globalStyles = {
    backgroundColor: 'black',
  };

  return (
    <StyleContext.Provider value={globalStyles}>
      {children}
    </StyleContext.Provider>
  );
};
