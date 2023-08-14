import { message, Table } from "antd";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { SetLoader } from "../../redux/loadersSlice";
import { GetAllUsers, UpdateUserStatus } from "../../apicalls/users";

function Users() {
  const [users, setUsers] = React.useState([]);

  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllUsers(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }, [dispatch, setUsers]);

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateUserStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 250,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 250,
    },
    {
      title: "Role",
      dataIndex: "role",
      width: 250,

      render: (text, record) => {
        return record.role;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      width: 250,
      render: (text, record) =>
        moment(record.createdAt).format("DD/MM/YYYY (hh:mm A)"),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 250,
      render: (text, record) => {
        return (
          <p>
            {record.status === "active" ? (
              <p style={{ color: "green" }}>Active</p>
            ) : (
              <p style={{ color: "red" }}>Blocked</p>
            )}
          </p>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 250,
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "active" && (
              <span
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "1px 10px",
                }}
                className="cursor-pointer"
                onClick={() => onStatusUpdate(_id, "blocked")}
              >
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                style={{
                  background: "orange",
                  color: "black",
                  border: "none",
                  borderRadius: "5px",
                  padding: "1px 10px",
                }}
                className="cursor-pointer"
                onClick={() => onStatusUpdate(_id, "active")}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full px-2 sm:px-0">
      <div className="overflow-auto">
        <Table columns={columns} dataSource={users} />
      </div>
    </div>
  );
}

export default Users;
