import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logoo.png";
import Button from "@mui/material/Button";
import {
  MdMenuOpen,
  MdOutlineMenu,
  MdOutlineLightMode,
  MdDarkMode,
} from "react-icons/md";
import { MyContext } from "../../providers/MyProvider";
import { UserContext } from "../../providers/UserProvider";

function Header() {
  const context = useContext(MyContext);
  const userContext = useContext(UserContext);

  if (!context || !userContext) return null;

  // Get username and email from user context
  const username = userContext.userData?.userName;
  const email = userContext.userData?.userName;

  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center w-100">
          {/* Logo Wrapper */}
          <div className="col-sm-2 part1">
            <Link to={"/product"} className="d-flex align-items-center logo">
              <img src={logo} alt="MyShop Logo" />
              <span className="ml-2">MyShop Admin</span>
            </Link>
          </div>

          <div className="col-sm-3 d-flex align-items-center part2">
            <Button
              className="rounded-circle mr-3"
              onClick={() =>
                context.setIsToggleSidebar(!context.isToggleSidebar)
              }
            >
              {context.isToggleSidebar ? <MdOutlineMenu /> : <MdMenuOpen />}
            </Button>
          </div>

          <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
            <Button
              className="rounded-circle mr-3"
              onClick={() => context.setThemeMode(!context.themeMode)}
            >
              {context.themeMode ? <MdOutlineLightMode /> : <MdDarkMode />}
            </Button>

            <div className="myAccWrapper">
              <Link to="/account">
                <Button className="myAcc d-flex align-items-center">
                  <div className="userInfo">
                    <h4>{username?.toLowerCase()}</h4>
                    <p className="mb-0">@{email?.toLowerCase()}</p>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
