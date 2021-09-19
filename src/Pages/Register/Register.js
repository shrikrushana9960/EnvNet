import React,{useState} from "react";
import { Form, Input, Button, Radio, Card,message,Spin } from "antd";
import logo from "../../logo.png"
import {useHistory} from "react-router-dom"
const Register= () => {
  const [loading,setLoading]=useState(false);
  const history=useHistory()
  const onFinish =async (values) => {
    setLoading(true)
      const SIGNUP_URL = "https://envnet-api.herokuapp.com/user/create";

           const res = await fetch(SIGNUP_URL, {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify(values),
           });

           const data = await res.json();
                console.log(res)
           if (res.status !== 200 || !data) {
             setLoading(false);
             window.alert("INVALID REGISTRATION");
             console.log("INVALID REGISTRATION");
           } else {
             setLoading(false);
             message.success("Register succesful")
             console.log("Subscribed SUCCESSFUL");
            
               history.push("/login");
           }
    console.log("Success:", values);
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
      <img src={logo} height={200} width={200}/>
      <h2>Register</h2>
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
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
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
            rules={[
              {
                required: true,
                message: "Please choose role!",
              },
            ]}
            name="role"
          >
            <Radio.Group>
              <Radio.Button value="social">Social Worker</Radio.Button>
              <Radio.Button value="sponser">Sponser</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            {loading && <Spin />}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
