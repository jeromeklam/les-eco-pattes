import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { ResponsiveQuickSearch } from 'react-bootstrap-front';
import { Search as SearchIcon, Site as SiteIcon } from '../icons';
import { List as UiList, deleteSuccess, showErrors, messageSuccess } from '../ui';
import { getEditions } from '../edition';
import { InlineCauses } from '../cause';
import { InlineAlerts } from '../alert';
import {
  InlinePhotos,
  InlineDocuments,
  getSelectActions,
  getGlobalActions,
  getInlineActions,
  getCols,
  Input,
} from './';

/**
 * Liste des sites
 */
export class List extends Component {
  /**
   * Y'a quoi dans this.props ?
   */
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      animalsSite: 0,
      alertsSite: 0,
      photosSite: 0,
      documentsSite: 0,
      siteId: -1,
      mode: false,
      item: null,
      models: props.edition.models,
      editions: getEditions(props.edition.models, 'FreeAsso_Site'),
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onSelectList = this.onSelectList.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onFiltersDefault = this.onFiltersDefault.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onZoomMap = this.onZoomMap.bind(this);
    this.onSelectMenu = this.onSelectMenu.bind(this);
    this.itemClassName = this.itemClassName.bind(this);
    this.onPrint = this.onPrint.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ animalsSite: 0, alertsSite: 0, photosSite: 0, documentsSite: 0, siteId: 0 });
  }

  onGetOne(id) {
    this.setState({ animalsSite: 0, alertsSite: 0, photosSite: 0, documentsSite: 0, siteId: id });
  }

  onClose() {
    this.setState({ siteId: -1 });
  }

  onDelOne(id) {
    this.props.actions
      .delOne(id)
      .then(result => {
        this.props.actions.loadMore({}, true);
        deleteSuccess();
      })
      .catch(errors => {
        showErrors(this.props.intl, this.props.site.delOneError, '', 'Suppression impossible ! ');
      });
  }

  onSelect(id) {
    this.props.actions.onSelect(id);
  }

  onSelectList(obj, list) {
    if (obj) {
      if (list) {
        this.setState({ mode: list, item: obj });
      } else {
        this.setState({ item: obj });
      }
    } else {
      this.setState({ mode: false, item: null });
    }
  }

  onZoomMap(obj) {
    const { id } = obj;
    const coord = JSON.parse(obj.site_coord);
    if (coord) {
      this.props.history.push('/pigeon-map/' + id + '/' + coord.lat + '/' + coord.lon);
    } else {
      this.props.history.push('/pigeon-map/' + id);
    }
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  onQuickSearch(quickSearch) {
    this.props.actions.updateQuickSearch(quickSearch);
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, 2000);
    this.setState({ timer: timer });
  }

  onUpdateSort(col, way, pos = 99) {
    this.props.actions.updateSort(col.col, way, pos);
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, 2000);
    this.setState({ timer: timer });
  }

  onSetFiltersAndSort(filters, sort) {
    this.props.actions.setFilters(filters);
    this.props.actions.setSort(sort);
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, 2000);
    this.setState({ timer: timer });
  }

  onFiltersDefault(enable) {
    this.props.actions.initFilters(enable);
    this.props.actions.initSort();
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, 2000);
    this.setState({ timer: timer });
  }

  onLoadMore(event) {
    this.props.actions.loadMore();
  }

  onSelectMenu(option) {
    switch (option) {
      case 'selectAll':
        this.setState({ menu: null, siteId: -1 });
        this.props.actions.selectAll();
        break;
      case 'selectNone':
        this.setState({ menu: null, siteId: -1 });
        this.props.actions.selectNone();
        break;
      case 'exportAll':
        this.props.actions.exportAsTab('all').then(res => {
          if (!res) {
            messageSuccess('Export demandé');
          }
        });
        break;
      case 'exportSelection':
        this.props.actions.exportAsTab('selection').then(res => {
          if (!res) {
            messageSuccess('Export demandé');
          }
        });
        break;
      default:
        this.setState({ menu: 'movement', menuOption: option, siteId: -1 });
        break;
    }
  }

  itemClassName(item) {
    if (item && item.site_to !== null && item.site_to !== '') {
      return 'row-line-warning';
    }
    return '';
  }

  onPrint(ediId, siteId) {
    if (siteId) {
      this.props.actions.printOne(siteId, ediId);
    }
  }

  /**
   * Génération du contenu
   */
  render() {
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.site.items.FreeAsso_Site) {
      items = normalizedObjectModeler(this.props.site.items, 'FreeAsso_Site');
    }
    const counter = this.props.site.items.length + ' / ' + this.props.site.totalItems;

    // Inline Element
    let inlineComponent = null;
    switch (this.state.mode) {
      case 'animal':
        inlineComponent = <InlineCauses mode="site" siteId={this.state.item.id} />;
        break;
      case 'alert':
        inlineComponent = (
          <InlineAlerts
            mode="site"
            objId={this.state.item.id}
            objName="FreeAsso_Site"
            object={this.state.item}
          />
        );
        break;
      case 'photo':
        inlineComponent = <InlinePhotos siteId={this.state.item.id} />;
        break;
      case 'document':
        inlineComponent = <InlineDocuments siteId={this.state.item.id} />;
        break;
      default:
        break;
    }
    // Toolsbars and lists
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const selectActions = getSelectActions(this);
    const cols = getCols(this);
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.site.filters.findFirst('site_name');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label="Recherche nom"
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary" />}
      />
    );
    const { selected } = this.props.site;
    return (
      <>
        <UiList
          title="Sites"
          cols={cols}
          icon={<SiteIcon />}
          panelObject="site"
          items={items}
          quickSearch={quickSearch}
          mainCol="site_name"
          inlineOpenedItem={this.state.item}
          onClick={this.onSelectList}
          currentItem={this.state.item}
          currentInline={this.state.mode}
          inlineComponent={inlineComponent}
          inlineActions={inlineActions}
          globalActions={globalActions}
          sort={this.props.site.sort}
          filters={this.props.site.filters}
          onSearch={this.onQuickSearch}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onClearFilters={() => this.onFiltersDefault(true)}
          onClearFiltersDefault={() => this.onFiltersDefault(false)}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.site.loadMorePending}
          loadMoreFinish={this.props.site.loadMoreFinish}
          loadMoreError={this.props.site.loadMoreError}
          counter={counter}
          selected={selected}
          selectMenu={selectActions}
          onSelect={this.onSelect}
          fClassName={this.itemClassName}
        />
        {this.state.siteId > 0 && (
          <Input modal={true} siteId={this.state.siteId} onClose={this.onClose} />
        )}
        {this.state.siteId === 0 && <Input modal={true} onClose={this.onClose} />}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    site: state.site,
    siteType: state.siteType,
    edition: state.edition,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(List));
