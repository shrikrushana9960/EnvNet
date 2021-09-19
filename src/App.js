import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import SinglePost from "./Pages/SinglePost/SinglePost"
import Timeline from "./Pages/TimeLine/Timeline"
import Login from "./Pages/Login/Login"
import CreatePost from "./Pages/CreatePost/CreatePost"
import Funds from './Pages/Funds/Funds';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/funds/:id">
          <Funds />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/write">
          <CreatePost />
        </Route>
        <Route path="/post/:id">
          <SinglePost />
        </Route>
        <Route path="/">
          <Timeline />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
