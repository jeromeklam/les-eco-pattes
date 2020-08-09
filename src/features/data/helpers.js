 import React from 'react';
import {
  //AddOne as AddOneIcon,
  GetOne as GetOneIcon,
} from '../icons';
import { dataTypes } from './';

export const getGlobalActions = ({ onCreate }) => { 
  return [
    /*{
      Création seulement en mode administrateur
      name: 'create',
      label: 'Ajouter',
      onClick: onCreate,
      theme: 'primary',
      icon: <AddOneIcon color="white" />,
      role: 'CREATE',
    },
    */
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
  ];
};

export const getCols = ({ props }) => {
  return [
    {
      name: 'data_name',
      label: 'Nom',
      col: 'data_name',
      size: '10',
      mob_size: '36',
      title: true,
      sortable: true,
      first: true,
      filterable: { type: 'text' },
    },
    {
      name: 'type',
      label: 'Type',
      size: '10',
      col: 'data_type',
      title: true,
      last: true,
      type: 'switch',
      values: dataTypes(),
    },
  ];
};
