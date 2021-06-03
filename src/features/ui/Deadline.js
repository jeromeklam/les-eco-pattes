import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { displayDate, displayDatetime } from 'react-bootstrap-front';

const getDeadlineClassText = (deadline, warning, bold) => {
  let textClass = '';
  let today = new Date().toISOString();
  if (deadline && deadline !== null && deadline !== '') {
    if (warning) {
      if (deadline < today) {
        textClass = 'text-danger';
      } else {
        let deadlineWarn = new Date();
        deadlineWarn.setDate(deadlineWarn.getDate() + 8);
        if (deadline < deadlineWarn.toISOString()) {
          textClass = 'text-warning';
       }
      }
    } else {
      if (deadline < today) {
        textClass = 'text-warning';
      }
    }   
  }
  if (textClass !== '') {
    if (bold) {
      textClass += ' bold';
    }
  }
  return textClass;
}

export default function Deadline(props) {
  let textClass = getDeadlineClassText(props.deadline, props.warning, props.bold);
  return (
    <div className={classnames("ui-deadline", textClass)}>
      {(props.dateOnly) ? (
        displayDate(props.deadline)
      ) : (
        displayDatetime(props.deadline, 'fr-FR', false) 
      )}
    </div>
  );
};

Deadline.propTypes = {
  deadline: PropTypes.string,
  warning: PropTypes.bool,
  dateOnly: PropTypes.bool,
  size: PropTypes.string,
  bold: PropTypes.bool,
};

Deadline.defaultProps = {
  deadline: '',
  warning: false,
  dateOnly: true,
  size: '1',
  bold: false,
};