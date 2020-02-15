import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ResponsiveTreeview } from 'freeassofront';
import * as actions from './redux/actions';
import { CenteredLoading9X9 } from '../ui';

export class Treeview extends Component {
  static propTypes = {
    family: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadChildren();
  }

  onSelect(id) {
    this.props.actions.select(id);
  }

  onToggle(id) {
    const tree = this.props.family.tree;
    if (tree.isLoaded(id)) {
      this.props.actions.toggle(id);
    } else {
      this.props.actions.loadChildren({parent_id: id});
    }
  }

  render() {
    return (
      <div className="family-treeview">
        {this.props.family.items.length <= 0 ? (
          <CenteredLoading9X9 />
        ) : (
          <ResponsiveTreeview
            tree={this.props.family.tree}
            onSelect={this.onSelect}
            onToggle={this.onToggle}
          />
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    family: state.family,
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
)(Treeview);
