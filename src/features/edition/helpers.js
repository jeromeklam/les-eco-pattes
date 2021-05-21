import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
} from '../icons';
import { getEditionObjectNames } from './';

export const getGlobalActions = ({ props, onCreate }) => {
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

export const getInlineActions = ({ props, onGetOne, onDelOne }) => {
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
      name: 'name',
      label: 'Nom',
      col: 'edi_name',
      size: '10',
      mob_size: '',
      title: true,
      sortable: true,
      first: true,
    },
    {
      name: 'object',
      label: 'Objet',
      col: 'edi_object_name',
      size: '10',
      mob_size: '',
      title: true,
      sortable: true,
      last: true,
      type: 'switch',
      values: getEditionObjectNames(props.intl),
    },
  ];
};
