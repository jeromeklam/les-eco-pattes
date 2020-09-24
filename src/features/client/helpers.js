import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
} from '../icons';
import { clientCategoryAsOptions } from '../client-category';
import { clientTypeAsOptions } from '../client-type';

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
    },
    {
      name: 'lastname',
      label: 'Nom',
      col: 'cli_lastname',
      size: '6',
      mob_size: '18',
      sortable: true,
      filterable: { type: 'text' },
      first: true,
      title: true,
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
    },
    {
      name: 'adress',
      label: 'Adresse',
      col: 'cli_address1',
      size: '7',
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
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
    },
    {
      name: 'type',
      label: 'Type',
      col: 'client_type.clit_name',
      size: '3',
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
      size: '3',
      mob_size: '0',
      sortable: true,
      filterable: {
        col: 'client_categery.clic_id',
        type: 'select',
        options: clientCategoryAsOptions(props.clientCategory.items),
      },
      title: true,
      hidden: false,
    },
  ];
};
