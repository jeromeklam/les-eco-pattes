import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { JsonEditor as Editor } from 'jsoneditor-react';
import Ajv from 'ajv';
import 'jsoneditor-react/es/editor.min.css';

const ajv = new Ajv({ allErrors: true, verbose: true, useDefaults: true });

export default class InputJson extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    schema: PropTypes.object,
  };
  static defaultProps = {
    schema: null,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(json) {
    const event = {
      target: {
        name: this.props.name,
        value: json
      }
    };
    this.props.onChange(event);
  }

  render() {
    let data = this.props.value || {};
    if (this.props.schema) {
      const validate = ajv.compile(this.props.schema);
      validate(data);
    }
    return (
      <div className="ui-input-json mb-2">
        <Editor
          ajv={ajv}
          value={data}
          onChange={this.handleChange}
          navigationBar={false}
          statusBar={false}
          search={false}
          mode="form"
          schema={this.props.schema}
        />
      </div>
    );
  }
}
