import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from '../../common';
import {
  LoadingData,
  LoadMore,
  LoadError,
  LoadComplete,
  ButtonAddOne,
  ButtonReload,
} from '../layout';
import {
  ResponsiveListHeader,
  ResponsiveListLines,
  ResponsiveListFooter,
  DesktopListTitle,
  DesktopListLine,
  MobileListLine,
  Desktop,
  Mobile,
} from '../common';

export class List extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/cause/create');
  }

  onGetOne(id) {
    this.props.history.push('/cause/modify/' + id);
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  onQuickSearch(quickSearch) {
    this.props.actions.loadMore(quickSearch, true);
  }

  onLoadMore(event) {
    this.props.actions.loadMore();
  }

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = false;
    if (this.props.cause.items.FreeAsso_Cause) {
      items = buildModel(this.props.cause.items, 'FreeAsso_Cause');
    }
    const cols = [
      {
        name: 'name',
        label: 'Identification',
        col: 'cau_name',
        size: '5',
        mob_size: '',
        title: true,
      },
      {
        name: 'maint',
        label: 'Espèce',
        col: 'cause_type.cause_main_type.camt_name',
        size: '4',
        mob_size: '18',
        title: false,
      },
      {
        name: 'type',
        label: 'Race',
        col: 'cause_type.caut_name',
        size: '4',
        mob_size: '18',
        title: false,
      },
      { name: 'sex', label: 'M/F', col: 'cau_string_1', size: '4', mob_size: '18', title: false },
      {
        name: 'color',
        label: 'Couleur',
        col: 'cau_string_2',
        size: '4',
        mob_size: '18',
        title: false,
      },
      { name: 'site', label: 'Site', col: 'site.site_town', size: '9', mob_size: '', title: false },
    ];
    // L'affichage, items, loading, loadMoreError
    return (
      <div className="responsive-list">
        <ResponsiveListHeader
          title="Animaux"
          labelSearch="Recherche identification animal"
          onQuickSearch={this.onQuickSearch}
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
                      onGetOne={this.onGetOne}
                      id={item.id}
                      item={item}
                      title={item.cau_name}
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
          loadMorePending={this.props.cause.loadMorePending}
          loadMoreFinish={this.props.cause.loadMoreFinish}
          loadMoreError={this.props.cause.loadMoreError}
          onLoadMore={this.onLoadMore}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cause: state.cause,
    causeMainType: state.causeMainType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
