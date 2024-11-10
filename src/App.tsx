import { useContext } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/stores";
import { MyContext, MyProvider } from "./providers/MyProvider";
import AutoLogout from "./components/utils/AutoLogout";
import Header from "./components/commons/Header";
import Sidebar from "./components/commons/Sidebar";
import { UserProvider } from "./providers/UserProvider";
import ToastConfig from "./components/utils/ToastConfig";
import AppRoutes from "./components/routes/AppRoutes";

function App() {
  const inactivityLimit = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  return (
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <MyProvider>
            <AutoLogout inactivityLimit={inactivityLimit} />
            <AppContent />
          </MyProvider>
        </UserProvider>
      </BrowserRouter>
    </Provider>
  );
}

function AppContent() {
  const context = useContext(MyContext);
  if (!context) return null;

  const { isToggleSidebar, isHideSidebarAndHeader } = context;

  return (
    <>
      {isHideSidebarAndHeader !== true && <Header />}
      <div className="main d-flex">
        {isHideSidebarAndHeader !== true && (
          <div className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""}`}>
            <Sidebar />
          </div>
        )}

        <div
          className={`content ${isHideSidebarAndHeader ? "full" : ""} ${
            isToggleSidebar ? "toggle" : ""
          }`}
        >
          <AppRoutes />
          <ToastConfig />
        </div>
      </div>
    </>
  );
}

export default App;
