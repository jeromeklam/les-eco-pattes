import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    causeType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      causeTypeId: this.props.match.params.causeTypeId || false
    }
  }    

  componentDidMount() {
    this.props.actions.loadOne(this.state.causeTypeId);    
  }

  render() {
    return (
      <div className="cause-type-modify">
        {this.props.causeType.loadOnePending && <span>Chargement</span> }
        {(this.props.causeType.loadOneItem) && (this.props.causeType.loadOneItem.id==this.state.causeTypeId) &&          
          <Form causeType={this.props.causeType.loadOneItem}/>
        }         
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    causeType: state.causeType,
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
)(Modify);
