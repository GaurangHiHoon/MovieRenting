import React, { Component } from "react";
import { registered } from "../../services/userservice";
import Input from "./input";
class Register extends Component {
  state = {
    account: { email: "", password: "", name: "" },
    errors:""
  };
  handleChange=e=>{
      e.preventDefault();
      const account={...this.state.account};
   
      account[e.currentTarget.id]=e.currentTarget.value;
      this.setState({account});
  }

  onSubmit= async e=>{
      e.preventDefault();

      try{
       const response= await registered(this.state.account);
       localStorage.setItem('token', response.headers['x-auth-token']);
       window.location="/movies";
      }catch(ex){
          if(ex.response&&ex.response.status===400){
              console.log("Inside Catch");
              let errors={...this.state.errors};
              errors=ex.response.data;
              this.setState({errors});
          }
      }
     
      
    //   this.props.history.push("/login");
  }
  render() {
    const { email,password, name} = this.state.account;
    
    return (
      <div className="container">
          <h4>Register</h4>
        Username:
        <Input
          value={email}
          name="email"
          onChange={this.handleChange}
          type="email"
        />
        Password:
        <Input
          value={password}
          name="password"
          onChange={this.handleChange}
          type="password"
        />
        Name:
        <Input
          value={name}
          name="name"
          onChange={this.handleChange}
          type="text"
        />
        <button onClick={this.onSubmit} className="btn btn-primary">Submit</button>
        {!this.state.errors?null:
        <div className="alert alert-danger">{this.state.errors}</div>}
      </div>
    );
  }
}

export default Register;
