// import React, { Component } from 'react';
// import {signup} from '../auth';
// import {Link} from 'react-router-dom';
//
// class Signup extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "",
//       email: "",
//       password: "",
//       error: "",
//       open: false
//     };
//   }
//
//   handleChange = (name) => (event) => {
//     this.setState({ error: "" });
//     this.setState({ [name]: event.target.value });
//   };
//
//   clickSubmit = (event) => {
//     event.preventDefault();
//     const {name, email, password} = this.state;
//     const user = {
//       name,
//       email,
//       password
//     };
//     //console.log(user);
//     signup(user).then(data => {
//       if (data.error) this.setState({ error: data.error });
//       else
//         this.setState({
//           error: "",
//           name: "",
//           email: "",
//           password: "",
//           open: true
//         });
//     });
//   };
//
//
//
//   signupForm = (name, email, password) => (
//     <form>
//       <div className="form-group">
//         <label className="text-dark">Name</label>
//         <input onChange={this.handleChange("name")} type="text" className="form-control" value={name}/>
//       </div>
//       <div className="form-group">
//         <label className="text-dark">Email</label>
//         <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}/>
//       </div>
//       <div className="form-group">
//         <label className="text-dark">Password</label>
//         <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}/>
//       </div>
//       <button onClick={this.clickSubmit} type="button" className="btn btn-raised btn-primary">Submit</button>
//     </form>
//   );
//
//   render() {
//     const {name, email, password, error, open} = this.state;
//     return (
//       <div className="container">
//         <h2 className="mt-5 mb-5">Sign Up</h2>
//         <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
//           {error}
//         </div>
//         <div className="alert alert-success" style={{ display: open ? "" : "none" }}>
//           New account is successfully created please <Link to="/signin">Sign In</Link>
//         </div>
//
//         {this.signupForm(name, email, password)}
//
//       </div>
//     );
//   }
// }
//
// export default Signup;


import React, { Component } from 'react';
import {signup} from '../auth';
import {Link} from 'react-router-dom';
import Recaptcha from 'react-google-invisible-recaptcha';


class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }


  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };


  clickSubmit = (event) => {
    event.preventDefault();

    this.recaptcha.execute();

    const {name, email, password} = this.state;
    const user = {
      name,
      email,
      password
    };
    //console.log(user);
    signup(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true
        });
    });
  };

  onResolved() {
      this.setState({ open: true })
      // alert( 'Recaptcha resolved with response: ' + this.recaptcha.getResponse() );
      console.log(this.state);
    }


  signupForm = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-dark">Name</label>
        <input onChange={this.handleChange("name")} type="text" className="form-control" value={name}/>
      </div>
      <div className="form-group">
        <label className="text-dark">Email</label>
        <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}/>
      </div>
      <div className="form-group">
        <label className="text-dark">Password</label>
        <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}/>
      </div>
      <button onClick={this.clickSubmit} type="button" className="btn btn-raised btn-primary">Submit</button>

      <Recaptcha
        ref={ ref => this.recaptcha = ref }
        sitekey="6LfCmrAZAAAAAHxsIWmGZdwcnV8h91XgnrPZ4vvd"
        onResolved={ this.onResolved }
      />

    </form>
  );

  render() {
    const {name, email, password, error, open} = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign Up</h2>
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
          {error}
        </div>
        <div className="alert alert-success" style={{ display: open ? "" : "none" }}>
          New account is successfully created please <Link to="/signin">Sign In</Link>
        </div>

        {this.signupForm(name, email, password)}

      </div>
    );
  }
}

export default Signup;
