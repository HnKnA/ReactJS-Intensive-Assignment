import { createContext, useState, useEffect, ReactNode } from "react";

interface MyContextProps {
  isToggleSidebar: boolean;
  setIsToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isHideSidebarAndHeader: boolean;
  setisHideSidebarAndHeader: React.Dispatch<React.SetStateAction<boolean>>;
  themeMode: boolean;
  setThemeMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MyProviderProps {
  children: ReactNode;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

function MyProvider({ children }: MyProviderProps) {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem("themeMode");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    if (themeMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("themeMode", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("themeMode", "light");
    }
  }, [themeMode]);

  return (
    <MyContext.Provider
      value={{
        isToggleSidebar,
        setIsToggleSidebar,
        isHideSidebarAndHeader,
        setisHideSidebarAndHeader,
        themeMode,
        setThemeMode,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyProvider };
