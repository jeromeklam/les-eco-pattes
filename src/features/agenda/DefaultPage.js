import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizedObjectModeler } from 'jsonapi-tools';
import { Calendar, Views, dateFnsLocalizer, Dropdown } from 'react-bootstrap-front';
import { format, parse, startOfWeek, subDays, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { AddOne as AddOneIcon, Checked, UnChecked } from '../icons';
import { CenteredLoading3Dots } from '../ui';
import { Create as CreateEvent, Modify as ModifyEvent } from '../alert';

const locales = { fr: fr };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const messages = {
  allDay: 'journée',
  previous: 'précédent',
  next: 'suivant',
  today: "aujourd'hui",
  month: 'mois',
  week: 'semaine',
  day: 'jour',
  agenda: 'Agenda',
  date: 'date',
  time: 'heure',
  event: 'événement', // Or anything you want
  showMore: total => `+ ${total} événement(s) supplémentaire(s)`,
};

export class DefaultPage extends Component {
  static propTypes = {
    agenda: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.agenda.resources !== state.resources) {
      return {resources: props.agenda.resources};
    }
    return null;
  }

  constructor(props) {
    super(props);
    const now = new Date();
    const yesterday = subDays(now, 350);
    this.state = {
      view: Views.MONTH,
      loaded: false,
      date: yesterday,
      current: null,
      params: {},
      userRef: React.createRef(),
      categoryRef: React.createRef(),
      userSelect: false,
      categorySelect: false,
      resources: [],
      categories: [],
    };
    this.onAddEvent = this.onAddEvent.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
    this.onNavigate = this.onNavigate.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCloseEvent = this.onCloseEvent.bind(this);
    this.onSelecting = this.onSelecting.bind(this);
    this.onSelectSlot = this.onSelectSlot.bind(this);
    this.onSelectUsers = this.onSelectUsers.bind(this);
    this.onSelectCategories = this.onSelectCategories.bind(this);
    this.onCloseDropdown = this.onCloseDropdown.bind(this);
    this.onSelectUser = this.onSelectUser.bind(this);
  }

  componentDidMount() {
    const now = new Date();
    this.setState({
      date: now
    });
    this.props.actions.loadResources().then(result => {
      this.setState({
        loaded: true,
      });
    });
  }

  onNavigate() {
    //console.log('navigate');
  }

  onSelecting(param) {
    //console.log('selecting');
  }

  onSelectSlot(param) {
    if (param && param.action && param.action === 'select') {
      const start = param.start || new Date();
      const end = param.end || new Date();
      const user_id = param.resourceId || this.props.user.id;
      let user = null;
      const { resources } = this.props.agenda;
      if (Array.isArray(resources)) {
        const found = resources.find(elem => elem.id === user_id);
        if (found) {
          user = found;
        }
      }
      this.setState({ current: 0, params: { alert_from: start, alert_to: end, user: user } });
    }
  }

  onAddEvent() {
    this.setState({ current: 0 });
  }

  onClick(event) {
    if (event) {
      this.setState({ current: parseInt(event.id, 10) });
    }
  }

  onCloseEvent() {
    this.setState({ current: null, params: {} });
  }

  onRangeChange(p_range, p_view) {
    if (p_view) {
      this.setState({ view: p_view });
    } else {
      p_view = this.state.view;
    }
    let filters = {};
    switch (p_view) {
      case Views.MONTH: {
        filters = {
          and: {
            alert_from: { gte: new Date(Date.parse(p_range.start)).toISOString() },
            alert_to: { ltwe: new Date(Date.parse(p_range.end)).toISOString() },
          },
        };
        break;
      }
      case Views.DAY: {
        const day = new Date(Date.parse(p_range[0]));
        const dayStart = day;
        let dayEnd = new Date(day);
        dayEnd.setDate(dayEnd.getDate() + 1);
        filters = {
          and: {
            alert_from: { gte: dayStart.toISOString() },
            alert_to: { ltwe: dayEnd.toISOString() },
          },
        };
        break;
      }
      case Views.WEEK: {
        filters = {
          and: {
            alert_from: { gte: new Date(Date.parse(p_range[0])).toISOString() },
            alert_to: { ltwe: new Date(Date.parse(p_range[p_range.length - 1])).toISOString() },
          },
        };
        break;
      }
      default:
        break;
    }
    this.props.actions.loadEvents(filters);
  }

  onSelectUsers(evt) {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    this.setState({ userSelect: !this.state.userSelect });
  }

  onSelectCategories(evt) {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    this.setState({ categorySelect: !this.state.categorySelect });
  }

  onCloseDropdown() {
    this.setState({ userSelect: false, categorySelect: false });
  }

  onSelectUser(id) {
    console.log(id);
    const { resources } = this.state;
    const idx = resources.findIndex(elem => elem.id === id);
    if (idx !== false) {
      resources[idx].selected = !(resources[idx].selected === true || false);
    }
    this.setState({resources: resources});
  }

  render() {
    window.__localeId__ = 'fr';
    let myEventsList = [];
    if (this.props.agenda.events) {
      myEventsList =
        normalizedObjectModeler(this.props.agenda.events, 'FreeFW_Alert', null, { eager: true }) ||
        [];
    }
    return (
      <div>
        <div className="agenda-default-page-header">
          <div className="row row-short">
            <div className="col-18 text-left">
              <div className="nav justify-content-left">
                <div className="nav-item">
                  <button
                    className="btn btn-primary text-light"
                    onClick={this.onSelectUsers}
                    ref={this.state.userRef}
                  >
                    <span>Utilisateurs</span>
                  </button>
                  {this.state.userSelect && (
                    <Dropdown
                      myRef={this.state.userRef}
                      onClose={this.onCloseDropdown}
                      className="bg-light text-secondary"
                    >
                      {this.state.resources.map(user => 
                        <div key={`dropuser-` + user.id} className="dropdown-item" onClick={() => this.onSelectUser(user.id)}>
                          <span className="pr-2">
                            {user.selected !== false ? <Checked /> : <UnChecked />}
                          </span>
                          <span style={{position: 'relative', top: '2px'}}>{user.user_first_name}</span>
                        </div>
                      )}
                    </Dropdown>
                  )}
                </div>
                <div className="nav-item">
                  <button
                    className="btn btn-primary text-light"
                    onClick={this.onSelectCategories}
                    ref={this.state.categoryRef}
                  >
                    <span>Catégories</span>
                  </button>
                  {this.state.categorySelect && (
                    <Dropdown
                      myRef={this.state.categoryRef}
                      onClose={this.onCloseDropdown}
                      className="bg-light text-secondary"
                    >
                      <span>Test</span>
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>
            <div className="col-18 text-right">
              <div className="nav justify-content-end">
                <div className="nav-item">
                  <button className="btn btn-primary text-light" onClick={this.onAddEvent}>
                    <AddOneIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="agenda-default-page">
          {this.state.loaded ? (
            <Calendar
              selectable
              localizer={localizer}
              events={myEventsList}
              startAccessor={data => {
                if (data.alert_from) {
                  return new Date(data.alert_from);
                }
                return null;
              }}
              endAccessor={data => {
                if (data.alert_to) {
                  return new Date(data.alert_to);
                }
                return null;
              }}
              doneAccessor={data => {
                if (data && data.alert_done_ts) {
                  return true;
                }
                return false;
              }}
              titleAccessor="alert_title"
              tooltipAccessor="alert_text"
              resourceAccessor="user.id"
              resources={this.state.resources}
              resourceIdAccessor="id"
              resourceTitleAccessor="user_first_name"
              messages={messages}
              culture="fr"
              defaultView={this.state.view}
              onRangeChange={this.onRangeChange}
              onNavigate={this.onNavigate}
              onDoubleClickEvent={this.onClick}
              onSelectSlot={this.onSelectSlot}
              onSelecting={this.onSelecting}
              style={{ height: '100%' }}
              icons={{done : <Checked />}}
            />
          ) : (
            <CenteredLoading3Dots />
          )}
        </div>
        {this.state.current && this.state.current > 0 && (
          <ModifyEvent onClose={this.onCloseEvent} alert_id={this.state.current} />
        )}
        {this.state.current === 0 && (
          <CreateEvent
            onClose={this.onCloseEvent}
            alert_id={this.state.current}
            params={this.state.params}
          />
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    agenda: state.agenda,
    user: state.auth.user,
    alertCategory: state.alertCategory,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
