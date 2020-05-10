import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { buildModel } from 'freejsonapi';
import { ResponsiveList, ResponsiveQuickSearch } from 'freeassofront';
import {
  Filter as FilterIcon,
  FilterFull as FilterFullIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
  Search as SearchIcon,
} from '../icons';
import { deleteSuccess, showErrors } from '../ui';
import {
  InlineCauses,
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
      photosSite: 0,
      documentsSite: 0,
      siteId: -1,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onListCause = this.onListCause.bind(this);
    this.onListPhoto = this.onListPhoto.bind(this);
    this.onListDocument = this.onListDocument.bind(this);
    this.onZoomMap = this.onZoomMap.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ siteId: 0 });
  }

  onGetOne(id) {
    this.setState({ siteId: id });
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
        // @todo display errors to fields
        showErrors(this.props.intl, this.props.site.delOneError);
      });
  }

  onListCause(obj) {
    const { id } = obj;
    const { animalsSite } = this.state;
    if (animalsSite === id) {
      this.setState({ animalsSite: 0, photosSite: 0, documentsSite: 0 });
    } else {
      this.props.actions.loadCauses(id, true).then(result => {});
      this.setState({ animalsSite: id, photosSite: 0, documentsSite: 0 });
    }
  }

  onListPhoto(obj) {
    const { id } = obj;
    const { photosSite } = this.state;
    if (photosSite === id) {
      this.setState({ animalsSite: 0, photosSite: 0, documentsSite: 0 });
    } else {
      this.props.actions.loadPhotos(id, true).then(result => {});
      this.setState({ animalsSite: 0, photosSite: id, documentsSite: 0 });
    }
  }

  onListDocument(obj) {
    const { id } = obj;
    const { documentsSite } = this.state;
    if (documentsSite === id) {
      this.setState({ animalsSite: 0, photosSite: 0, documentsSite: 0 });
    } else {
      this.props.actions.loadDocuments(id, true).then(result => {});
      this.setState({ animalsSite: 0, photosSite: 0, documentsSite: id });
    }
  }

  onZoomMap(obj) {
    const coord = JSON.parse(obj.site_coord);
    if (coord) {
      this.props.history.push('/pigeon-map/' + coord.lat + "/" + coord.lon);
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

  /**
   * Génération du contenu
   */
  render() {
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.site.items.FreeAsso_Site) {
      items = buildModel(this.props.site.items, 'FreeAsso_Site');
    }
    // Inline Element
    let inlineComponent = null;
    let id = null;
    if (this.state.photosSite > 0) {
      inlineComponent = <InlinePhotos />;
      id = this.state.photosSite;
    } else {
      if (this.state.animalsSite > 0) {
        inlineComponent = <InlineCauses />;
        id = this.state.animalsSite;
      } else {
        if (this.state.documentsSite > 0) {
          inlineComponent = <InlineDocuments />;
          id = this.state.documentsSite;
        }
      }
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
          inlineActions={inlineActions}
          inlineOpenedId={id}
          inlineComponent={inlineComponent}
          globalActions={globalActions}
          sort={this.props.site.sort}
          filters={this.props.site.filters}
          onSearch={this.onQuickSearch}
          onClearFilters={this.onClearFilters}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.site.loadMorePending}
          loadMoreFinish={this.props.site.loadMoreFinish}
          loadMoreError={this.props.site.loadMoreError}
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(List));
