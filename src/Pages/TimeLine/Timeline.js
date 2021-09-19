import React,{useState,useEffect} from 'react'
import { PostCard } from '../../components/PostCard/PostCard'
import { Row, Col,Card ,Avatar,Spin} from 'antd';
import { useHistory } from 'react-router';
import logo from "../../logo.png"
import { PageHeader, Button,Tag} from "antd";

import "./Timeline.css"
const Timeline = () => {
    const [login,setLogin]=useState(false);
    const [blog,setBlog]=useState([]);
    const [loading,setLoading]=useState();
    const [role,setRole]=useState(false);
    const history=useHistory();
    
useEffect(() => {
  if (localStorage.getItem("log") == "true") {
    if(localStorage.getItem("role")==="social")
    {

    }
    else
    {
      setRole(true)
    }
   setLogin(true)
  }
  const getData=async()=>{
     const SIGNUP_URL = "https://envnet-api.herokuapp.com/blog/getAll";

           const res = await fetch(SIGNUP_URL);

           const data = await res.json();
                console.log(res)
           if (res.status !== 200 || !data) {
             setLoading(false);
             window.alert("Error");
             console.log("error");
           } else {
             setLoading(false);
            setBlog(data.data)
              console.log(data.data)
            
           }
  }
  getData()
}, []);
    return (
      <>
        {" "}
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            title="Article"
            avatar={{ src: logo }}
            extra={
              login
                ? role
                  ? [
                      <Button
                        onClick={() => {
                          localStorage.removeItem("log");
                          localStorage.removeItem("id");
                          localStorage.removeItem("name");
                          localStorage.removeItem("role");
                          history.push("/login");
                        }}
                        key="1"
                        type="primary"
                      >
                        Logout
                      </Button>,
                    ]
                  : [
                      <Button
                        onClick={() => history.push("/write")}
                        key="1"
                        type="primary"
                      >
                        Write
                      </Button>,
                      <Button
                        onClick={() => {
                          localStorage.removeItem("log");
                          localStorage.removeItem("id");
                          localStorage.removeItem("name");
                          localStorage.removeItem("role");
                          history.push("/login");
                        }}
                        key="1"
                        type="primary"
                      >
                        Logout
                      </Button>,
                      <Avatar
                        size={50}
                        src="https://cdn.dribbble.com/users/2199928/screenshots/11532918/shot-cropped-1590177932366.png?compress=1&resize=400x300"
                      ></Avatar>,
                    ]
                : [
                    <Button onClick={() => history.push("/login")} key="3">
                      Login
                    </Button>,

                    <Button
                      onClick={() => history.push("/register")}
                      key="1"
                      type="primary"
                    >
                      Register
                    </Button>,
                  ]
            }
          >
            {" "}
          </PageHeader>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "grid", width: "80%", marginRight: "5%" }}>
            <Row>
              {loading ? (
                <Spin />
              ) : (
                blog.map((item) => (
                  <Col span={8}>
                    <PostCard
                      title={item.title}
                      img={item.image}
                      funds={item.firstapprove}
                      id={item._id}
                    />
                  </Col>
                ))
              )}{" "}
            </Row>
          </div>
          <div
            style={{
              width: "20%",
              marginTop: "10px",
              marginRight: "40px",
            }}
          >
            <Card
              hoverable
              title="Profile"
              style={{ position: "fixed",borderRadius:"10px", width: "40vh" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Avatar size={100} src={logo}></Avatar>
                <Avatar
                  size={100}
                  src="https://cdn.dribbble.com/users/2199928/screenshots/11532918/shot-cropped-1590177932366.png?compress=1&resize=400x300"
                ></Avatar>
                <h2>
                  {localStorage.getItem("name") === ""
                    ? "Guest"
                    : localStorage.getItem("name")}
                </h2>
                <Tag color="#1703fc">
                  {localStorage.getItem("role") === "social"
                    ? "social worker"
                    : localStorage.getItem("log")
                    ? "Sponserd"
                    : "Guest"}
                </Tag>
              </div>
            </Card>
          </div>
        </div>
      </>
    );
}

export default Timeline
