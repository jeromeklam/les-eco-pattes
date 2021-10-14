import React from 'react';
import {
  Follow as FollowIcon,
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  Bill as BillIcon,
  Document as DocumentIcon,
} from '../icons';
import { getLabel as getDataLabel } from '../data';
import { Deadline } from '../ui';
import { searchSite } from '../site';

export const getAmount = item => {
  let amount = 0;
  if (item) {
    amount = parseFloat(item.ct_install_amount) + parseFloat(item.ct_recur_amount);
  }
  return amount;
};

export const displayItemPicker = item => {
  if (item && item.id) {
    return (
      <>
        <span>
          {item.ct_code}
        </span>
      </>
    );
  }
  return null;
};

export const getPickerDisplay = item => {
  if (item && item.id) {
    return (
      <>
        <span>
          {item.ct_code}
        </span>
      </>
    );
  }
  return null;
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
      icon: <FollowIcon />,
      role: 'OTHER',
      active: state.mode === 'alert',
    },
    {
      name: 'bill',
      label: 'Factures',
      onClick: obj => {
        onSelectList(obj, 'bill');
      },
      param: 'object',
      theme: 'secondary',
      icon: <BillIcon />,
      role: 'OTHER',
      disabled: true,
    },
    {
      name: 'document',
      label: '3',
      onClick: (obj) => {onSelectList(obj, 'document');},
      param: 'object',
      theme: 'secondary',
      icon: <DocumentIcon />,
      role: 'OTHER',
      active: state.documents > 0,
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
      size: '4',
      mob_size: '36',
      title: true,
      sortable: true,
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
      size: '2',
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
      name: 'ct_amount',
      label: 'Montant',
      col: 'ct_amount',
      size: '3',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'monetary',
      fContent: (item) => {
        return getAmount(item);
      },
      filterable: { type: 'text' },
    },
    {
      name: 'ct_next_bill',
      label: 'Date prochaine facturation',
      col: 'ct_next_bill',
      size: '6',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'date',
      fDisplay: item => {
        return <Deadline deadline={item.ct_next_bill} bold={true} />;
      },
      filterable: { type: 'date' },
    },
    {
      name: 'ct_to',
      label: 'Date fin',
      col: 'ct_to',
      size: '4',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
      card: { role: 'FIELD' },
    },
  ];
};
