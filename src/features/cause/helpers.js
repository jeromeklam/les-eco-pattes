import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
  Movement as MovementIcon,
  Document as DocumentIcon,
  Growth as GrowthIcon,
  Descendant as DescendantIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  Medical as MedicalIcon,
} from '../icons';
import { causeTypeAsOptions } from '../cause-type/functions';

export const sexSelect = [
  { label: 'Femelle', value: 'F', icon: <FemaleIcon /> },
  { label: 'Mâle', value: 'M', icon: <MaleIcon /> },
  { label: 'Indéfini', value: 'OTHER' },
];

export const getSexlabel = (p_code, p_icon = true) => {
  const found = sexSelect.find(elem => elem.value === p_code);
  if (found) {
    if (found.icon && p_icon) {
      return found.icon;
    }
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

export const getInlineActions = ({
  onListMovement,
  onListDocument,
  onListGrowth,
  onListDescendant,
  onListSickness,
  onGetOne,
  onDelOne,
  state,
}) => {
  return [
    {
      name: 'growth',
      label: 'Croissances',
      onClick: onListGrowth,
      param: 'object',
      theme: 'secondary',
      icon: <GrowthIcon color="white" />,
      role: 'OTHER',
      active: state.growthsCause > 0,
    },
    {
      name: 'move',
      label: 'Mouvements',
      onClick: onListMovement,
      param: 'object',
      theme: 'secondary',
      icon: <MovementIcon color="white" />,
      role: 'OTHER',
      active: state.movementsCause > 0,
    },
    {
      name: 'documents',
      label: 'Documents',
      onClick: onListDocument,
      param: 'object',
      theme: 'secondary',
      icon: <DocumentIcon color="white" />,
      role: 'DETAIL',
      active: state.documentsCause > 0,
    },
    {
      name: 'descendant',
      label: 'Descendance',
      onClick: onListDescendant,
      param: 'object',
      theme: 'secondary',
      icon: <DescendantIcon color="white" />,
      role: 'OTHER',
      active: state.descendantsCause > 0,
    },
    {
      name: 'medical',
      label: 'Maladies',
      onClick: onListSickness,
      param: 'object',
      theme: 'secondary',
      icon: <MedicalIcon color="white" />,
      role: 'OTHER',
      active: state.sicknessesCause > 0,
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
      selectable: true,
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
      title: true,
      sortable: true,
    },
    {
      name: 'site',
      label: 'Site',
      col: 'site.site_name',
      size: '10',
      mob_size: '36',
      title: true,
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
    {
      name: 'sep1',
      label: '',
      col: '',
      size: '12',
      mob_size: '0',
      title: false,
      sortable: false,
      filterable: false,
    },
    {
      name: 'color',
      label: '',
      col: 'cau_string_1',
      size: '6',
      mob_size: '18',
      title: false,
      sortable: false,
      filterable: false,
    },
    {
      name: 'sexe',
      label: '',
      col: 'cau_sex',
      size: '2',
      mob_size: '36',
      title: false,
      type: 'switch',
      values: sexSelect,
      sortable: false,
      filterable: false,
    },
    {
      name: 'year',
      label: 'Année',
      hidden: false,
      col: 'cau_year',
      size: '4',
      mob_size: '18',
      title: false,
      sortable: true,
      filterable: { type: 'text'},
    },
    {
      name: 'desc',
      label: '',
      col: 'cau_desc',
      size: '10',
      mob_size: '18',
      title: false,
      type: 'text',
      sortable: false,
      filterable: false,
    },
  ];
};
