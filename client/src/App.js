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
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UnhandledErrorWithContext = withContext(UnhandledError);

const App = () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/error" component={UnhandledErrorWithContext} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/notfound" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;