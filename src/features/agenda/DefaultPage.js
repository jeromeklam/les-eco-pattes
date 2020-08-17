import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizedObjectModeler } from 'freejsonapi';
import { Calendar, Views, dateFnsLocalizer } from 'freeassofront';
import {format, parse, startOfWeek, subDays, getDay} from 'date-fns';
import { fr } from 'date-fns/locale';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { AddOne as AddOneIcon } from '../icons';

const locales = { "fr": fr };
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
  today: 'aujourd\'hui',
  month: 'mois',
  week: 'semaine',
  day: 'jour',
  agenda: 'Agenda',
  date: 'date',
  time: 'heure',
  event: 'événement', // Or anything you want
  showMore: total => `+ ${total} événement(s) supplémentaire(s)`
}

export class DefaultPage extends Component {
  static propTypes = {
    agenda: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const now = new Date();
    const yesterday = subDays(now, 350);
    this.state = {
      date: yesterday
    };
    this.addOneEvent = this.addOneEvent.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
    this.onNavigate = this.onNavigate.bind(this);
  }

  componentDidMount() {
    const now = new Date();
    this.setState({
      date: now
    });
  }

  onNavigate() {
    console.log('navigate');
  }

  addOneEvent() {

  }

  onRangeChange(p_range) {
    this.props.actions.loadEvents();
    console.log(p_range);
  }

  render() {
    window.__localeId__ = 'fr';
    let myEventsList = [];
    if (this.props.agenda.events) {
      //myEventsList = normalizedObjectModeler(this.props.agenda.events, 'FreeFW_Alert');
    }
    return (
      <div>
        <div className="agenda-default-page-header">
          <div className="row row-short">
            <div className="col-36 text-right">
              <div className="nav justify-content-end">
                <div className="nav-item">
                  <button className="btn btn-primary text-light" onClick={this.addOneEvent}>
                    <AddOneIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="agenda-default-page">
          <Calendar
            selectable
            localizer={localizer}
            events={myEventsList}
            startAccessor="alert_from"
            endAccessor="alert_to"
            titleAccessor="alert_title"
            tooltipAccessor="alert_desc"
            messages={messages}
            culture="fr"
            defaultView={Views.MONTH}
            onRangeChange={this.onRangeChange}
            onNavigate={this.onNavigate}
            style={{ height: '100%' }}
          />
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    agenda: state.agenda,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
