import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import Product from "../../pages/Product";
import Order from "../../pages/Order";
import Verify from "../../pages/Verify";
import Register from "../../pages/Register";
import Account from "../../pages/Account";
import User from "../../pages/User";
import Unauthorized from "../../pages/Unauthorized";
import Error from "../../pages/Error";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthenticatedRoute from "./AuthenticatedRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoutes allowedRole={["tuan"]} />}>
        <Route path="/user" element={<User />} />
        <Route path="/order" element={<Order />} />
      </Route>
      <Route element={<AuthenticatedRoute />}>
        <Route path="/product" element={<Product />} />
        <Route path="/account" element={<Account />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AppRoutes;
