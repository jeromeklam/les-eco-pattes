import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from '../../common';
import {
  ResponsiveListHeader,
  ResponsiveListFooter,
  ResponsiveListLines,
  Desktop,
  Mobile,
} from '../common';
import { DesktopLine, MobileLine } from '.';

export class List extends Component {
  static propTypes = {
    causeMainType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onReload = this.onReload.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/cause-main-type/create');
  }

  onGetOne(id) {
    this.props.history.push('/cause-main-type/modify/' + id);
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = false;
    if (this.props.causeMainType.items.FreeAsso_CauseMainType) {
      items = buildModel(this.props.causeMainType.items, 'FreeAsso_CauseMainType');
    }
    return (
      <div className="">
        <ResponsiveListHeader title="Espèces" onReload={this.onReload} onCreate={this.onCreate} />
        <ResponsiveListLines>
          {items &&
            items.map(item => {
              return (
                <div key={item.id}>
                  <Mobile>
                    <MobileLine item={item} onGetOne={this.onGetOne} />
                  </Mobile>
                  <Desktop>
                    <DesktopLine item={item} onGetOne={this.onGetOne} />
                  </Desktop>
                </div>
              );
            })}
        </ResponsiveListLines>
        <ResponsiveListFooter
          loadMorePending={this.props.causeMainType.loadMorePending}
          loadMoreFinish={this.props.causeMainType.loadMoreFinish}
          loadMoreError={this.props.causeMainType.loadMoreError}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    causeMainType: state.causeMainType,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
