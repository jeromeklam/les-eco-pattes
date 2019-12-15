import React, { Component } from 'react';

export default class InputSelect extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    const {options, addEmpty} = {...props};
    let value = '';
    if (props.value && props.value !== null) {
      value = props.value;
    }
    let id = props.name;
    if (props.id && props.id !== null) {
      id = props.id;
    }
    this.state = {
      options: options,
      empty: addEmpty,
      name: props.name,
      value: value,
      id: id,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value || props.options !== state.options) {
      return {
        value: props.value,
        options: props.options,
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    let def = null;
    let found = false;
    prevProps.options.forEach(oneOption => {
      def = oneOption.value;
      if (oneOption.value === prevProps.value) {
        found = true;
      }
    });
    if (!found) {
      const event= {target : {
        name: prevProps.name,
        value: def,
      }};
      this.props.onChange(event);
    }
  }

  render() {
    let props = {
      ...this.props,
      options: null,
      addEmpty: null,
      name: this.state.name,
      value: this.state.value,
    };
    return (
      <div className="form-group row">
        <label forname={this.state.id} className="col-sm-6 col-form-label">
          {this.props.label}
          {this.props.required && 
           <span>&nbsp;*</span>
          }
        </label>
        <div className="col-sm-30">
          <select type="text" id={this.state.id} className="form-control" {...props}>
            {this.state.addEmpty &&
              <option key="000" value="">
                Aucune sélection
              </option>
            }
            {this.state.options.map(oneOption => {
              return (
                <option key={oneOption.value} value={oneOption.value}>
                  {oneOption.label}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    );
  }
}
