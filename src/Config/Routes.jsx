import { Switch, Route } from "react-router-dom";
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from "../pages/Detail/Detail";
const Routes = () => (
   <Switch>
      <Route path="/:category/search/:keyword" component={Catalog} />
      <Route path="/:category/:id" component={Detail} />
      <Route path="/:category" component={Catalog} />
      <Route exact path="/" component={Home} />
   </Switch>
)

export default Routes;