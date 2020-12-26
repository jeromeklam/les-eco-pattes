import React from 'react';
import {
  Follow as FollowIcon,
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
} from '../icons';
import { getLabel as getDataLabel } from '../data';
import { searchSite } from '../site';

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

export const getInlineActions = ({ onSelectList, onGetOne, onDelOne, state }) => {
  return [
    {
      name: 'alert',
      label: 'Suivi',
      onClick: obj => {
        onSelectList(obj, 'alert');
      },
      param: 'object',
      theme: 'secondary',
      icon: <FollowIcon color="white" />,
      role: 'DETAIL',
      active: state.mode === 'alert',
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
      card: { role: 'TITLE' },
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
      card: { role: 'FIELD' },
    },
    {
      name: 'ct_to',
      label: 'Date fin',
      col: 'ct_to',
      size: '0',
      mob_size: '0',
      title: false,
      sortable: false,
      hidden: true,
      type: 'date',
      filterable: { type: 'date' },
      card: { role: 'FIELD' },
    },
    {
      name: 'site.site_name',
      label: 'Site',
      col: 'site.site_name',
      size: '10',
      mob_size: '36',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      card: { role: 'FIELD' },
    },
    {
      name: 'site.site_name2',
      label: 'Site (sélecteur)',
      col: 'site.id',
      hidden: true,
      filterable: { type: 'picker', display: 'site_name', onSearch: searchSite },
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
      fDisplay: (item, newContent) => {
        return getDataLabel(props.data.models, 'DUREECONTRAT', item.ct_duration);
      },
      card: { role: 'FIELD' },
    },
    {
      name: 'ct_next_bill',
      label: 'Date facturation',
      col: 'ct_next_bill',
      size: '5',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
    },
  ];
};
