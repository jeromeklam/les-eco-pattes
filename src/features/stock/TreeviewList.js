import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { buildModel } from 'freejsonapi';
import { ResponsiveTreeviewList } from 'freeassofront';
import * as actions from './redux/actions';
import { loadChildren, select, toggle, delOne as delOneFamily } from '../family/redux/actions';
import { loadMore as loadItems, delOne as delOneItem } from '../item/redux/actions';
import {
  getGlobalActions,
  getInlineActions,
  getCols,
  Create as CreateItem,
  Modify as ModifyItem,
} from '../item';
import {
  Create as CreateFamily,
  Modify as ModifyFamily,
} from '../family';
import {
  Filter as FilterIcon,
  FilterFull as FilterFullIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
  AddOne as AddOneIcon,
  DelOne as DelOneIcon,
  GetOne as GetOneIcon,
} from '../icons';
import { deleteSuccess, deleteError } from '../ui';

export class TreeviewList extends Component {
  static propTypes = {
    stock: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentFamily: null,
      item_id: -1,
      family: null,
      fam_id: -1,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onCreateOneItem = this.onCreateOneItem.bind(this);
    this.onGetOneItem = this.onGetOneItem.bind(this);
    this.onDelOneItem = this.onDelOneItem.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onCreateOneFamily = this.onCreateOneFamily.bind(this);
    this.onGetOneFamily = this.onGetOneFamily.bind(this);
    this.onDelOneFamily = this.onDelOneFamily.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadChildren();
  }

  onSelect(family) {
    this.setState({ family: family });
    if (family) {
      this.props.actions.select(family.id);
      this.props.actions.loadItems({ family: family, fam_id: family.id }, true);
    } else {
      this.props.actions.select(0);
      this.props.actions.loadItems({ family: null, fam_id: 0 }, true);
    }
  }

  onToggle(id) {
    const tree = this.props.family.tree;
    if (tree.isLoaded(id)) {
      this.props.actions.toggle(id);
    } else {
      this.props.actions.loadChildren({ parent_id: id });
    }
  }

  onCreateOneItem() {
    this.setState({ item_id: 0 });
  }

  onGetOneItem(id) {
    this.setState({ item_id: id });
  }

  onCreateOneFamily(family) {
    this.setState({ currentFamily: family, fam_id: 0 });
  }

  onGetOneFamily(family) {
    this.setState({ currentFamily: family, fam_id: family.id });
  }

  onDelOneFamily(family) {
    this.setState({ currentFamily: null, fam_id: -1 });
    console.log(family);
    this.props.actions
      .delOneFamily(family.id)
      .then(result => {
        this.props.actions.loadItems({ family: null, fam_id: 0 }, true);
        deleteSuccess();
      })
      .catch(errors => {
        // @todo display errors to fields
        deleteError();
      });
  }

  onDelOneItem(id) {
    const { family } = this.state;
    this.props.actions
      .delOneItem(id)
      .then(result => {
        this.props.actions.loadItems({ family: family, fam_id: family.id }, true);
        deleteSuccess();
      })
      .catch(errors => {
        // @todo display errors to fields
        deleteError();
      });
  }

  onCloseModal() {
    this.setState({ item_id: -1, fam_id: -1 });
  }

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.item.items.FreeAsso_Item) {
      items = buildModel(this.props.item.items, 'FreeAsso_Item');
    }
    // Inline Element
    let inlineComponent = null;
    let id = null;
    // Toolsbars and lists
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const cols = getCols(this);
    // filter
    const filterIcon = this.props.item.filters.isEmpty() ? (
      <FilterIcon className="text-light" />
    ) : (
      <FilterFullIcon className="text-light" />
    );
    return (
      <div className="stock-treeview-list">
        <ResponsiveTreeviewList
          title="Stock"
          root="Familles"
          tree={this.props.family.tree}
          onSelect={this.onSelect}
          onToggle={this.onToggle}
          cols={cols}
          items={items || []}
          globalActions={globalActions}
          inlineActions={inlineActions}
          inlineOpenedId={id}
          inlineComponent={inlineComponent}
          filterIcon={filterIcon}
          cancelPanelIcon={<CancelPanelIcon />}
          validPanelIcon={<ValidPanelIcon />}
          sortDownIcon={<SortDownIcon color="secondary" />}
          sortUpIcon={<SortUpIcon color="secondary" />}
          sortNoneIcon={<SortNoneIcon color="secondary" />}
          TreeCreateOneIcon={<AddOneIcon className="text-light inline-action" />}
          TreeGetOneIcon={<GetOneIcon className="text-light inline-action" />}
          TreeDelOneIcon={<DelOneIcon className="text-light inline-action" />}
          onTreeCreateOne={this.onCreateOneFamily}
          onTreeGetOne={this.onGetOneFamily}
          onTreeDelOne={this.onDelOneFamily}
          loadMorePending={this.props.item.loadMorePending}
          loadMoreFinish={this.props.item.loadMoreFinish}
          loadMoreError={this.props.item.loadMoreError}
        />
        {this.state.item_id > 0 && (
          <ModifyItem modal={true} parentFamily={this.state.family} itemId={this.state.item_id} onClose={this.onCloseModal} />
        )}
        {this.state.item_id === 0 && (
          <CreateItem modal={true} parentFamily={this.state.family} onClose={this.onCloseModal} />
        )}
        {this.state.fam_id > 0 && (
          <ModifyFamily modal={true} parentFamily={this.state.currentFamily} famId={this.state.fam_id} onClose={this.onCloseModal} />
        )}
        {this.state.fam_id === 0 && (
          <CreateFamily modal={true} parentFamily={this.state.currentFamily} onClose={this.onCloseModal} />
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    stock: state.stock,
    family: state.family,
    item: state.item,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, loadChildren, select, toggle, loadItems, delOneItem, delOneFamily }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeviewList);
