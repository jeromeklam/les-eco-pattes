import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
} from '../icons';
import { getLabel as getDataLabel } from '../data';

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
      first: true,
      hidden: true,
    },
    {
      name: 'code',
      label: 'Numéro',
      col: 'ct_code',
      size: '4',
      mob_size: '18',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      first: true,
    },
    {
      name: 'ct_from',
      label: 'Date début',
      col: 'ct_from',
      size: '5',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
    },
    {
      name: 'site.site_name',
      label: 'Site',
      col: 'site.site_name',
      size: '6',
      mob_size: '36',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'duration',
      label: 'Durée',
      col: 'ct_duration',
      size: '6',
      mob_size: '18',
      title: true,
      sortable: false,
      filterable: false,
      fDisplay: (item, newContent) => {return getDataLabel(props.data.models, "DUREECONTRAT", item.ct_duration)},
    },
  ];
};
