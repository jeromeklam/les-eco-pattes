import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      siteId: this.props.match.params.siteId || false
    }
  }    

  componentDidMount() {
    /**
     *  En async on va demander le chargement des données
     *  Lorsque fini le store sera modifié
     */
    this.props.actions.loadOne(this.state.siteId);
  }

  render() {
    return (      
      <div className="site-modify">
        {this.props.site.loadOnePending && <span>Chargement</span> }
        {(this.props.site.loadOneItem) && (this.props.site.loadOneItem.id==this.state.siteId) &&
          <Form  site={this.props.site.loadOneItem}/>
        }         
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    site: state.site,
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
