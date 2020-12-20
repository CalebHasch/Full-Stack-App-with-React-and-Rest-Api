import React, { Component } from 'react';
import Form from '../Form';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    firstName:'',
    lastName:'',
    errors: [],
  }

  componentDidMount() {
    const { context } = this.props;
    this.setState({
      firstName: context.authenticatedUser.firstName,
      lastName: context.authenticatedUser.lastName
    })
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      firstName,
      lastName,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <Form
          errors = {errors}
          cancel= {this.cancel}
          submit = {this.submit}
          submitButtonText= "Create Course"
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
                    className="input-title course--title--input" 
                    placeholder="Course title..."
                    onChange={this.change}
                    value={title} />
                    </div>
                  <p>By {firstName} {lastName}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea 
                    id="description" 
                    name="description"
                    onChange={this.change}
                    value={description} 
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
                        placeholder="Hours" 
                        onChange={this.change}
                        value={estimatedTime} />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea 
                          id="materialsNeeded" 
                          name="materialsNeeded" 
                          onChange={this.change}
                          value={materialsNeeded}
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
    );
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

    context.data.createCourse(course, emailAddress, password)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push('/');
          console.log('create success');
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}
