import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container text-center" style={{padding: '15px'}}>
          Built by&nbsp;
          <a href="https://flatten.ca">Flatten.ca</a>&nbsp;
          |&nbsp;Forms powered by <a href="https://form.io">form.io</a>
        </div>
      </footer>
    );
  }
}
