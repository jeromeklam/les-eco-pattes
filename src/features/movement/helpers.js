import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
} from '../icons';

export const fromTypeSelect = [
  { label: 'Autre', value: 'OTHER' },
];

export const toTypeSelect = [
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
      name: 'move_tr_name',
      label: 'Transporteur',
      col: 'move_tr_name',
      size: '8',
      mob_size: '36',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'move_from',
      label: 'Départ',
      col: 'move_from',
      size: '12',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'datetime',
      filterable: { type: 'date' },
    },
    {
      name: 'move_to',
      label: 'Arrivée',
      col: 'move_to',
      size: '12',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'datetime',
      filterable: { type: 'date' },
    },
    {
      name: 'sep1',
      label: '',
      col: '',
      size: '12',
      mob_size: '0',
      title: false,
      sortable: false,
      filterable: false,
    },
    {
      name: 'move_from_name',
      label: '',
      col: 'move_from_name',
      size: '12',
      mob_size: '36',
      title: false,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'move_to_name',
      label: '',
      col: 'move_to_name',
      size: '12',
      mob_size: '36',
      title: false,
      sortable: true,
      filterable: { type: 'text' },
    },
  ];
};
