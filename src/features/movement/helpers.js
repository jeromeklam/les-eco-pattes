import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
  Movement as MovementIcon,
} from '../icons';

export const mvtFromType = [
  { label: 'Autre', value: 'OTHER' },
  { label: 'Interne', value: 'INTERNAL' },
  { label: 'Op Commerciaux', value: 'COMMERCIAL' },
  { label: 'Centre rassemblement', value: 'ASSEMBLY' },
  { label: 'Marché', value: 'MARKET' },
]

export const mvtToType = [
  { label: 'Autre', value: 'OTHER' },
  { label: 'Interne', value: 'INTERNAL' },
  { label: 'Op Commerciaux', value: 'COMMERCIAL' },
  { label: 'Centre rassemblement', value: 'ASSEMBLY' },
  { label: 'Marché', value: 'MARKET' },
  { label: 'Abattoir', value: 'SLAUGHTERHOUSE' },
  { label: 'Particulier', value: 'PRIVATE' },
]

export const mvtStatus = [
  { label: 'Validé', value: 'OK' },
  { label: 'Annulé', value: 'KO' },
  { label: 'En cours', value: 'WAIT' },
];

export const mvtTypes = [
  { label: 'Mouvement interne sans notification', value: 'SIMPLE' },
  { label: 'Mouvement interne avec notification', value: 'TRANSFER' },
  { label: 'Entrée', value: 'INPUT' },
  { label: 'Sortie', value: 'OUTPUT' },
  { label: 'Autre', value: 'OTHER' },
];

export const getTypeLabel = (p_type) => {
  const found = mvtTypes.find(elem => elem.value === p_type);
  if (found) {
    return found.label;
  }
  return '';
}

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
  onSelectList,
  onListCause,
  onGetOne,
  onDelOne,
  state,
}) => {
  return [
    {
      name: 'move',
      label: 'Mouvements',
      onClick: (obj) => {onSelectList(obj, 'movement');},
      param: 'object',
      theme: 'secondary',
      icon: <MovementIcon color="white" />,
      role: 'OTHER',
      active: state.mode === 'movement',
    },
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
      hidden: true,
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
      first: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'move_from',
      label: 'Départ',
      col: 'move_from',
      size: '10',
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
      size: '10',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'datetime',
      filterable: { type: 'date' },
    },
    {
      name: 'status',
      label: 'Statut',
      col: 'move_status',
      size: '4',
      mob_size: '36',
      title: true,
      sortable: true,
      first: true,
      type: 'switch',
      values: mvtStatus,
      filterable: { type: 'select', options: mvtStatus },
    },
    {
      name: 'sep1',
      label: '',
      col: 'move_type',
      size: '12',
      mob_size: '0',
      first: true,
      title: false,
      type: 'switch',
      values: mvtTypes,
      sortable: true,
      filterable: { type: 'select', options: mvtTypes },
    },
    {
      name: 'move_from_name',
      label: '',
      col: 'move_from_name',
      size: '10',
      mob_size: '36',
      title: false,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'move_to_name',
      label: '',
      col: 'move_to_name',
      size: '10',
      mob_size: '36',
      title: false,
      sortable: true,
      filterable: { type: 'text' },
    },
  ];
};
