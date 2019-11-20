import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    siteType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      siteTypeId: this.props.match.params.siteTypeId || false
    }
  }    

  componentDidMount() {
    this.props.actions.loadOne(this.state.siteTypeId);   
  }

  render() {
    return (
      <div className="site-type-modify">
        {this.props.siteType.loadOnePending && <span>Chargement</span> }
        {(this.props.siteType.loadOneItem) && (this.props.siteType.loadOneItem.id==this.state.siteTypeId) &&          
          <Form siteType={this.props.siteType.loadOneItem}/>
        }         
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    siteType: state.siteType,
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
