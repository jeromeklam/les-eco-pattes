import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      causeId: this.props.match.params.causeId || false
    }
  }    

  componentDidMount() {
    this.props.actions.loadOne(this.state.causeId);
  }

  render() {
    return (
      <div className="cause-modify">
        {this.props.cause.loadOnePending && <span>Chargement</span> }
        {(this.props.cause.loadOneItem) && (this.props.cause.loadOneItem.id==this.state.causeId) &&
          <Form cause={this.props.cause.loadOneItem}/>
        }         
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cause: state.cause,
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
