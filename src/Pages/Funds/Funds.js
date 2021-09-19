import React,{useState} from 'react'
import { Form, Input, Button, message, Card } from "antd";

import {useHistory,useLocation} from "react-router-dom"
const Funds = () => {
  const [loading,setLoading]=useState(false)
  const history=useHistory()
  const location=useLocation();
  const id = location.pathname.split("/")[2];
  console.log(id);
    const onFinish = async(values) => {
      values.sponserId=localStorage.getItem("userId")
      const post = {
        blogid: id,
        title: ` fund Approve ${values.first}`,
        images: [
          "https://m.economictimes.com/thumb/msid-63293846,width-1200,height-900,resizemode-4,imgsize-49958/donation-charity.jpg",
        ],
      };
      values.firstapprove=true;
      values.id=id;
 const setPost = async () => {
   const SIGNUP_URL = "https://envnet-api.herokuapp.com/blog/post/create";

   const res = await fetch(SIGNUP_URL, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(post),
   });

   const data = await res.json();
   console.log(res);
   if (res.status !== 200 || !data) {
     setLoading(false);
     window.alert("INVALID REGISTRATION");
     console.log("INVALID REGISTRATION");
   } else {
     setLoading(false);
     message.success("First Installment  succesful");
     console.log("Subscribed SUCCESSFUL");

  
   }
 };

      const SIGNUP_URL = `https://envnet-api.herokuapp.com/blog/addFund/${id}`;

      const res = await fetch(SIGNUP_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log(res);
      if (res.status !== 200 || !data) {
        setLoading(false);
        window.alert("INVALID REGISTRATION");
        console.log("INVALID REGISTRATION");
      } else {
        setLoading(false);
        message.success("Sponserd succesful");
        console.log("Subscribed SUCCESSFUL");
          setPost();
        history.push(`/post/${id}`);
      }
     

      message.success("succesfully sponserd")
      console.log("Success:", values,post);
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
        <h2>Payment</h2>
        <Card hoverable style={{ width: "60vh" }}>
          <Form
            name="basic"
            labelCol={{}}
            wrapperCol={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="total"
              rules={[
                {
                  required: true,
                  message: "Please enter total Amount!",
                },
              ]}
            >
              <Input placeholder="Total Amount in $" />
            </Form.Item>

            <Form.Item
              name="first"
              rules={[
                {
                  required: true,
                  message: "Please Enter first Installemnt!",
                },
              ]}
            >
              <Input placeholder="first Installemnt Amount in $" />
            </Form.Item>
            <Form.Item
              name="second"
              rules={[
                {
                  required: true,
                  message: "Please Enter Secoand Installemnt!",
                },
              ]}
            >
              <Input placeholder="Secoand Installemnt Amount in $" />
            </Form.Item>
            <Form.Item
              name="third"
              rules={[
                {
                  required: true,
                  message: "Please Enter Third Installemnt!",
                },
              ]}
            >
              <Input placeholder="Third Installemnt Amount in $" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Set Funds
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
}

export default Funds
