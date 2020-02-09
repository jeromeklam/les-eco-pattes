import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
  Movement as MovementIcon,
  Document as DocumentIcon,
} from '../icons';
import { causeTypeAsOptions } from '../cause-type/functions';

export const sexSelect = [
  { label: 'Femelle', value: 'F' },
  { label: 'Mâle', value: 'M' },
  { label: 'Indéfini', value: 'OTHER' },
];

export const getGlobalActions = ({ onClearFilters, onCreate }) => {
  return [
    {
      name: 'clear',
      label: 'Effacer',
      onClick: onClearFilters,
      theme: 'secondary',
      icon: <FilterClearIcon color="white" />,
      role: 'OTHER',
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

export const getInlineActions = ({ onListMovement, onListDocument, onGetOne, onDelOne }) => {
  return [
    {
      name: 'move',
      label: 'Mouvements',
      onClick: onListMovement,
      param: 'object',
      theme: 'secondary',
      icon: <MovementIcon color="white" />,
      role: 'OTHER',
    },
    {
      name: 'documents',
      label: 'Documents',
      onClick: onListDocument,
      param: 'object',
      theme: 'secondary',
      icon: <DocumentIcon color="white" />,
      role: 'DETAIL',
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
      size: '6',
      mob_size: '10',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'name',
      label: 'N° boucle',
      col: 'cau_code',
      size: '6',
      mob_size: '26',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'type',
      label: 'Race',
      col: 'cause_type.caut_name',
      size: '12',
      mob_size: '36',
      title: false,
      sortable: true,
    },
    {
      name: 'site',
      label: 'Site',
      col: 'site.site_name',
      size: '10',
      mob_size: '36',
      title: false,
      sortable: true,
    },
    {
      name: 'type',
      label: 'Type',
      col: 'cause_type.caut_id',
      size: '0',
      mob_size: '0',
      hidden: true,
      filterable: {
        type: 'select',
        options: causeTypeAsOptions(props.causeType.items),
      },
    },
    {
      name: 'site',
      label: 'Site',
      col: 'site.site_name',
      size: '0',
      mob_size: '0',
      hidden: true,
      filterable: {
        type: 'text',
      },
    },
  ];
};
