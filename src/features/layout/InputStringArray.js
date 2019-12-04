import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Plus, Minus } from '../icons';

export default class InputStringArray extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    let items = [];
    try {
      items = JSON.parse(this.props.value) || [];
    } catch (ex) {
      items = [];
    }
    this.state = {
      items: items,
      newItem: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onMinus = this.onMinus.bind(this);
    this.onPlus = this.onPlus.bind(this);
  }

  onChange(event) {
    if (event) {
      event.preventDefault();
    }
    const name = event.target.name;
    const idx = name.replace('field-', '');
    if (idx == '@') {
      this.setState({ newItem: event.target.value });
    } else {
      let items = this.state.items;
      items[idx].label = event.target.value;
      this.setState({ items: items });
      this.props.onChange({
        target: {
          name: this.props.name,
          value: JSON.stringify(items)
        },
      });
    }
  }

  onMinus(idx) {
    let items = this.state.items;
    items.splice(idx, 1);
    this.setState({ items: items });
    this.props.onChange({
      target: {
        name: this.props.name,
        value: JSON.stringify(items)
      },
    });
  }

  onPlus(event) {
    if (event) {
      event.preventDefault();
    }
    let items = this.state.items;
    items.push({value: this.state.newItem, label: this.state.newItem});
    this.setState({ items: items, newItem: '' });
    this.props.onChange({
      target: {
        name: this.props.name,
        value: JSON.stringify(items)
      },
    });
  }

  render() {
    const { items, newItem } = this.state;
    return (
      <div className="form-group row">
        <label htmlFor={this.props.id} className="col-sm-6 col-form-label">
          {this.props.label}
        </label>
        <div className="col-sm-30">
          {items.length > 0 && (
            <div>
              {items.map((oneItem, idx) => {
                return (
                  <div className="row" key={idx}>
                    <div className="col-36 input-group">
                      <input
                        type="text"
                        name={'field-' + idx}
                        value={oneItem.label}
                        className="form-control"
                        onChange={this.onChange}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                          onClick={() => {
                            this.onMinus(idx);
                          }}
                        >
                          <Minus color="orange" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="row">
            <div className="col-36 input-group">
              <input
                type="text"
                name={'field-@'}
                value={newItem}
                className="form-control"
                onChange={this.onChange}
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-success" onClick={this.onPlus}>
                  <Plus color="green" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
