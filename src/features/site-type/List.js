import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    siteType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
  }

  componentDidMount() {
    /**
     *  En async on va demander le chargement des données
     *  Lorsque fini le store sera modifié
     */
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/site-type/create');
  }

  onGetOne(id) {
    this.props.history.push('/site-type/modify/' + id);
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  render() {
    let items = false;
    if (this.props.siteType.items.FreeAsso_SiteType) {
      items = buildModel(this.props.siteType.items, 'FreeAsso_SiteType');
    }
    // L'affichage, items, loading, loadMoreError
    const cols = [
      { name: 'name', label: 'Nom', col: 'sitt_name', size: '30', mob_size: '', title: true },
    ];
    return (
      <div className="responsive-list">
        <ResponsiveListHeader
          title="Types de sites"
          onReload={this.onReload}
          onCreate={this.onCreate}
        />
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
                      title={item.sitt_name}
                      onGetOne={this.onGetOne}
                      lines={cols}
                    />
                  </Mobile>
                  <Desktop>
                    <DesktopListLine
                      id={item.id}
                      item={item}
                      onGetOne={this.onGetOne}
                      cols={cols}
                    />
                  </Desktop>
                </div>
              );
            })}
        </ResponsiveListLines>
        <ResponsiveListFooter
          loadMorePending={this.props.siteType.loadMorePending}
          loadMoreFinish={this.props.siteType.loadMoreFinish}
          loadMoreError={this.props.siteType.loadMoreError}
        />
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
