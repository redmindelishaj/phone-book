import { Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";

const MainApp = () => (
	<Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
    </Switch>
);

export default MainApp;
