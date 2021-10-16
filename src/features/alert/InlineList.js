import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Filter, FILTER_OPER_EQUAL, FILTER_MODE_AND } from 'react-bootstrap-front';
import {
  objectToQueryString,
  jsonApiNormalizer,
  normalizedObjectModeler,
  getNewNormalizedObject,
} from 'jsonapi-front';
import * as actions from './redux/actions';
import { freeAssoApi } from '../../common';
import { CenteredLoading3Dots, sortAsJsonApiObject, ResponsiveInlineList, showErrors } from '../ui';
import { getCols, Input } from './';

/**
 * Liste interne responsive, pour la recherche ou l'affichage
 *
 * C'est à l'appelant de gérer la recherche et les actions.
 */
export class InlineList extends Component {
  static propTypes = {
    items: PropTypes.array,
    loading: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  };
  static defaultProps = {
    items: [],
    loading: false,
  };

  /**
   * Update state, ...
   *
   * @param {Object} props
   * @param {Object} state
   */
  static getDerivedStateFromProps(props, state) {
    if (props.parentId !== state.parentId || props.mode !== state.mode) {
      let filters = state.filters;
      if (props.mode === '<name>') {
        filters.addFilter('<field>', '<value>', FILTER_OPER_EQUAL, true);
      }
      return {
        parentId: props.parentId,
        mode: props.mode,
        normalized: getNewNormalizedObject('FreeFW_Alert'),
        items: [],
        filters: filters,
        currentPage: 1,
        currentCount: 0,
      };
    }
    return null;
  }

  /**
   * Constructor
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    const parentId = props.parentId || null;
    const filters = props.filters || new Filter();
    filters.init(FILTER_MODE_AND, FILTER_OPER_EQUAL);
    const sort = props.sort || [{ col: 'alert_title', way: 'up' }];
    if (props.mode === '<name>') {
      filters.addFilter('<field>', '<value>', FILTER_OPER_EQUAL, true);
    }
    // State
    this.state = {
      id: -1,
      parentId: parentId,
      filters: filters,
      mode: props.mode,
      sort: sort,
      normalized: getNewNormalizedObject('FreeFW_Alert'),
      items: [],
      currentPage: 1,
      currentCount: 0,
      loadingItems: true,
      confirm: false,
    };
    // Binds
    this.localLoad = this.localLoad.bind(this);
    this.onAddOne = this.onAddOne.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onConfirmOpen = this.onConfirmOpen.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
  }

  /**
   * On mount
   */
  componentDidMount() {
    this.localLoad(true);
  }

  /**
   * Update
   *
   * @param {Object} prevProps
   * @param {Object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.parentId !== prevState.parentId || this.state.mode !== prevState.mode) {
      this.localLoad(true);
    }
  }

  /**
   * Load items
   *
   * @param {Bool} reset
   */
  localLoad(reset = true) {
    let update = { loadingItems: true };
    let currentPage = this.state.currentPage;
    if (reset) {
      update = {
        ...update,
        normalized: getNewNormalizedObject('FreeFW_Alert'),
        items: [],
        currentPage: 1,
        currentCount: 0,
      };
    } else {
      currentPage++;
      update = {
        ...update,
        currentPage: currentPage,
      };
    }
    this.setState({ ...update });
    let filters = this.state.filters;
    let sort = sortAsJsonApiObject(this.state.sort);
    let params = {
      ...filters.asJsonApiObject(),
      ...sort,
      page: { number: currentPage, size: 25 },
    };
    const addUrl = objectToQueryString(params);
    const doRequest = freeAssoApi.get('/v1/core/alert' + addUrl, {});
    doRequest.then(result => {
      if (result && result.data) {
        let normalized = [];
        if (!reset) {
          normalized = jsonApiNormalizer(result.data, this.state.normalized);
        } else {
          normalized = jsonApiNormalizer(result.data);
        }
        this.setState({
          normalized: normalized,
          loadingItems: false,
          currentCount: normalized.TOTAL || 0,
          items: normalizedObjectModeler(normalized, 'FreeFW_Alert'),
        });
      } else {
        this.setState({ normalized: getNewNormalizedObject('FreeFW_Alert'), loadingItems: false });
      }
    });
  }

  onAddOne() {
    this.setState({ id: 0 });
  }

  onGetOne(id) {
    this.setState({ id: id });
  }

  onDelOne(id) {
    this.props.actions.delOne(id).then(result => {
      this.localLoad();
    }).catch(errors => {
      showErrors(this.props.intl, errors);
    });
  }

  onClose() {
    this.setState({ id: -1 });
    this.localLoad(true);
  }

  onConfirmOpen(id) {
    this.setState({ confirm: true, id: id });
  }

  onConfirmClose() {
    this.setState({ confirm: false, id: -1 });
  }

  render() {
    const cols = getCols(this);
    return (
      <div className="alert-inline-list">
        <ResponsiveInlineList
          cols={cols}
          {...this.props}
          items={this.state.items}
          onAddOne={this.onAddOne}
          onGetOne={this.onGetOne}
          onDelOne={this.onDelOne}
          onMore={() => this.localLoad(false)}
          total={this.state.currentCount}
          loading={this.state.loadingItems}
          onConfirm={id => this.onConfirmOpen(id)}
        />
        {this.state.loadingItems && <CenteredLoading3Dots />}
        <div>
          {!this.state.confirm && this.state.id === 0 && (
            <Input
              onClose={this.onClose}
              mode={this.props.mode}
              parentId={this.state.parentId}
              objParent={this.props.objParent}
            />
          )}
          {!this.state.confirm && this.state.id > 0 && (
            <Input onClose={this.onClose} id={this.state.id} />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(InlineList));
