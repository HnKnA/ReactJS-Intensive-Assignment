import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MyContext } from "../providers/MyProvider";

function Error() {
  const context = useContext(MyContext);

  useEffect(() => {
    context?.setisHideSidebarAndHeader(true);
  }, [context]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/product">Go to Home</Link>
    </div>
  );
}

export default Error;
