import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { create } from './apiPost';
import { Redirect } from 'react-router-dom';
import DefaultProfile from '../images/avatar.jpg';

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      photo: "",
      user: {},
      filesize: 0,
      loading: false,
      redirectToProfile: false
    };
  }

  // init = (userId) => {
  //   const token = isAuthenticated().token;
  //   read(userId, token).then(data => {
  //       if (data.error) {
  //         this.setState({ redirectToProfile: true });
  //       } else {
  //         this.setState({
  //           id: data._id,
  //           name: data.name,
  //           email: data.email,
  //           error: "",
  //           about: data.about
  //          });
  //       }
  //     });
  // };

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user })
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({
        error: "All Fields are required",
        loading: false
      });
      return false;
    }
    return true;
  };


  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };


  clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                  this.setState({
                      loading: false,
                      title: "",
                      body: "",
                      redirectToProfile: true
                  });
                }
            });
        }
    };

  // clickSubmit = (event) => {
  //   event.preventDefault();
  //   this.setState({ loading: true })
  //   if(this.isValid()) {
  //     const userId = isAuthenticated().user._id;
  //     const token = isAuthenticated().token;
  //     create(userId, token, this.postData).then(data => {
  //       if (data.error) this.setState({ error: data.error });
  //       else console.log("New Post:", data);
  //     });
  //   }
  // };

  newPostForm = (title, body) => (
    <form>
      <div className="form-group">
        <label className="text-dark">Profile Photo</label>
        <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control"/>
      </div>
      <div className="form-group">
        <label className="text-dark">Title</label>
        <input onChange={this.handleChange("title")} type="text" className="form-control" value={title}/>
      </div>
      <div className="form-group">
        <label className="text-dark">Body</label>
        <textarea onChange={this.handleChange("body")} type="text" className="form-control" value={body}/>
      </div>
      <button onClick={this.clickSubmit} type="button" className="btn btn-raised btn-primary">Create Post</button>
    </form>
  );

  render() {
    const {title, body, photo, user, error, loading, redirectToProfile} = this.state;
    if(redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />
    }

    // const photoUrl = id
    //   ? `${
    //       process.env.REACT_APP_API_URL
    //     }/user/photo/${id}?${new Date().getTime()}`
    //   : DefaultProfile;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Create a new Post</h2>

          <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {error}
          </div>
          { loading ? (<div className="jumbotron text-center">
              <h2>Loading ... </h2>
            </div>
            ) : ( "" )}

            {/*<img
              style={{ height:"200px", width:"auto"}}
              className="img-thumbnail"
              src={photoUrl}
              onError={i => (i.target.src = `${DefaultProfile}`)}
              alt={name}/>*/}

            {this.newPostForm(title, body)}
      </div>
    );
  }
}

export default NewPost;
