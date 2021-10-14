import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  Cause as CauseIcon,
  Valid as ValidIcon,
} from '../icons';
import { searchSite } from '../site';

export const mvtFromType = [
  { label: 'Autre', value: 'OTHER' },
  { label: 'Interne', value: 'INTERNAL' },
  { label: 'Op Commerciaux', value: 'COMMERCIAL' },
  { label: 'Centre rassemblement', value: 'ASSEMBLY' },
  { label: 'Marché', value: 'MARKET' },
];

export const mvtToType = [
  { label: 'Autre', value: 'OTHER' },
  { label: 'Interne', value: 'INTERNAL' },
  { label: 'Op Commerciaux', value: 'COMMERCIAL' },
  { label: 'Centre rassemblement', value: 'ASSEMBLY' },
  { label: 'Marché', value: 'MARKET' },
  { label: 'Abattoir', value: 'SLAUGHTERHOUSE' },
  { label: 'Particulier', value: 'PRIVATE' },
];

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

export const getTypeLabel = p_type => {
  const found = mvtTypes.find(elem => elem.value === p_type);
  if (found) {
    return found.label;
  }
  return '';
};

export const getActionsButtons = ({ onValid, state }) => {
  return [
    {
      theme: 'primary',
      function: () => onValid(state.move_id),
      icon: <ValidIcon />,
    },
  ];
};

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
  onValid,
  state,
}) => {
  return [
    {
      name: 'cause',
      label: 'Animaux',
      onClick: obj => {
        onSelectList(obj, 'cause');
      },
      param: 'object',
      theme: 'secondary',
      icon: <CauseIcon />,
      role: 'OTHER',
      active: state.mode === 'cause',
    },
    {
      name: 'valid',
      label: 'Validation',
      onClick: obj => {
        onValid(obj.id);
      },
      param: 'object',
      theme: 'primary',
      icon: <ValidIcon />,
      role: 'ACTION',
      fShow: item => {
        if (item && item.move_status === 'WAIT') {
          return true;
        } else {
          return false;
        }
      },
      confirm: "Confirmez-vous la validation du mouvement ?",
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
      card: { role: 'FIELD' },
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
      card: { role: 'TITLE' },
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
      card: { role: 'FIELD' },
    },
    {
      name: 'move_from_name2',
      label: 'Site départ (sélecteur)',
      col: 'from_site.id',
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
      card: { role: 'FIELD' },
    },
    {
      name: 'move_to_name2',
      label: 'Site arrivée (sélecteur)',
      col: 'to_site.id',
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
