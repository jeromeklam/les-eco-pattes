import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Up as UpIcon, Down as DownIcon } from '../icons';

export default class InputSpin extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.number,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    step: PropTypes.number,
    defaultValMin: PropTypes.bool,
    labelTop: PropTypes.bool,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    size: PropTypes.string,
    labelSize: PropTypes.number,
    inputSize: PropTypes.number,
    options: PropTypes.element,
    error: PropTypes.element,
    warning: PropTypes.element,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
  };

  static defaultProps = {
    labelTop: true,
    label: '',
    id: '',
    inline: false,
    size: null,
    labelSize: 6,
    inputSize: 30,
    onChange: () => {},
    disabled: false,
    required: false,
    options: [],
    error: false,
    warning: false,
    addEmpty: false,
    step: 1,
    value: 0,
    defaultValMin: false,
  };

  constructor(props) {
    super(props);
    let value = this.props.maxValue;
    if (this.props.value) {
      value = this.props.value;
    } else 
      if (this.props.defaultValueMin) {
          value = this.props.minValue;
      } 
    this.state = {
      value : value,
    };
    this.onIncremente = this.onIncremente.bind(this);
    this.onDecremente = this.onDecremente.bind(this);
  }

  onIncremente() {
    let newVal = this.state.value + this.props.step;
    if (newVal > this.props.maxValue) {
      newVal = this.props.maxValue;
    }
    this.setState({ value: newVal }); 
  }

  onDecremente() {
    let newVal = this.state.value - this.props.step;
    if (newVal < this.props.minValue) {
      newVal = this.props.minValue;
    }
    this.setState({ value: newVal }); 
  }

  render() {
    return (
      <div
        className={classnames(
          'form-group layout-input-spin',
          !this.props.labelTop && 'row',
          this.props.size && `form-group-${this.props.size}`,
        )}
      >
        {!this.props.inline && this.props.label !== '' && (
          <label
            className={classnames(
              !this.props.labelTop && `col-sm-${this.onDecrementprops.labelSize} col-form-label`,
              this.props.size && `col-form-label-${this.props.size}`,
            )}
          >
            {this.props.label}
            {this.props.required && <span>&nbsp;*</span>}
          </label>
        )}
        <div className={classnames(!this.props.labelTop && `col-sm-${this.props.inputSize}`)}>
          <div className="row">
            <div
              className={classnames(
                'col-36 input-group',
                this.props.size && `input-group-${this.props.size}`,
                this.props.error && 'is-invalid',
              )}
            >
              <input
                type="text"
                name={this.props.name}
                value={this.state.value}
                className={classnames(
                  'border-secondary form-control',
                  this.props.size && `form-control-${this.props.size}`,
                )}
                onChange={this.props.onChange}
              />
              <input type="hidden" name="autocomplete-field-@" value={this.props.value} />
              <div className="input-group-append">
                <button
                  type="button"
                  className={classnames(
                    'btn',
                    'btn-outline-secondary',
                    'bg-light',
                    this.props.size === 'sm' && `btn-${this.props.size}`,
                  )}
                >
                  <UpIcon onClick={() => this.onIncremente()} />
                </button>
                <button
                  type="button"
                  className={classnames(
                    'btn',
                    'btn-outline-secondary',
                    'bg-light',
                    this.props.size === 'sm' && `btn-${this.props.size}`,
                  )}
                >
                  <DownIcon onClick={() => this.onDecremente()} />
                </button>
              </div>
            </div>
            {this.props.error && <div className="invalid-feedback">{this.props.error}</div>}
          </div>
        </div>
      </div>
    );
  }
}
