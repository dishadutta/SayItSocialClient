import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
  if(history.location.pathname === path) return {color: "black"}
    else
      return {color: "#ffffff"}
}

const Menu = ({history}) => (
  <div>
    <ul className="nav nav-tabs bg-primary">

      <li className="nav-item">
        <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history,"/users")} to="/users">Users</Link>
      </li>
      <li className="nav-item">
          <Link to={`/post/create`} style={isActive(history,`/post/create`)} className="nav-link">
            Create Post
          </Link>
      </li>

      {!isAuthenticated() && (
        <div className="nav nav-tabs bg-primary">
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">Sign In</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history,"/signup")} to="/signup">Sign Up</Link>
          </li>
        </div>
      )}

      {isAuthenticated() && (
        <>
          <li className="nav-item">
              <Link to={`/findPeople`} style={isActive(history,`/findPeople`)} className="nav-link">
                Find People
              </Link>
          </li>

          <li className="nav-item">
              <Link to={`/user/${isAuthenticated().user._id}`} style={isActive(history,`/user/${isAuthenticated().user._id}`)} className="nav-link">
                {`${isAuthenticated().user.name}'s profile`}
              </Link>
          </li>
          <li className="nav-item">
            <span className="nav-link" style={(isActive(history,"/signup"), {cursor: "pointer", color:"#ffffff"})} onClick={() => signout(() => history.push("/"))} >Sign Out</span>
          </li>
        </>
      )}


      {isAuthenticated() && isAuthenticated().user.role === "admin" && (
          <li className="nav-item">
              <Link
                  to={`/admin`}
                  style={isActive(history, `/admin`)}
                  className="nav-link"
              >
                  Admin
              </Link>
          </li>
      )}


    </ul>
  </div>
);

export default withRouter(Menu);
