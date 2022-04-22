import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CreatePlayList from "./page/createPlaylist";
import Login from "./page/login";
import {useSelector} from "react-redux";
import Navbar from "./Component/Navbar";

function App() {
  const isLogin = useSelector(state => state.auth.isLogin);

  return (
  <div className="App">
    <Router> 
    <div>
    <Switch>
      <Route path={"/create-playlist"}>
      <Navbar/>
        {isLogin ? <CreatePlayList/> : <Redirect to={"/"}/>}
      </Route>
      <Route path={"/"} >
        <Login/>
      </Route>
    </Switch>
    </div>
    </Router>
  </div>
  );
}

export default App;
