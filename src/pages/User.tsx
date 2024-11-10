import React, { useEffect, useState, useContext } from "react";
import { Table } from "react-bootstrap";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";
import { MyContext } from "../providers/MyProvider";
import { useSearchUserMutation } from "../services/apis/user";

function User() {
  document.title = "MyShop | Users";

  const context = useContext(MyContext);
  const [searchKeyword, setSearchKeyword] = useState("a");
  const [searchUser, { data: usersData, isError }] = useSearchUserMutation();

  useEffect(() => {
    context?.setisHideSidebarAndHeader(false);
  }, [context]);

  useEffect(() => {
    searchUser({ searchKey: searchKeyword });
  }, [searchKeyword, searchUser]);

  useEffect(() => {
    if (isError) {
      toast.error("Unable to fetch users.");
    }
  }, [isError]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    searchUser({ searchKey: event.target.value });
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
        <h5 className="mb-0">User List</h5>
      </div>

      <div className="card shadow border-0 p-3 mt-4">
        <h4 style={{color: "black"}}>FILTER BY:</h4>
        <div className="mb-3">
          <FormControl fullWidth />
          <input
            id="search"
            type="text"
            value={searchKeyword}
            onChange={handleSearchChange}
            placeholder="Search for users..."
          />
        </div>

        {usersData?.data?.users && (
          <div className="table-responsive mt-3">
            <Table className="table table-bordered table-striped v-align">
              <thead className="thead-dark">
                <tr>
                  <th>NO</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>
                {usersData.data.users.map((user, index) => (
                  <tr key={user.userId}>
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
