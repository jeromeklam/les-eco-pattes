import React, { Component } from 'react';

export default class Copyright extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-copyright">
        <div className="text-center mt-2">
          <p>&copy; <a href="https://github.com/jeromeklam/freeasso" target="_blank">FreeAsso</a> 2019-2020</p>
        </div>
      </div>
    );
  }
}
