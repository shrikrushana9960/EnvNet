import React,{useState,useEffect,useCallback} from 'react'
import { Image ,Input,Card} from "antd";
import { PageHeader, Button, Avatar,Form } from "antd";
import { Timeline,Tag,message ,Row,Col,Spin} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {useHistory,useLocation} from "react-router-dom"
 const SinglePost = () => {
   const{Meta}=Card;
   const location=useLocation()
   const [loading,setLoading]=useState(false);
   const [login,setLogin]=useState(false);
   const [sp,setsp]=useState(false)
   const history=useHistory();
   const [funds,setFunds]=useState(false);
    const id=location.pathname.split("/")[2]
    console.log(id);
    const [secoand,setSecoand]=useState("")
    const [third,setThird]=useState("");
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]);
  const [desc, setDesc] = useState("");
  const [posturl,setPosturl]=useState("");
  const [authorName,setAuthorName]=useState("");
  const [authorid,setAutherId]=useState("");
  const [timePost,setTimePost]=useState(false)
  const [timePostData,setTimePostData]=useState([]);
  const [dataurl,setData]=useState([])
  const [sponserName,setSponserName]=useState("");
  const [sponserId, setSponserId] = useState("");
  const [approvesecond,setAprroveSecond]=useState(true);
   const [approveThird, setAproveThird] = useState(true);
  const updateButton = async (type) => {
    console.log(type)
    const values = {
      id: id,
      
    };
    if (type === 2) {
      values.secondapprove = true;
      setAprroveSecond(true);
    } else {
      values.thirdapprove = true;
      setAproveThird(true);
    }
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
      
    }
  };
  const handleImage = () => {
    if (posturl) {
      setVisible(false);
      dataurl.push(posturl);
   
      setPosturl("");
    }
  };
   const  timeData =useCallback( async () => {
     const SIGNUP_URL = `https://envnet-api.herokuapp.com/blog/post/getAll/${id}`;

     const res = await fetch(SIGNUP_URL);

     const data = await res.json();

     if (res.status !== 200 || !data) {
       setLoading(false);
       window.alert("Error");
       console.log("error");
     } else {
       setLoading(false);
       setTimePostData(data.result);
       console.log(data);
     }
   },[id])
  
  useEffect(() => {
    if (localStorage.getItem("log") == "true") {
       
       setLogin(true);
    }
    if(localStorage.getItem("role")=="social")
    {

    }
    else{
      setsp(true);
    }
     const getSponser= async (dataId) => {
       const SIGNUP_URL = `https://envnet-api.herokuapp.com/user/single/${dataId}`;

       const res = await fetch(SIGNUP_URL);

       const data = await res.json();

       if (res.status !== 200 || !data) {
         setLoading(false);
         window.alert("Error");
         console.log("error");
       } else {
         setLoading(false);
       setSponserName(data.username); 
       }
     };
  
    const getData = async () => {
      const SIGNUP_URL = `https://envnet-api.herokuapp.com/blog/single/${id}`;

      const res = await fetch(SIGNUP_URL);

      const data = await res.json();
      
      if (res.status !== 200 || !data) {
        setLoading(false);
        window.alert("Error");
        console.log("error");
      } else {
        setLoading(false);
        
        setTitle(data.data.title);
        setDesc(data.data.desc);
        setImage(data.data.image)
        getAuthor(data.data.userId);
        setAutherId(data.data.userId)
        
        if (data.data.firstapprove)
        {
          setsp(false)
          setSecoand(data.data.second);
          setThird(data.data.third)
          setAprroveSecond(data.data.secondapprove);
          setAproveThird(data.data.thirdapprove);
          setFunds(true)
          timeData()
          getSponser(data.data.sponserId);
          setSponserId(data.data.sponserId)
          if (data.data.userId=== localStorage.getItem("userId")) {
            setTimePost(true);
          }
        } console.log(data);
      }
    };
  
    const getAuthor = async (dataId) => {
      const SIGNUP_URL = `https://envnet-api.herokuapp.com/user/single/${dataId}`;

      const res = await fetch(SIGNUP_URL);

      const data = await res.json();

      if (res.status !== 200 || !data) {
        setLoading(false);
        window.alert("Error");
        console.log("error");
      } else {
        setLoading(false);

        setAutherId(data.id)
        setAuthorName(data.username)
        console.log(data);
      }
    };
    getData();
    
  }, [timeData,id]);
  const onFinish = (values) => {
    values.images =
      dataurl ||
      "https://m.economictimes.com/thumb/msid-63293846,width-1200,height-900,resizemode-4,imgsize-49958/donation-charity.jpg";
    values.blogid=id;
    const setPost = async () => {
      const SIGNUP_URL = "https://envnet-api.herokuapp.com/blog/post/create";

      const res = await fetch(SIGNUP_URL, {
        method: "POST",
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
        message.success("succesful updaeted post");
        timeData()
        console.log("Subscribed SUCCESSFUL");
      }
    };
    setPost()
    
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
    return (
      <>
        {loading ? (
          <Spin />
        ) : (
          <>
            <PageHeader
              ghost={false}
              title={title}
              extra={
                login
                  ? sp && [
                      <Button
                        onClick={() => history.push(`/funds/${id}`)}
                        key="1"
                        type="primary"
                      >
                        Approve Funds
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
            ></PageHeader>

            <div
              style={{
                width: "100%",
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Card hoverable style={{ width: "98%", borderRadius: "10px" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Row>
                      {image.map((item) => (
                        <Col span={8}>
                          <Image width="80%" src={item} />
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
                <div
                  style={{}}
                  dangerouslySetInnerHTML={{ __html: desc }}
                ></div>
              </Card>
              <Card
                title="Author"
                hoverable
                style={{
                  width: "98%",
                  marginTop: "10px",
                  borderRadius: "10px",
                }}
              >
                <Meta
                  avatar={
                    <Avatar src="https://cdn.dribbble.com/users/2199928/screenshots/11532918/shot-cropped-1590177932366.png?compress=1&resize=400x300" />
                  }
                  title={authorName}
                  description={<Tag color="#87d068">Social Woker</Tag>}
                />
              </Card>
              {timePost && (
                <Card
                  title="share work"
                  hoverable
                  style={{
                    width: "98%",
                    marginTop: "10px",
                    borderRadius: "10px",
                  }}
                >
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
                      {dataurl.map((item) => (
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
                          onChange={(e) => setPosturl(e.target.value)}
                        />
                        <Button
                          style={{ margin: "10px" }}
                          onClick={handleImage}
                        >
                          Add Image
                        </Button>
                      </div>
                    )}

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Post
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              )}{" "}
              {funds && (
                <>
                  <Card
                    title="Money Doner"
                    hoverable
                    style={{ width: "98%",borderRadius:"10px", marginTop: "10px" }}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://cdn.dribbble.com/users/2199928/screenshots/11532918/shot-cropped-1590177932366.png?compress=1&resize=400x300" />
                      }
                      title={sponserName}
                      description={<Tag color="#2003fc">Doner</Tag>}
                    />
                  </Card>
                  {localStorage.getItem("userId") === sponserId && (
                    <Card
                      title="Apporve Payment"
                      hoverable
                      style={{borderRadius:"10px", width: "98%", marginTop: "10px" }}
                    >
                      {!approvesecond && (
                        <Button
                          style={{ margin: "5px" }}
                          onClick={() => {
                            updateButton(2);
                            onFinish({
                              title: " Approved 2st installment",
                              secondapprov: true,
                            });
                          }}
                        >
                          Approve 2st installment {secoand}
                        </Button>
                      )}
                      {!approveThird && (
                        <Button
                          style={{ margin: "5px" }}
                          onClick={() => {
                            updateButton("third");
                            onFinish({
                              title: " Approved 3rd installment",
                              thirdapprove: true,
                            });
                          }}
                        >
                          Approve 3rd installment {third}
                        </Button>
                      )}
                    </Card>
                  )}
                  <Card
                    title="Fund disbursement  and Usage Details"
                    hoverable
                    style={{ width: "98%",borderRadius:"10px", marginTop: "10px" }}
                  >
                    <Timeline mode="alternate">
                      {timePostData.map((item) => {
                        return (
                          <Timeline.Item color="green">
                            <h3>{item.title}</h3>
                            {item.images.map((item) => (
                              <Image width="200px" src={item} />
                            ))}
                          </Timeline.Item>
                        );
                      })}
                    </Timeline>
                  </Card>
                </>
              )}
            </div>
          </>
        )}
      </>
    );
}

export default SinglePost;