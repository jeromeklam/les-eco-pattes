import React from 'react';
import { AddOne as AddOneIcon, GetOne as GetOneIcon, DelOne as DelOneIcon } from '../icons';
import { clientCategoryAsOptions } from '../client-category';
import { clientTypeAsOptions } from '../client-type';
import { getFullName, searchClient as searchParentClient } from './';

export const getSelectActions = ({ props, onSelectMenu, onPrint }) => {
  let arrOne = [
    {
      name: 'selectAll',
      label: 'Tout sélectionner',
      onClick: () => {
        onSelectMenu('selectAll');
      },
    },
  ];
  const arrAppend = [
    {
      name: 'selectNone',
      label: 'Tout désélectionner',
      onClick: () => {
        onSelectMenu('selectNone');
      },
    },
    {
      name: 'divider',
    },
    {
      name: 'exportSelect',
      label: 'Exporter la sélection',
      onClick: () => {
        onSelectMenu('exportSelection');
      },
    },
  ];
  if (props.client.selected.length > 0) {
    arrOne = arrOne.concat(arrAppend);
  }
  const arrStandard = [
    {
      name: 'divider',
    },
    {
      name: 'exportAll',
      label: 'Tout exporter',
      onClick: () => {
        onSelectMenu('exportAll');
      },
    },
  ];
  arrOne = arrOne.concat(arrStandard);
  return arrOne;
};

export const displayItemPicker = item => {
  if (item && item.id) {
    return (
      <>
        <span>
          {item.cli_lastname} {item.cli_firstname}
        </span>
        <br />
        <span>
          {item.cli_cp} {item.cli_town}
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
          {item.cli_lastname} {item.cli_firstname}
        </span>
        <br />
        <span>
          {item.cli_cp} {item.cli_town}
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
      filterable: false,
      title: true,
      first: true,
      hidden: true,
      card: { role: 'ID'},
    },
    {
      name: 'lastname',
      label: 'Nom',
      col: 'cli_lastname',
      fDisplay: item => {
        return getFullName(item);
      },
      size: '7',
      mob_size: '18',
      sortable: true,
      filterable: { type: 'text' },
      selectable: true,
      first: true,
      title: true,
      card: { role: 'TITLE'},
    },
    {
      name: 'firstname',
      label: 'Prénom',
      col: 'cli_firstname',
      size: '6',
      mob_size: '18',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      hidden: true,
    },
    {
      name: 'parent_client',
      label: 'Attaché à',
      col: 'parent_client.lastname',
      fDisplay: item => {
        return getFullName(item.parent_client);
      },
      size: '7',
      mob_size: '18',
      title: true,
      sortable: true,
      filterable: {
        type: 'text',
      },
    },
    {
      name: 'parent_client2',
      label: 'Attaché à (sélecteur)',
      col: 'parent_client.id',
      hidden: true,
      filterable: {
        type: 'picker',
        display: item => {
          return getFullName(item);
        },
        onSearch: searchParentClient,
      },
    },
    {
      name: 'adress',
      label: 'Adresse',
      col: 'cli_address1',
      size: '7',
      mob_size: '36',
      sortable: true,
      hidden: false,
      filterable: { type: 'text' },
      title: true,
      card: { role: 'FIELD', position: 10 },
    },
    {
      name: 'town',
      label: 'Ville',
      col: 'cli_town',
      size: '5',
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      card: { role: 'FIELD', position: 20 },
    },
    {
      name: 'email',
      label: 'Email',
      col: 'cli_email',
      size: '0',
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      title: false,
      hidden: true,
      last: true,
      card: { role: 'FIELD', position: 30 },
    },
    {
      name: 'type',
      label: 'Type',
      col: 'client_type.clit_name',
      size: '4',
      mob_size: '0',
      sortable: true,
      filterable: {
        col: 'client_type.clit_id',
        type: 'select',
        options: clientTypeAsOptions(props.clientType.items),
      },
      title: true,
      hidden: false,
    },
    {
      name: 'category',
      label: 'Catégorie',
      col: 'client_category.clic_name',
      size: '5',
      mob_size: '0',
      sortable: true,
      filterable: {
        col: 'client_category.clic_id',
        type: 'select',
        options: clientCategoryAsOptions(props.clientCategory.items),
      },
      title: true,
      hidden: false,
    },
  ];
};
