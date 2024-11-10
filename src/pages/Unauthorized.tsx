import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MyContext } from "../providers/MyProvider";

function Unauthorized() {
  const context = useContext(MyContext);

  useEffect(() => {
    context?.setisHideSidebarAndHeader(true);
  }, [context]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>401 - Unauthorized</h1>
      <p>You are not authorized to view this page.</p>
      <Link to="/product">Go to Home</Link>
    </div>
  );
}

export default Unauthorized;
