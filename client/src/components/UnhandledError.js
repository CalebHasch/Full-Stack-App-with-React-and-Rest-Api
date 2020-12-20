import React from 'react';
import { Link } from 'react-router-dom';

export default class UnhandledErrors extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" href="/signin">Sign In</Link>
            </nav>
          </div>
        </div>
        <div className="bounds">
          <h1>Error</h1>
          <p>Sorry! We just encountered an unexpected error.</p>
        </div>
      </React.Fragment>
    );
  }
};