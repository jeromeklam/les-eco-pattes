import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputPicker as LayoutInputPicker } from '../layout';
import { Search } from './';

export default class InputPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      search: false,
    };
    this.onMore = this.onMore.bind(this);
    this.onCloseMore = this.onCloseMore.bind(this);
  }

  onMore() {
    this.setState({ search: true });
  }

  onCloseMore() {
    this.setState({ search: false });
  }

  render() {
    return (
      <div className="cause-input-picker">
        <LayoutInputPicker
          pickerAutocomplete="/v1/asso/cause/autocomplete/"
          pickerId="cau_id"
          pickerValue="cau_name"
          {...this.props}
          onSearchMore={this.onMore}
        />
        <Search title={this.props.label} show={this.state.search} onClose={this.onCloseMore} />
      </div>
    );
  }
}