import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginForm from "./components/loginform";
import Customers from "./components/customer";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Navbar from "./components/navbar";
import jwtDecode from "jwt-decode";
import MovieForm from "./components/movieForm";
import Register from "./components/common/registerForm";
import { Logout } from "./components/common/logout";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const current = jwtDecode(jwt);
      this.setState({ current });
     
    } catch (ex) {}
  }
  render() {
    return (
      <main className="container">
        <Navbar current={this.state.current} />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/Register" component={Register} />
          <Route
            path="/movies/:id"
            render={(props) => {
             
              if (!this.state.current)
                return (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: props.location }
                    }}
                  />
                );
              return <MovieForm {...props} />;
            }}
          ></Route>
          <Route
            path="/movies"
            render={(props) => <Movies user={this.state.current} {...props} />}
          ></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
