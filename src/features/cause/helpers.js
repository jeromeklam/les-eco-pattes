import React from 'react';
import classnames from 'classnames';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  Movement as MovementIcon,
  Document as DocumentIcon,
  Growth as GrowthIcon,
  Descendant as DescendantIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  Medical as MedicalIcon,
  Photo as PhotoIcon,
  Wait as WaitIcon,
} from '../icons';
import { causeTypeAsOptions } from '../cause-type/functions';
import { searchSite } from '../site';

export const sexSelect = [
  { label: 'Femelle', value: 'F', icon: <FemaleIcon className="col-icon" /> },
  { label: 'Mâle', value: 'M', icon: <MaleIcon className="col-icon" />  },
  { label: 'Mâle castré', value: 'C', icon: <MaleIcon className="col-icon" />  },
  { label: 'Indéfini', value: 'OTHER' },
];

export const waitingSelect = [
  { value: true, label: 'En attente', icon: <WaitIcon className="col-icon"/> },
  { value: false, label: '' },
];

export const getSexlabel = (p_code, p_icon = true, p_className = "" ) => {
  const found = sexSelect.find(elem => elem.value === p_code);
  if (found) {
    if (p_icon) {
      if (p_className) {
        if (found.value === "F") {
          return <FemaleIcon className={classnames(p_className)} /> 
        } else if (found.value === "M") {
          return <MaleIcon className={classnames(p_className)} /> 
        }
      } else if (found.icon) {
         return found.icon;
      }
    }  
    return found.label;
  }
  return '';
}

const getComm = (item, content) => {
  if (item.cau_to === '' || item.cau_to === null) {
    return content;
  } else {
    return item.cau_string_3;
  }
}

export const getSelectActions = ({ props, onSelectMenu }) => {
  const arrOne = [
    {
      name: 'selectAll',
      label: 'Tout sélectionner',
      onClick: () => {onSelectMenu('selectAll');}
    }
  ];
  const arrAppend = [
    {
      name: 'selectNone',
      label: 'Tout désélectionner',
      onClick: () => {onSelectMenu('selectNone');}
    },
    {
      name: 'divider',
    },
    {
      name: 'SIMPLE',
      label: 'Mvt interne sans notification',
      onClick: () => {onSelectMenu('SIMPLE');}
    },
    {
      name: 'TRANSFER',
      label: 'Mvt interne avec notification',
      onClick: () => {onSelectMenu('TRANSFER');}
    },
    {
      name: 'INPUT',
      label: 'Entrée notification',
      onClick: () => {onSelectMenu('INPUT');}
    },
    {
      name: 'OUTPUT',
      label: 'Sortie avec notification',
      onClick: () => {onSelectMenu('OUTPUT');}
    },
    {
      name: 'divider',
    },
    {

    },
  ];
  if (props.cause.selected.length > 0) {
    return arrOne.concat(arrAppend);
  }
  return arrOne;
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
  onGetOne,
  onDelOne,
  state,
}) => {
  return [
    {
      name: 'movement',
      label: 'Mouvements',
      onClick: (obj) => {onSelectList(obj, 'movement');},
      param: 'object',
      theme: 'secondary',
      icon: <MovementIcon color="white" />,
      role: 'OTHER',
      active: state.mode === 'movement',
    },
    {
      name: 'sickness',
      label: 'Santé',
      onClick: (obj) => {onSelectList(obj, 'sickness');},
      param: 'object',
      theme: 'secondary',
      icon: <MedicalIcon color="white" />,
      role: 'OTHER',
      active: state.mode === 'sickness',
    },
    {
      name: 'growth',
      label: 'Croissances',
      onClick: (obj) => {onSelectList(obj, 'growth');},
      param: 'object',
      theme: 'secondary',
      icon: <GrowthIcon color="white" />,
      role: 'OTHER',
      active: state.mode === 'growth',
    },
    {
      name: 'descendant',
      label: 'Descendance',
      onClick: (obj) => {onSelectList(obj, 'descendant');},
      param: 'object',
      theme: 'secondary',
      icon: <DescendantIcon color="white" />,
      role: 'OTHER',
      active: state.mode === 'descendant',
    },
    {
      name: 'document',
      label: 'Documents',
      onClick: (obj) => {onSelectList(obj, 'document');},
      param: 'object',
      theme: 'secondary',
      icon: <DocumentIcon color="white" />,
      role: 'DETAIL',
      active: state.mode === 'document',
    },
    {
      name: 'photo',
      label: 'Photos',
      onClick: (obj) => {onSelectList(obj, 'photo');},
      param: 'object',
      theme: 'secondary',
      icon: <PhotoIcon color="white" />,
      role: 'DETAIL',
      active: state.mode === 'photo',
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
      name: 'num',
      label: 'N° boucle',
      col: 'cau_code',
      size: '6',
      mob_size: '26',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      selectable: true,
      first: true,
      card: { role: 'TITLE' },
    },
    {
      name: 'type',
      label: 'Race',
      col: 'cause_type.caut_name',
      size: '12',
      mob_size: '36',
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
    },
    {
      name: 'site',
      label: 'Site',
      col: 'site.site_name',
      size: '7',
      mob_size: '36',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      card: { role: 'FIELD' },
    },
    {
      name: 'site2',
      label: 'Site (sélecteur)',
      col: 'site.id',
      hidden: true,
      filterable: { type: 'picker', display: 'site_name', onSearch: searchSite },
    },
    {
      name: 'waiting',
      label: 'En Attente',
      col: 'cau_waiting',
      size: '5',
      mob_size: '36',
      title: true,
      sortable: true,
      type: 'bool',
      values: waitingSelect,
      filterable: { type: 'bool' },
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
      name: 'sep1',
      label: '',
      col: '',
      size: '6',
      mob_size: '0',
      title: false,
      sortable: false,
      filterable: false,
    },
    {
      name: 'sep2',
      label: '',
      col: '',
      size: '1',
      mob_size: '0',
      title: false,
      sortable: false,
      filterable: false,
    },

    {
      name: 'name',
      label: 'Nom',
      col: 'cau_name',
      size: '5',
      mob_size: '10',
      title: false,      
      filterable: { type: 'text' },      
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
      card: { role: 'FIELD' },
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
      type: 'html',
      fDisplay: getComm,
      last: false,
      sortable: false,
      filterable: false,
    },
    {
      name: 'cau_to',
      label: 'Date de sortie',
      col: 'cau_to',
      size: '10',
      mob_size: '36',
      hidden: true,
      sortable: false,
      filterable: { type: 'date' },
    },
    {
      name: 'cau_string_3',
      label: 'Motif de sortie',
      col: 'cau_string_3',
      size: '',
      mob_size: '',
      hidden: true,
      sortable: false,
      filterable: { type: 'text' },
    },
  ];
};
