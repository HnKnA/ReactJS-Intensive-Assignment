import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { MyContext } from "../../providers/MyProvider";
import { UserContext } from "../../providers/UserProvider";

function Sidebar() {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

  const userContext = useContext(UserContext);
  const context = useContext(MyContext);

  if (!context || !userContext) return null;

  function isOpenSubmenu(index: number) {
    setActiveTab(index);
    setIsToggleSubmenu(!isToggleSubmenu);
  }

  function logout() {
    userContext?.doLogout();
    window.location.href = "/";
  }

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/product">
            <Button
              className={`w-90 ${activeTab === 1 ? "active" : ""}`}
              onClick={() => isOpenSubmenu(1)}
            >
              <span className="icon">
                <MdDashboard />
              </span>
              Product
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/order">
            <Button
              className={`w-90 ${activeTab === 2 ? "active" : ""}`}
              onClick={() => isOpenSubmenu(2)}
            >
              <span className="icon">
                <MdDashboard />
              </span>
              Order
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/user">
            <Button
              className={`w-90 ${activeTab === 3 ? "active" : ""}`}
              onClick={() => isOpenSubmenu(3)}
            >
              <span className="icon">
                <MdDashboard />
              </span>
              User
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
          </Link>
        </li>
      </ul>
      <br />
      <div className="logoutWrapper">
        <div className="logoutBox">
          <Button variant="contained" onClick={logout}>
            <IoMdLogOut /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
