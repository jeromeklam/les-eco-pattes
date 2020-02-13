import React from 'react';
import {
  AddOne as AddOneIcon,
  Cause as CauseIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
} from '../icons';

export const sicknessTypeSelect = [
  { label: 'Autre', value: 'OTHER' },
];

export const getGlobalActions = ({ onClearFilters, onCreate }) => {
  return [
    {
      name: 'clear',
      label: 'Effacer',
      onClick: onClearFilters,
      theme: 'secondary',
      icon: <FilterClearIcon color="white" />,
    },
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

export const getInlineActions = ({
  onListCause,
  onGetOne,
  onDelOne,
  state,
}) => {
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
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'sick_name',
      label: 'Nom',
      col: 'sick_name',
      size: '7',
      mob_size: '36',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'sick_type',
      label: 'Type',
      col: 'sick_type',
      size: '7',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'switch',
      values: sicknessTypeSelect,
      filterable: { type: 'select', options: sicknessTypeSelect },
    },
    {
      name: 'sick_spread',
      label: 'Contagieux',
      col: 'sick_spread',
      size: '7',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'bool',
      filterable: { type: 'text' },
    },
  ];
};
