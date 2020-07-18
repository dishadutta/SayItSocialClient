// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { signin, authenticate } from '../auth';
//
// class Signin extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       error: "",
//       redirectToRefer: false,
//       loading: false
//     };
//   }
//
//   handleChange = (name) => (event) => {
//     this.setState({ error: "" });
//     this.setState({ [name]: event.target.value });
//   };
//
//
//
//   clickSubmit = (event) => {
//     event.preventDefault();
//     this.setState({ loading:true });
//     const {email, password} = this.state;
//     const user = {
//       email,
//       password
//     };
//     //console.log(user);
//     signin(user).then(data => {
//       if (data.error) {
//         this.setState({ error: data.error, loading:false });
//       }
//       else {
//         //authenticate the user
//         //then redirect the user to the intended page
//         authenticate(data, () => {
//           this.setState({ redirectToRefer: true })
//         })
//       }
//     });
//   };
//
//
//
//   signinForm = (email, password) => (
//     <form>
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
//     const {email, password, error, redirectToRefer, loading} = this.state;
//
//     if(redirectToRefer) {
//       return <Redirect to = "/" />
//     }
//
//     return (
//       <div className="container">
//         <h2 className="mt-5 mb-5">Sign In</h2>
//         <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
//           {error}
//         </div>
//         { loading ? (<div className="jumbotron text-center">
//             <h2>Loading ... </h2>
//           </div>
//           ) : ( "" )}
//         {this.signinForm(email, password)}
//
//       </div>
//     );
//   }
// }
//
// export default Signin;


import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth';
import Recaptcha from 'react-google-invisible-recaptcha';
import { Link } from "react-router-dom";


class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToRefer: false,
      loading: false
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };



  clickSubmit = (event) => {
    event.preventDefault();

    this.recaptcha.execute();

    this.setState({ loading:true });
    const {email, password} = this.state;
    const user = {
      email,
      password
    };
    //console.log(user);
    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading:false });
      }
      else {
        //authenticate the user
        //then redirect the user to the intended page
        authenticate(data, () => {
          this.setState({ redirectToRefer: true })
        })
      }
    });
  };


  onResolved() {
      this.setState({ loading: true })
      // alert( 'Recaptcha resolved with response: ' + this.recaptcha.getResponse() );
      console.log(this.state);
    }


  signinForm = (email, password) => (
    <form>
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
    const {email, password, error, redirectToRefer, loading} = this.state;

    if(redirectToRefer) {
      return <Redirect to = "/" />
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign In</h2>
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
          {error}
        </div>
        { loading ? (<div className="jumbotron text-center">
            <h2>Loading ... </h2>
          </div>
          ) : ( "" )}
        {this.signinForm(email, password)}

        <p>
           <Link to="/forgot-password" type="button" className="btn btn-raised btn-danger">
               {" "}
               Forgot Password
           </Link>
        </p>

      </div>
    );
  }
}

export default Signin;
