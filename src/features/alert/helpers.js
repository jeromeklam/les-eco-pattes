import React from 'react';
import classnames from 'classnames';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  Critical as CriticalIcon,
  Important as ImportantIcon,
  Information as InformationIcon,
} from '../icons';

export const alertPriority = [
  { label: 'Important', value: 'IMPORTANT' },
  { label: 'Critique', value: 'CRITICAL' },
  { label: 'Information', value: 'INFORMATION' },
  { label: 'A faire', value: 'TODO' },
  { label: '-', value: 'NONE' },
]

export const alertRecurType = [
  { label: 'Aucune', value: 'NONE' },
  { label: 'Jours', value: 'DAY' },
  { label: 'Mois', value: 'MONTH' },
  { label: 'Années', value: 'YEAR' },
  { label: 'Heures', value: 'HOUR' },
  { label: 'Minutes', value: 'MINUTE' },
]

export const alertRemind = [
  { label: 'Aucun', value: 'NONE' },
  { label: '15 minutes', value: '15M' },
  { label: '30 minutes', value: '30M' },
  { label: '1 heure', value: '1H' },
  { label: '2 heures', value: '2H' },
  { label: '1 jour', value: '1D' },
  { label: '2 jours', value: '2D' },
]

export const displayDeadlint = item => {
  let textColor = 'text-warning';
}

export const displayItemPicker = item => {
  if (item && item.id) {
    return (
      <>
        <span>
          {item.alert_title}
        </span>
      </>
    );
  }
  return null;
};

export const getPickerDisplay = item => {
  if (item && item.id) {
    return (
      <>
        <span>
          {item.alert_title}
        </span>
      </>
    );
  }
  return null;
};

export const displayPriority = item => {
  let textColor = 'text-warning';
  switch (item.alert_priority) {
    case 'IMPORTANT':
      return (
        <ImportantIcon className={classnames('col-icon', textColor)} />
      );
    case 'CRITICAL':
      return (
        <CriticalIcon className={classnames('col-icon', textColor)} />
      );
    case 'INFORMATION':
      return (
        <InformationIcon className={classnames('col-icon text-secondary')} />
      );
    default: return null;
  }
}

export const getGlobalActions = ({ onClearFilters, onCreate }) => {
  return [
    {
      name: 'create',
      label: 'Ajouter',
      onClick: onCreate,
      theme: 'primary',
      icon: <AddOneIcon color="white" />,
      role: 'CREATE',
    },
  ];
};

export const getInlineActions = ({ onGetOne, onDelOne }) => {
  return [
    {
      name: 'modify',
      label: 'Modifier',
      onClick: onGetOne,
      theme: 'secondary',
      icon: <GetOneIcon color="white" />,
      role: 'MODIFY',
    },
    {
      name: 'delete',
      label: 'Supprimer',
      onClick: onDelOne,
      theme: 'warning',
      icon: <DelOneIcon color="white" />,
      role: 'DELETE',
    },
  ];
};

export const getCols = ({ props }) => {
  return [
    {
      name: 'id',
      label: 'Identifiant',
      col: 'id',
      size: '4',
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      hidden: true,
    },
    {
      name: 'alert_from',
      label: 'Prévu le',
      col: 'alert_from',
      size: '4',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
      first: true,
    },
    {
      name: 'alert_deadline',
      label: 'Echéance',
      col: 'alert_deadline',
      size: '4',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
    },
    {
      name: 'title',
      label: 'Libellé',
      col: 'alert_title',
      size: '8',
      mob_size: '18',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
    },
    {
      name: 'desc',
      label: 'Description',
      col: 'alert_text',
      size: '13',
      mob_size: '18',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      last: true,
    },
    {
      name: 'done',
      label: 'Réalisée le',
      col: 'alert_done_ts',
      size: '4',
      mob_size: '18',
      sortable: true,
      filterable: { type: 'date' },
      title: true,
    },
    {
      name: 'priority',
      label: 'Priorité',
      col: 'alert_priority',
      size: '3',
      mob_size: '18',
      fDisplay: item => {
        return displayPriority(item);
      },
      sortable: true,
      filterable: { type: 'date' },
      title: false,
    },
  ];
};