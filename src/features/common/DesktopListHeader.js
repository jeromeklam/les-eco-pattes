import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { ButtonAddOne, ButtonReload, InputQuickSearch } from '../layout';

export class DesktopListHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onReload: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  };

constructor(props) {
    super(props);
    this.state = {
      quickSearch: "",
    };
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  onQuickSearch(event) {    
    this.props.onQuickSearch(this.state.quickSearch);
  }

  onChangeSearch(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div className={classnames(this.props.common.sidebar && "common-desktop-list-header-menu", "common-desktop-list-header row row-list-title")}>
        <div className="col-16">
          <span>{this.props.title}</span>
        </div>
        <div className="col-14">   
          {this.props.onQuickSearch &&         
            <InputQuickSearch 
              name="quickSearch"
              label={this.props.labelSearch}
              quickSearch={this.state.quickSearch}  
              onClick={this.onQuickSearch}
              onChange={this.onChangeSearch}
            />
          }            
        </div>    
        <div className="col-6 text-right">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <ButtonReload color="white" onClick={this.props.onReload} />
            </li>
            <li className="nav-item">
              <ButtonAddOne color="white" onClick={this.props.onCreate} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopListHeader);
