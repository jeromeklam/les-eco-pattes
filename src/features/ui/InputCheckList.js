import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputText, InputCheckbox } from 'react-bootstrap-front';
import { 
  AddOne as AddOneIcon,
  DelOne as DelOneIcon } from '../icons';

const emptyItem = { label : '', done: false };
const emptyList = { title : "Checklist", items : []}

export default class InputCheckList extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  };
  static defaultProps = {
    value: '',
  };

  static getDerivedStateFromProps(props, state) {
    const list = JSON.parse(props.value) || emptyList;
    if (list.title !== state.title || list.items !== state.items) { 
      state.title = list.title;
      state.items = list.items;
    }
    return false;
  }

  constructor(props) {
    super(props);
    const list = JSON.parse(props.value) || emptyList;
    this.state = {
      title: list.title,
      items: list.items,
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeItem = this.onChangeItem.bind(this);
    this.onAddNew = this.onAddNew.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChangeTitle(event, idx) {
    let { title, items } = this.state;
    title = event.target.value;
    const list = {title: title, items: items};
    this.onChange(list);
  }

  onAddNew() {
    let { title, items } = this.state;
    items.push(emptyItem);
    const list = {title: title, items: items};
    this.onChange(list);
  }

  onChangeItem(event, idx, field) {
    let { title, items } = this.state;
    const list = {title: title, items: items};
    if (field === 'label') {
      items[idx].label = event.target.value;
    } else {
      items[idx].done = event.target.checked;
    }
    this.onChange(list);
  }

  onDelOne(idx) {
    let { title, items } = this.state;
    items.splice(idx,1);
    const list = {title: title, items: items};
    this.onChange(list);
  }

  onChange(list) {
    this.props.onChange({
      target: {
        name: this.props.name,
        value: JSON.stringify(list),
      },
    });
  }

  render() {
    return (
      <div className="input-check-list">
        <div className='row'>
          <div className='col-34'>
            <InputText
              label=''
              name={this.state.title}
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="col-2">
            <button className="btn btn-primary" onClick={this.onAddNew}>
              <AddOneIcon />
            </button>
          </div>
        </div>
        {this.state.items.map((item, i) => (
          <div className='row' key={`item-${i}`}>
            <div className='col-4'>
              <InputCheckbox
                label=''
                name={`check-${i}`}
                labelTop={false}
                checked={item.done === true}
                onChange={(e) => {this.onChangeItem(e, i, "done")}}
              />
            </div>
            <div className='col-30'>
              <InputText
                label=''
                name={`label-${i}`}
                value={item.label}
                onChange={(e) => {this.onChangeItem(e, i, "label")}}
              />
            </div>
            <div className="col-2">
              <button className="btn btn-warning" onClick={() => {this.onDelOne(i)}}>
                <DelOneIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
