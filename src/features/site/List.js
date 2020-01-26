import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from 'freejsonapi';
import { ResponsiveList, ResponsiveQuickSearch } from 'freeassofront';
import {
  AddOne as AddOneIcon,
  Cause as CauseIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  Filter as FilterIcon,
  FilterFull as FilterFullIcon,
  FilterClear as FilterClearIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
  Search as SearchIcon,
  Photo as PhotoIcon,
  Document as DocumentIcon,
} from '../icons';
import { deleteSuccess, deleteError } from '../ui';
import { InlineCauses, InlinePhotos, InlineDocuments } from './';

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
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onListCause = this.onListCause.bind(this);
    this.onListPhoto = this.onListPhoto.bind(this);
    this.onListDocument = this.onListDocument.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/site/create');
  }

  onGetOne(id) {
    this.props.history.push('/site/modify/' + id);
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
        deleteError();
      });
  }

  onListCause(obj) {
    const { id } = obj;
    const { animalsSite } = this.state;
    if (animalsSite === id) {
      this.setState({animalsSite: 0, photosSite: 0, documentsSite: 0});
    } else {
      this.props.actions.loadCauses(id, true).then(result => {});
      this.setState({animalsSite: id, photosSite: 0, documentsSite: 0});
    }
  }

  onListPhoto(obj) {
    const { id } = obj;
    const { photosSite } = this.state;
    if (photosSite === id) {
      this.setState({animalsSite: 0, photosSite: 0, documentsSite: 0});
    } else {
      this.props.actions.loadPhotos(id, true).then(result => {});
      this.setState({animalsSite: 0, photosSite: id, documentsSite: 0});
    }
  }

  onListDocument(obj) {
    const { id } = obj;
    const { documentsSite } = this.state;
    if (documentsSite === id) {
      this.setState({animalsSite: 0, photosSite: 0, documentsSite: 0});
    } else {
      this.props.actions.loadDocuments(id, true).then(result => {});
      this.setState({animalsSite: 0, photosSite: 0, documentsSite: id});
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
    const globalActions = [
      {
        name: 'clear',
        label: 'Effacer',
        onClick: this.onClearFilters,
        theme: 'secondary',
        icon: <FilterClearIcon color="white" />,
      },
      {
        name: 'create',
        label: 'Ajouter',
        onClick: this.onCreate,
        theme: 'primary',
        icon: <AddOneIcon color="white" />,
        role: 'CREATE',
      },
    ];
    const inlineActions = [
      {
        name: 'animals',
        label: 'Animaux',
        onClick: this.onListCause,
        param: 'object',
        theme: 'secondary',
        icon: <CauseIcon color="white" />,
        role: 'DETAIL',
      },
      {
        name: 'documents',
        label: 'Documents',
        onClick: this.onListDocument,
        param: 'object',
        theme: 'secondary',
        icon: <DocumentIcon color="white" />,
        role: 'DETAIL',
      },
      {
        name: 'photos',
        label: 'Photos',
        onClick: this.onListPhoto,
        param: 'object',
        theme: 'secondary',
        icon: <PhotoIcon color="white" />,
        role: 'DETAIL',
      },
      {
        name: 'modify',
        label: 'Modifier',
        onClick: this.onGetOne,
        theme: 'secondary',
        icon: <GetOneIcon color="white" />,
        role: 'MODIFY',
      },
      {
        name: 'delete',
        label: 'Supprimer',
        onClick: this.onDelOne,
        theme: 'warning',
        icon: <DelOneIcon color="white" />,
        role: 'DELETE',
      },
    ];
    const cols = [
      {
        name: 'id',
        label: 'Identifiant',
        col: 'id',
        size: '4',
        mob_size: '36',
        title: true,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'name',
        label: 'Nom site',
        col: 'site_name',
        size: '7',
        mob_size: '36',
        title: true,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'address',
        label: 'Adresse',
        col: 'site_address1',
        size: '10',
        mob_size: '36',
        title: false,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'cp',
        label: 'CP',
        col: 'site_cp',
        size: '4',
        mob_size: '10',
        title: false,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'town',
        label: 'Commune',
        col: 'site_town',
        size: '7',
        mob_size: '26',
        title: false,
        sortable: true,
        filterable: { type: 'text' },
      },
    ];
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
    let inlineComponent = null;
    let id = null;
    if (this.state.photosSite > 0) {
      inlineComponent = <InlinePhotos />
      id = this.state.photosSite;
    } else {
      if (this.state.animalsSite > 0 ) {
        inlineComponent = <InlineCauses />
        id = this.state.animalsSite;
      } else {
        if (this.state.documentsSite > 0 ) {
          inlineComponent = <InlineDocuments />
          id = this.state.documentsSite;
        }
      }
    }
    return (
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
