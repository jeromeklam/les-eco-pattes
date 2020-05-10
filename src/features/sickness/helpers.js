import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
} from '../icons';

export const sicknessTypeSelect = [
  { label: 'Autre', value: 'OTHER' },
  { label: 'Déclaration Obligatoire', value: 'MDO' },
  { label: 'Réputée Contagieuse', value: 'MRC' },
  { label: 'Blessure', value: 'B' },
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
      name: 'sick_name',
      label: 'Nom',
      col: 'sick_name',
      size: '12',
      mob_size: '36',
      title: true,
      first: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'sick_type',
      label: 'Type',
      col: 'sick_type',
      size: '10',
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
      size: '4',
      mob_size: '36',
      title: true,
      last: true,
      sortable: true,
      type: 'bool',
      filterable: { type: 'text' },
    },
  ];
};
