import React, { Component } from 'react';
import Form from '../Form';

export default class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    course: [],
    user: [],
    errors: [],
  }

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
      title,
      description,
      estimatedTime,
      materialsNeeded,
      course,
      user,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
            errors = {errors}
            cancel={this.cancel}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input 
                        id="title" 
                        name="title" 
                        type="text" 
                        value={title}
                        onChange={this.change}
                        className="input-title course--title--input" 
                        placeholder="Course title..." />                        
                    </div>
                    <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea 
                      id="description" 
                      name="description" 
                      value={description}
                      onChange={this.change} 
                      placeholder="Course description...">
                      </textarea>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input 
                      id="estimatedTime" 
                      name="estimatedTime" 
                      type="text" 
                      className="course--time--input"
                      value={estimatedTime} 
                      onChange={this.change}
                      placeholder="Hours" />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded" 
                        value={materialsNeeded}
                        onChange={this.change}
                        placeholder="List materials...">
                        </textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )} />
      </div>
    </div>
    )
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const userId = context.authenticatedUser.id;
    const courseId = this.state.course.id;
    const emailAddress = context.authenticatedUser.email;
    const password = context.authenticatedUser.password;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };
    console.log(course);
    context.data.updateCourse(course, courseId, emailAddress, password)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push(`/courses/${courseId}`);
          console.log('Update success');
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    this.props.history.push(`/courses/${this.state.course.id}`);
  }
}