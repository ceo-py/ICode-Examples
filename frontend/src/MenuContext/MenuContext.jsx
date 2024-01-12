import { createContext, useContext, useState } from 'react';

const MenuContext = createContext({
  share: true,
  setShare: () => {},
});

const useShare = () => {
  const { share, setShare } = useContext(MenuContext);
  return { share, setShare };
};

const ShareProvider = ({ children }) => {
  const [share, setShare] = useState(true);

  return (
    <MenuContext.Provider value={{ share, setShare }}>
      {children}
    </MenuContext.Provider>
  );
};

export { ShareProvider, useShare };
