import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { changelog } from './';

export default class Version extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="help-version p-5 ">
        <ReactMarkdown source={changelog} escapeHtml={false} />
      </div>
    );
  }
}
