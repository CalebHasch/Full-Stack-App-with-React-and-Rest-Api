import React from 'react';

export default class UnhandledErrors extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="bounds">
          <h1>Error</h1>
          <p>Sorry! We just encountered an unexpected error.</p>
        </div>
      </React.Fragment>
    );
  }
};