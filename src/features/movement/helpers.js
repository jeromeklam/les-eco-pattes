import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  Movement as MovementIcon,
} from '../icons';
import { searchSite } from '../site';

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
  { label: 'Archivé', value: 'ARCHIVE' },
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
      name: 'type',
      label: 'Type',
      col: 'move_type',
      size: '9',
      mob_size: '0',
      title: true,
      first: true,
      type: 'switch',
      values: mvtTypes,
      sortable: true,
      filterable: { type: 'select', options: mvtTypes },
    },
    {
      name: 'move_from',
      label: 'Date départ',
      col: 'move_from',
      size: '4',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
    },
    {
      name: 'move_from_name',
      label: 'Site départ',
      col: 'from_site.site_name',
      size: '6',
      mob_size: '36',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'move_from_name2',
      label: 'Site départ (sélecteur)',
      col: 'from_site.id',
      size: '6',
      mob_size: '36',
      hidden: true,
      filterable: { type: 'picker', display: 'site_name', onSearch: searchSite },
    },
    {
      name: 'move_to',
      label: 'Date arrivée',
      col: 'move_to',
      size: '4',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
    },
    {
      name: 'move_to_name',
      label: 'Site arrivée',
      col: 'to_site.site_name',
      size: '6',
      mob_size: '36',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'move_to_name2',
      label: 'Site arrivée (sélecteur)',
      col: 'to_site.id',
      size: '6',
      mob_size: '36',
      hidden: true,
      filterable: { type: 'picker', display: 'site_name', onSearch: searchSite },
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
  ];
};
