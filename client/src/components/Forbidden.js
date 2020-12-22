import React from 'react';

export default class Forbidden extends React.PureComponent {
  render() {
    return (
      <div className="bounds">
        <h1>Forbidden</h1>
        <p>Oh oh! You can't access this page.</p>
      </div>
    )
  }
}