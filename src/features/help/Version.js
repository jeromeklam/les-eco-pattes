import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { ResponsiveContent } from 'react-bootstrap-front';
import { changelog } from './';

export default class Version extends Component {
  static propTypes = {};

  render() {
    return (
      <ResponsiveContent className="help-version p-5 ">
        <ReactMarkdown source={changelog} escapeHtml={false} />
      </ResponsiveContent>
    );
  }
}
