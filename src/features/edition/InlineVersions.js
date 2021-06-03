import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizedObjectModeler } from 'jsonapi-front';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { CenteredLoading3Dots } from '../ui';

export class InlineVersions extends Component {
  static propTypes = {
    edition: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id) {
      return { id: props.id };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      id: props.id
    };
  }

  componentDidMount() {
    this.props.actions.loadVersions(this.state.id, true).then(result => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      this.props.actions.loadVersions(this.state.id, true).then(result => {});
    }
  }

  render() {
    let versions = [];
    if (this.props.edition.versions && this.props.edition.versions.FreeFW_EditionLang) {
      versions = normalizedObjectModeler(this.props.edition.versions, 'FreeFW_EditionLang', null, {eager: true});
    }
    return (
      <div className="edition-inline-versions">
          {this.props.edition.loadVersionsPending ? (
            <CenteredLoading3Dots />
          ) : (
            <div className="row">
              {versions && versions.map(version => {
                return null;
              })}
            </div>
          )}
      </div>
    );  
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    edition: state.edition,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InlineVersions);
