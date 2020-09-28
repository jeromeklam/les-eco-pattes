import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { InputText } from 'react-bootstrap-front';
import { 
  AddOne as AddOneIcon,
  DelOne as DelOneIcon,
  Checked ,UnChecked } from '../icons';

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
      return {title: list.title, items: list.items};
    }
    return null;
  }

  constructor(props) {
    super(props);
    const list = JSON.parse(props.value) || emptyList;
    this.state = {
      title: list.title,
      items: list.items,
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeItemCheck = this.onChangeItemCheck.bind(this);
    this.onChangeItemLabel = this.onChangeItemLabel.bind(this);
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

  onChangeItemLabel(event, idx) {
    let { title, items } = this.state;
    items[idx].label = event.target.value;
    const list = {title: title, items: items};
    this.onChange(list);
  }

  onChangeItemCheck(event, idx) {
    let { title, items } = this.state;
    items[idx].done = !items[idx].done;
    const list = {title: title, items: items};
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
            <div className='col-34'>
              <div class="input-group">
                <div className="input-group-prepend border border-secondary rounded-left">
                  <div class="input-group-text" onClick={(e) => {this.onChangeItemCheck(e, i)}}>
                    {item.done === true ? <Checked /> : <UnChecked />}
                  </div>
                </div>
                <input 
                  type="text" 
                  className={classnames('border-secondary form-control', item.done && 'item-done')}
                  name={`label-${i}`}
                  value={item.label}
                  disabled={item.done}
                  onChange={(e) => {this.onChangeItemLabel(e, i, "label")}}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className={classnames(`btn btn-input border-secondary bg-light`)}
                    onClick={() => {this.onDelOne(i)}}
                  >
                    <DelOneIcon className="text-warning" size={0.9} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
