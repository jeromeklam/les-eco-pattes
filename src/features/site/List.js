import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'freejsonapi';
import { ResponsiveList, ResponsiveQuickSearch } from 'freeassofront';
import {
  Close as CloseIcon,
  Filter as FilterIcon,
  FilterFull as FilterFullIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleCheck as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
  Search as SearchIcon,
  DelOne as ClearIcon,
  Calendar as CalendarIcon,
} from '../icons';
import { deleteSuccess, showErrors } from '../ui';
import { InlineCauses } from '../cause';
import { InlineAlerts } from '../alert';
import {
  InlinePhotos,
  InlineDocuments,
  getGlobalActions,
  getInlineActions,
  getCols,
  Create,
  Modify,
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
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onSelectList = this.onSelectList.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onZoomMap = this.onZoomMap.bind(this);
    this.itemClassName = this.itemClassName.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ animalsSite: 0, alertsSite: 0 ,photosSite: 0, documentsSite: 0, siteId: 0 });
  }

  onGetOne(id) {
    this.setState({ animalsSite: 0, alertsSite: 0 ,photosSite: 0, documentsSite: 0, siteId: id });
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
        showErrors(this.props.intl, this.props.site.delOneError);
      });
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
      this.props.history.push('/pigeon-map/' + id  + "/" + coord.lat + "/" + coord.lon);
    } else {
      this.props.history.push('/pigeon-map/' + id) ; 
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

  onClearFilters() {
    this.props.actions.initFilters();
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

  itemClassName(item) {
    if (item && item.site_to !== null && item.site_to !== '') {
      return 'row-line-warning';
    }
    return '';
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
    // Inline Element
    let inlineComponent = null;
    let id = null;
    switch (this.state.mode) {
      case 'animal':
        id = this.state.item.id;
        inlineComponent = <InlineCauses mode="site" siteId={id} />;
        break;
      case "alert":
        id = this.state.item.id;
        inlineComponent = <InlineAlerts mode="site" objId={id} objName='FreeAsso_Site' />;
        break;
      case "photo":
        id = this.state.item.id;
        inlineComponent = <InlinePhotos siteId={id} />;
        break;
      case "document":
        id = this.state.item.id;
        inlineComponent = <InlineDocuments siteId={id} />;
        break;
      default:
        id = 0;
        break;
    }
    // Toolsbars and lists
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
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
    const filterIcon = this.props.site.filters.isEmpty() ? (
      <FilterIcon className="text-light" />
    ) : (
      <FilterFullIcon className="text-light" />
    );
    return (
      <div>
        <ResponsiveList
          title="Sites"
          cols={cols}
          items={items || []}
          quickSearch={quickSearch}
          mainCol="site_name"
          filterIcon={filterIcon}
          cancelPanelIcon={<CancelPanelIcon />}
          validPanelIcon={<ValidPanelIcon />}
          sortDownIcon={<SortDownIcon color="secondary" />}
          sortUpIcon={<SortUpIcon color="secondary" />}
          sortNoneIcon={<SortNoneIcon color="secondary" />}
          calIcon={<CalendarIcon className="text-secondary" />}
          clearIcon={<ClearIcon className="text-warning" />}
          closeIcon={<CloseIcon />}
          inlineActions={inlineActions}
          inlineOpenedId={id}
          inlineComponent={inlineComponent}
          inlineOpenedItem={this.state.item}
          globalActions={globalActions}
          sort={this.props.site.sort}
          filters={this.props.site.filters}
          onSearch={this.onQuickSearch}
          onClearFilters={this.onClearFilters}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onLoadMore={this.onLoadMore}
          onClick={this.onSelectList}
          loadMorePending={this.props.site.loadMorePending}
          loadMoreFinish={this.props.site.loadMoreFinish}
          loadMoreError={this.props.site.loadMoreError}
          fClassName={this.itemClassName}
        />
        {this.state.siteId > 0 && (
          <Modify modal={true} siteId={this.state.siteId} onClose={this.onClose} />
        )}
        {this.state.siteId === 0 && (
          <Create modal={true} onClose={this.onClose} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    site: state.site,
    siteType: state.siteType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(List));
