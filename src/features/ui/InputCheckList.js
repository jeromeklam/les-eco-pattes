import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputCheckbox } from 'react-bootstrap-front';
import { AddOne as AddOneIcon } from '../icons';

export default class InputCheckList extends Component {
  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
  };

  static defaultProps = {
    title: "Titre",
    items: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.addOne = this.addOne.bind(this);
    this.delOne = this.delOne.bind(this);
  }

  addOne() {
    let { items } = this.props;
    if (!Array.isArray(items)) {
      items = [];
    }
    let index = this.state.index;
    index = index - 1;
  }

  delOne(i) {
    let { items } = this.props;
    items.splice(i, 1);
    this.props.onChange({
      target: {
        name: this.props.name,
        value: items,
      },
    });
  }

  render() {
    
    if (Array.isArray(this.props.items)) {
      this.props.items.map((elem, i) => {
        console.log("FK items", elem.text);
      })
    }
    return (
      <div className="input-check-list">
        {this.props.items.map((elem, i) => {
          <div className='row'>
            <InputCheckbox
              label={elem.text}
              name={i}
              labelTop={false}
              checked={elem.done === true}
            />
          </div>
        })}
        <div className="col-9">
          <button className="btn btn-primary" onClick={this.addOne}>
            <AddOneIcon />
          </button>
        </div>
      </div>
    );
  }
}
