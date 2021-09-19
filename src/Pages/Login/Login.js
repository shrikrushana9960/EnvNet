import React, { useState,useEffect } from "react";
import { Form, Input, Button, Radio, Card, message, Spin } from "antd";
import { useHistory } from "react-router-dom";
import logo from "../../logo.png"
const Login = () => {
  const log=localStorage.getItem("log");
const [loading, setLoading] = useState(false);
const history = useHistory();

useEffect(()=>{
  if(log=="true")
  {
    history.push("/timeline")
  }
},[])
const saveData = (data) => {
  localStorage.setItem("userId", data.id);
  localStorage.setItem("name", data.username);
  localStorage.setItem("role", data.role);
  localStorage.setItem("log",true)
};
const onFinish = async (values) => {
  setLoading(true);
  
  const SIGNUP_URL = "https://envnet-api.herokuapp.com/user/login";

  const res = await fetch(SIGNUP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
 console.log("Success:", values);
  const data = await res.json();
  console.log(data);
  if (res.status !== 200 || !data) {
    setLoading(false);
    window.alert("INVALID REGISTRATION");
    console.log("INVALID REGISTRATION");
  } else {
    setLoading(false);
    message.success("login succesful");
    console.log("Subscribed SUCCESSFUL");
    saveData(data);
    history.push("/timeline");
  }
 
};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={logo} height={200} width={200} />
      <h2>Login</h2>
      <Card hoverable style={{ width: "60vh", borderRadius: "10px" }}>
        <Form
          name="basic"
          labelCol={{}}
          wrapperCol={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            {loading && <Spin />}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
