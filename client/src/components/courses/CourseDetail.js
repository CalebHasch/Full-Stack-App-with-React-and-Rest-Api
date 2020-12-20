import React, { Component } from 'react';
import ReactMarkDown from 'react-markdown';
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {
  state = {
    course: [],
    user: [],
  };

  componentDidMount() {
    const { context } = this.props;
    const id = this.props.match.params.id;
    context.data
      .getCourseDetails(id)
      .then((data) => {
        const course = data;
        const user = data.User;

        if (data) {
          this.setState({ course });
          this.setState({ user });
        }
      })
  }

  render() {
    const {
      course,
      user,
    } = this.state;

    return(
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
              <button className="button" to="/" onClick={this.deleteCourse}>Delete Course</button>
              <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
            </div>
            <div className="course--description">
              <p>{this.state.course.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ReactMarkDown 
                    source={this.state.course.materialsNeeded}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  deleteCourse = () => {
    const { context } = this.props;
    const courseId = this.state.course.id;
    const emailAddress = context.authenticatedUser.email;
    const password = context.authenticatedUser.password;
    
    context.data.deleteCourse( courseId, emailAddress, password)
      .then((res) => (window.location.href = '/'));
  };
}