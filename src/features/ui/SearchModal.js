import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import {
  ResponsiveModal,
  FILTER_MODE_AND,
  FILTER_OPER_EQUAL,
  FILTER_SEARCH_SIMPLE,
  Row,
  Col,
  FilterBuilder,
  FilterHeader,
  Filter,
} from 'react-bootstrap-front';
import {
  Calendar as CalendarIcon,
  DelOne as ClearIcon,
  Filter as FilterIcon,
  FilterEmpty as FilterEmptyIcon,
  FilterFull as FilterFullIcon,
  FilterClear as FilterClearIcon,
  FilterDefault as FilterDefaultIcon,
  FilterClearDefault as FilterClearDefaultIcon,
  SimpleCancel as CancelPanelIcon,
  Search as ValidPanelIcon,
  Cancel as CancelIcon
} from '../icons';

class SearchModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onClear: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    list: PropTypes.element,
    pickerDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    conditions: PropTypes.array,
  };
  static defaultProps = {
    list: null,
    pickerDisplay: '',
    title: '',
  };

  static getDerivedStateFromProps(props, state) {
    if (props.conditions !== state.conditions) {
      let filters = new Filter();
      filters.init(FILTER_MODE_AND, FILTER_OPER_EQUAL);
      if (Array.isArray(props.conditions)) {
        props.conditions.forEach(elem => filters.addFilter(elem.field, elem.value, elem.oper));
      }
      return { conditions: props.conditions, filters: filters };
    }
    return null;
  }

  constructor(props) {
    super(props);
    let filters = new Filter();
    filters.init(FILTER_MODE_AND, FILTER_OPER_EQUAL);
    if (Array.isArray(props.conditions)) {
      props.conditions.forEach(elem => filters.addFilter(elem.field, elem.value, elem.oper));
    }
    this.state = {
      condition: FILTER_MODE_AND,
      filters: filters,
      conditions: props.conditions,
      local: false,
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onFilterMode = this.onFilterMode.bind(this);
    this.onOperator = this.onOperator.bind(this);
    this.onFilterOperator = this.onFilterOperator.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {}

  onFilterChange(event, oper = false) {
    let { filters } = this.state;
    filters.addFilter(event.target.name, event.target.value, oper);
    filters.setSearch(FILTER_SEARCH_SIMPLE);
    this.setState({ filters, local: true });
  }

  onFilterMode(event) {
    let { filters } = this.state;
    filters.setMode(event.target.value);
    filters.setSearch(FILTER_SEARCH_SIMPLE);
    this.setState({ filters, local: true });
  }

  onOperator(event) {
    let { filters } = this.state;
    filters.setOperator(event.target.value);
    filters.setSearch(FILTER_SEARCH_SIMPLE);
    this.setState({ filters, local: true });
  }

  onFilterOperator(event) {
    let { filters } = this.state;
    const col = event.target.name;
    const oper = event.target.value;
    filters.updateFilterOperator(col.replace('oper-', ''), oper);
    this.setState({ filters, local: true });
  }

  onClear(event) {
    let filters = this.state.filters;
    this.setState({ filters });
    this.props.onClear();
  }

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSearch(event);
    }
  }

  onSearch(event) {
    this.props.onSearch(this.state.filters);
  }

  render() {
    const buttons = [
      {
        name: this.props.intl.formatMessage({
          id: 'app.features.ui.searchModal.filter',
          defaultMessage: 'Filter',
        }),
        function: this.onSearch,
        theme: 'primary',
        icon: <FilterIcon />,
      },
      {
        name: this.props.intl.formatMessage({
          id: 'app.features.ui.searchModal.delete',
          defaultMessage: 'Delete',
        }),
        function: this.onClear,
        theme: 'warning',
        icon: <ClearIcon />,
      },
      {
        name: this.props.intl.formatMessage({
          id: 'app.features.ui.searchModal.cancel',
          defaultMessage: 'Cancel',
        }),
        function: this.props.onClose,
        theme: 'secondary',
        icon: <CancelIcon />,
      },
    ];
    return (
      <ResponsiveModal
        size="md"
        title={this.props.title}
        show={this.props.show}
        onClose={this.props.onClose}
        buttons={buttons}
        scroll={false}
        modalClassName="bg-secondary-light text-secondary"
        closeClassName="text-light"
      >
        <Row className="ui-search-modal h-100 overflow-hidden no-gutters">
          <Col
            className="ui-search-modal-right border border-secondary-light p-0"
            size={{ xxs: 36, sm: 18 }}
          >
            <div className="h-100 custom-scrollbar">{this.props.list}</div>
          </Col>
          <Col className="ui-search-modal-left p-0" size={{ xxs: 36, sm: 18 }}>
            <div className="ui-search-modal-left-top p-2 border border-secondary-light">
              <FilterHeader
                filters={this.state.filters}
                onMode={this.onFilterMode}
                onOperator={this.onOperator}
                onFilterOperator={this.onFilterOperator}
              />
            </div>
            <div className="ui-search-modal-left-bottom custom-scrollbar border border-secondary-light p-2">
              <FilterBuilder
                {...this.props}
                calIcon={<CalendarIcon className="text-secondary" />}
                clearIcon={<ClearIcon className="text-warning" />}
                filterFullIcon={<FilterFullIcon color="white" />}
                filterEmptyIcon={<FilterEmptyIcon color="white" />}
                filterClearIcon={<FilterClearIcon color="white" />}
                filterDefaultIcon={<FilterDefaultIcon color="white" />}
                filterClearDefaultIcon={<FilterClearDefaultIcon color="white" />}
                validPanelIcon={<ValidPanelIcon />}
                cancelPanelIcon={<CancelPanelIcon />}
                filters={this.state.filters}
                onChange={this.onFilterChange}
                onMode={this.onFilterMode}
                onOperator={this.onOperator}
                onFilterOperator={this.onFilterOperator}
                withHeader={false}
              />
            </div>
          </Col>
        </Row>
      </ResponsiveModal>
    );
  }
}

export default injectIntl(SearchModal);
