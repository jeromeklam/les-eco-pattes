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
  DesktopListTitle,
  DesktopListLine,
  MobileListLine,
  Desktop,
  Mobile,
} from '../common';

export class List extends Component {
  static propTypes = {
    causeType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/cause-type/create');
  }

  onGetOne(id) {
    this.props.history.push('/cause-type/modify/' + id);
  }

  onDelOne(id) {
    this.props.actions.delOne(id).then(result => this.props.actions.loadMore({}, true));
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
    if (this.props.causeType.items.FreeAsso_CauseType) {
      items = buildModel(this.props.causeType.items, 'FreeAsso_CauseType');
    }
    const cols = [
      { name: "name", label: "Nom", col: "caut_name", size:"20", mob_size:"", title: true},
      { name: "espece", label: "Espèce", col: "cause_main_type.camt_name", size:"10", mob_size:""}
    ];
    return (
      <div className="responsive-list">
        <ResponsiveListHeader title="Races" onReload={this.onReload} onCreate={this.onCreate} />
        <Desktop>
          <DesktopListTitle cols={cols} />
        </Desktop>
        <ResponsiveListLines>
          {items &&
            items.map(item => {
              return (
                <div key={item.id}>
                  <Mobile>
                    <MobileListLine 
                      id={item.id}
                      item={item}
                      title={item.caut_name}
                      onGetOne={this.onGetOne}
                      onDelOne={this.onDelOne}
                      lines={cols}
                    />
                  </Mobile>
                  <Desktop>
                    <DesktopListLine 
                      id={item.id}
                      item={item}
                      onGetOne={this.onGetOne}
                      onDelOne={this.onDelOne}
                      cols={cols}
                    />
                  </Desktop>
                </div>
              );
            })}
        </ResponsiveListLines>
        <ResponsiveListFooter
          loadMorePending={this.props.causeType.loadMorePending}
          loadMoreFinish={this.props.causeType.loadMoreFinish}
          loadMoreError={this.props.causeType.loadMoreError}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    causeType: state.causeType,
    causeMainType: state.causeMainType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
