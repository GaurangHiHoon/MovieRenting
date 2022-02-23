import React, { Component } from "react";
import { login } from "../services/userservice";
import Input from "./common/input";
class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length > 0) {
      return null;
    }

    try {
      const { data: jwt } = await login(this.state.account);
      
      localStorage.setItem("token", jwt.token);
      window.location=this.props.state?this.state.from.pathname:"/movies";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.login = "Invalid username or password";

        this.setState({ errors });
      }
    }
  };

  validate = () => {
    const err = {};
    if (this.state.account.username.trim().length === 0)
      err.username = "Username is required";
    if (this.state.account.password.trim().length === 0)
      err.password = "Password is required";

    return err;
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    return (
      <>
        <div>
          <h4>Login</h4>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="username"
              label="Username"
              onChange={this.handleChange}
              value={this.state.account.username}
              type="text"
            />{" "}
            {!this.state.errors.username ? null : (
              <div className="alert alert-danger">
                {this.state.errors.username}
              </div>
            )}
            <Input
              name="password"
              label="Password"
              type="password"
              onChange={this.handleChange}
              value={this.state.account.password}
            />
            {!this.state.errors.password ? null : (
              <div className="alert alert-danger">
                {this.state.errors.password}
              </div>
            )}
            <button className="btn btn-primary mt-2">Submit</button>
            <br />
          </form>
        </div>
        {this.state.errors.login ? (
          <div className="alert alert-danger mt-2">
            {this.state.errors.login}
          </div>
        ) : null}
      </>
    );
  }
}

export default LoginForm;
