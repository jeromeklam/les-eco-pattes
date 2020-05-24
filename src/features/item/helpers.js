import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
} from '../icons';

export const stockSelect = [
  { label: 'Stocké', value: 'STOCK' },
  { label: 'Non stocké', value: 'NONE' },
];

export const typeSelect = [
  { label: 'Médicament', value: 'DRUG' },
  { label: 'Autre', value: 'OTHER' },
];

export const getGlobalActions = ({ onClearFilters, onCreate, onCreateOneItem }) => {
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
      onClick: onCreateOneItem || onCreate,
      theme: 'primary',
      icon: <AddOneIcon color="white" />,
      role: 'CREATE',
    },
  ];
};

export const getInlineActions = ({
  onGetOneItem,
  onGetOne,
  onDelOneItem,
  onDelOne,
}) => {
  return [
    {
      name: 'modify',
      label: 'Modifier',
      onClick: onGetOneItem || onGetOne,
      theme: 'secondary',
      icon: <GetOneIcon color="white" />,
      role: 'MODIFY',
    },
    {
      name: 'delete',
      label: 'Supprimer',
      onClick: onDelOneItem || onDelOne,
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
      size: '6',
      mob_size: '36',
      title: true,
      sortable: true,
      first: true,
      filterable: { type: 'text' },
    },
    {
      name: 'item_name',
      label: 'Nom',
      col: 'item_name',
      size: '10',
      mob_size: '36',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'item_code',
      label: 'Code',
      col: 'item_code',
      size: '6',
      mob_size: '36',
      title: false,
      sortable: true,
      filterable: { type: 'text' },
    },
  ];
};
