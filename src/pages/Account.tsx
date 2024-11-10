import { useEffect, useContext } from "react";
import { MyContext } from "../providers/MyProvider";
import { useGetUserAccountQuery } from "../services/apis/user";
import { toast } from "react-toastify";
import { Form, Card, Container } from "react-bootstrap";

function Account() {
  const { data: userAccountData, isError: userAccountError } =
    useGetUserAccountQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  document.title = "MyShop | Account";

  const context = useContext(MyContext);

  useEffect(() => {
    context?.setisHideSidebarAndHeader(false);
  }, [context]);

  useEffect(() => {
    if (userAccountError) {
      toast.error("Unable to fetch user's data");
    }

    if (
      userAccountData?.status &&
      (userAccountData.status < 200 || userAccountData.status >= 300)
    ) {
      toast.error(userAccountData.message || "Invalid access");
    }
  }, [userAccountError, userAccountData]);

  return (
    <Container className="mt-5 pt-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4 text-center">Account Information</h2>
        <Form>
          <Form.Group controlId="userName" className="mb-3">
            <Form.Label style={{ color: "black" }}>User Name:</Form.Label>
            <Form.Control
              type="text"
              value={userAccountData?.data?.userName || ""}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label style={{ color: "black" }}>Email:</Form.Label>
            <Form.Control
              type="text"
              value={userAccountData?.data?.email || ""}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="firstName" className="mb-3">
            <Form.Label style={{ color: "black" }}>First Name:</Form.Label>
            <Form.Control
              type="text"
              value={userAccountData?.data?.firstName || ""}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="lastName" className="mb-3">
            <Form.Label style={{ color: "black" }}>Last Name:</Form.Label>
            <Form.Control
              type="text"
              value={userAccountData?.data?.lastName || ""}
              readOnly
            />
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
}

export default Account;
