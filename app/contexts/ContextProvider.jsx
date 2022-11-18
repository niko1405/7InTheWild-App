import React, { createContext, useContext, useState } from "react";
import { useFonts } from "expo-font";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [scrollTop, setScrollTop] = useState(true);
  let [loadingFonts] = useFonts({
    header: require("../assets/fonts/Header.ttf"),
    eroded2: require("../assets/fonts/normal.otf"),
  });

  const handleScroll = (e) => {
    if (e.nativeEvent.contentOffset.y <= 15) {
      if (!scrollTop) setScrollTop(true);
    } else {
      if (scrollTop) setScrollTop(false);
    }
  };

  if (!loadingFonts) return null;

  return (
    <StateContext.Provider
      value={{
        scrollTop,
        handleScroll,
        setScrollTop,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
