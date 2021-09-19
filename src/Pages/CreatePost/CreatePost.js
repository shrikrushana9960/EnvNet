import React,{useState,useEffect} from 'react'
import ReactQuill from 'react-quill'
import { Avatar,Image } from "antd";
import { Form, Input, Button,message } from "antd";
import { Card } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
const CreatePost = () => {
    const [visible,setVisible]=useState(false);
    const [desc,setDesc]=useState();
    const [image,setImage]=useState();
    const [data,setData]=useState([]);
    const log = localStorage.getItem("log");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
      if (log == "true") {
     
      }
      else
      {
           history.push("/login");
      }
    }, []);
    const handleImage=()=>{
        if(image)
        {
            setVisible(false);
            data.push(image);
            console.log(data);
            setImage("");

        }
        
    }
     const onFinish =async (values) => {

         console.log(desc)
         const main = {
           title: values.title,
           image: data,
           desc,
           userId: localStorage.getItem("userId"),
           sponserId:"",
           total:"",
           first:"",
           second:"",
           third:"",
           firstapprove:false,
           secondapprove:false,
           thirdapprove:false,
         };

          setLoading(true);

          const SIGNUP_URL = "https://envnet-api.herokuapp.com/blog/create";

          const res = await fetch(SIGNUP_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(main),
          });
          console.log("Success:", values);
          const d1 = await res.json();
          console.log(d1);
          if (res.status !== 200 || !d1) {
            setLoading(false);
            window.alert("INVALID REGISTRATION");
            console.log("INVALID REGISTRATION");
          } else {
            setLoading(false);
            message.success("Posted succesful");
            console.log("Subscribed SUCCESSFUL");
           console.log(d1)
            history.push("/timeline");
          }
       console.log("Success:", main);
     };

     const onFinishFailed = (errorInfo) => {
       console.log("Failed:", errorInfo);
     };
    return (
      <div>
        <Card hoverable style={{ width: "98%", marginTop: "10px",borderRadius:"10px" }}>
          <h1>Create Post</h1>
          <Form
            name="basic"
            labelCol={{}}
            wrapperCol={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Enter your title",
                },
              ]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <div style={{ display: "flex" }}>
              {data.map((item) => (
                <div style={{ marginRight: "10px" }}>
                  <Image
                    style={{ objectFit: "fill" }}
                    width="64px"
                    height="64px"
                    src={item}
                  />
                </div>
              ))}
              <Avatar
                onClick={() => setVisible(true)}
                shape="square"
                size={64}
                icon={<PlusOutlined />}
                style={{ marginBottom: "40px" }}
              />
            </div>
            {visible && (
              <div>
                <input
                  placeholder="Image URL"
                  onChange={(e) => setImage(e.target.value)}
                />
                <Button style={{ margin: "10px" }} onClick={handleImage}>
                  Add Image
                </Button>
              </div>
            )}
            <ReactQuill
            onChange={(value)=>setDesc(value)}
              style={{ height: "400px", marginBottom: "40px" }}
              theme="snow"
            />

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Post
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
}

export default CreatePost
