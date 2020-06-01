import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
} from '../icons';

export const mvtTypes = [
  { label: 'Mouvement interne sans notification', value: 'SIMPLE' },
  { label: 'Mouvement interne avec notification', value: 'TRANSFERT' },
  { label: 'Entrée', value: 'INPUT' },
  { label: 'Sortie', value: 'OUTPUT' },
  { label: 'Autre', value: 'OTHER' },
];

export const mvtModes = [
  { mode: 'outputMvt', type: 'OUTPUT' },
  { mode: 'inputMvt', type: 'INPUT' },
  { mode: 'internalMvt', type: 'SIMPLE' },
  { mode: 'mvtWithNotif', type: 'TRANSFERT' },
  { mode: 'mvtWithoutNotif', type: 'SIMPLE' },
];

export const getTypeMvt = (p_mode) => {
  const found = mvtModes.find(elem => elem.mode === p_mode);
  if (found) {
    return found.type;
  }
  return '';
}

export const getTypeLabel = (p_type) => {
  const found = mvtTypes.find(elem => elem.value === p_type);
  if (found) {
    return found.label;
  }
  return '';
}

export const getModeLabel = (p_mode) => {
  const typeMvt = getTypeMvt(p_mode)
  let labelMode = ''
  if (typeMvt !== "") {
    labelMode = getTypeLabel(typeMvt); 
  }
  return labelMode;
}

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
      first: true,
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
