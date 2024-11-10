import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/apis/auth";
import { toast } from "react-toastify";

interface LoginValues {
  username: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const login = async (values: LoginValues) => {
    try {
      const res = await loginUser({
        userName: values.username,
        password: values.password,
      }).unwrap();

      if (res.status === 200) {
        toast.success(res.message || "Login successful.");
        navigate("/verify");
      } else {
        toast.error(res.message || "Login failed.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "An error occurred during login.");
    }
  };

  return { login, isLoading };
};
