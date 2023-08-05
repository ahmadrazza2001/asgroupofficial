import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import "./login.css";

const rules = [
  {
    required: true,
    message: "Required, please enter the value...",
  },
];
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(values);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/admin";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <React.Fragment>
      <div className="main-container w-full h-screen">
        <div className="d-flex h-screen bg-white flex-col justify-center items-center shadow-md">
          <button
            className="shadow-md"
            style={{
              marginBottom: "2%",
              padding: "1px 10px",
              background: "green",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              boxShadow: "1px 1px 1px 1px gray",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Home
          </button>
          <div className="login-container bg-white shadow-lg p-5 rounded ">
            <h1 className="text-primary text-2xl">
              Login{" "}
              <span className="text-gray-400 text-2xl">to Admin Pannel</span>
            </h1>
            <Divider />
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Email" name="email" rules={rules}>
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={rules}>
                <Input type="password" placeholder="Password" />
              </Form.Item>

              <Button
                htmlType="submit"
                block
                className="mt-2"
                style={{
                  padding: "1px 10px",
                  border: "none",
                  borderRadius: "8px",
                  background: "indigo",
                  color: "#fff",
                }}
              >
                Login
              </Button>

              <div className="mt-5 text-center">
                <span className="text-gray-500" style={{ fontSize: "12px" }}>
                  (Please avoid trying login if you're not an admin){" "}
                  {/*
                 <Link to="/register" className="text-primary">
                Register
              </Link>
                */}
                </span>
              </div>
            </Form>
          </div>
        </div>
        <footer className="absolute bottom-0 w-full text-center py-4 text-white">
          © {new Date().getFullYear()} AS Group Official
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Login;
