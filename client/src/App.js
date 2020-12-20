import React from 'react';
import "./styles/global.css";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import CourseDetail from './components/courses/CourseDetail';
import Courses from './components/courses/Courses';
import CreateCourse from './components/courses/CreateCourse';
import UpdateCourse from './components/courses/UpdateCourse';
import UserSignIn from './components/users/UserSignIn';
import UserSignUp from './components/users/UserSignUp';
import UserSignOut from './components/users/UserSignOut';

import withContext from './Context';

const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/courses/create" component={CreateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
      </Switch>
    </div>
  </Router>
);
