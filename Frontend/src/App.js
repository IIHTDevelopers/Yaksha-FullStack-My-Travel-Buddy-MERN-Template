import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Destination from './components/destination/Destination';
import Homepage from './components/homepage/Homepage';
import Login from './components/login/Login';
import Review from './components/review/Review';
import Booking from './components/booking/Booking';
import Trip from './components/trip-plans/Trip';
import User from './components/user/User';

function App() {
  return (
    <Router>
      <div className="App">
        <Homepage />
        <Switch>
          {/* <Route exact path="/" component={Homepage} /> */}
          <Route path="/login" component={Login} />
          <Route path="/review" component={Review} />
          <Route path="/destination" component={Destination} />
          <Route path="/booking" component={Booking} />
          <Route path="/trips" component={Trip} />
          <Route path="/user" component={User} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
