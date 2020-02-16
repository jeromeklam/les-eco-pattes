import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { buildModel } from 'freejsonapi';
import { ResponsiveTreeviewList, ResponsiveModal } from 'freeassofront';
import * as actions from './redux/actions';
import { loadChildren, select, toggle } from '../family/redux/actions';
import { loadMore as loadItems } from '../item/redux/actions';
import {
  getGlobalActions,
  getInlineActions,
  getCols,
  Create as CreateItem,
  Modify as ModifyItem,
} from '../item';
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

export class TreeviewList extends Component {
  static propTypes = {
    stock: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      item_id: -1,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onCreateOneItem = this.onCreateOneItem.bind(this);
    this.onGetOneItem = this.onGetOneItem.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadChildren();
  }

  onSelect(id) {
    this.props.actions.select(id);
    this.props.actions.loadItems({ fam_id: id }, true);
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

  onCloseModal() {
    this.setState({ item_id: -1 });
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
          loadMorePending={this.props.item.loadMorePending}
          loadMoreFinish={this.props.item.loadMoreFinish}
          loadMoreError={this.props.item.loadMoreError}
        />
        {this.state.item_id > 0 && (
          <ModifyItem modal={true} itemId={this.state.item_id} onClose={this.onCloseModal} />
        )}
        {this.state.item_id === 0 && (
          <CreateItem modal={true} onClose={this.onCloseModal} />
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
    actions: bindActionCreators({ ...actions, loadChildren, select, toggle, loadItems }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeviewList);
