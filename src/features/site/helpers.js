import React from 'react';
import {
  AddOne as AddOneIcon,
  Cause as CauseIcon,
  Follow as FollowIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  Photo as PhotoIcon,
  Document as DocumentIcon,
  MapPose as ZoomMapIcon,
  SiteExtern as SiteExternIcon,
  Print as PrintIcon,
} from '../icons';
import { siteTypeAsOptions } from '../site-type/functions';
import { searchSite } from './';

const townCol = item => {
  let cpTown = '';
  if (item.site_cp) {
    cpTown = item.site_cp + ' ';
  }
  if (item.site_town) {
    cpTown = cpTown + item.site_town;
  }
  return cpTown;
};

const externCol = [
  { value: true, label: 'Externe', icon: <SiteExternIcon className="col-icon" /> },
  { value: false, label: '' },
];

export const getSelectActions = ({ props, onSelectMenu, onPrint }) => {
  const arrOne = [
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
      name: 'print',
      label: 'Imprimer',
      onClick: () => {
        onPrint();
      },
    },
  ];
  if (props.site.selected.length > 0) {
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
  onZoomMap,
  onGetOne,
  onDelOne,
  onPrint,
  state,
}) => {
  const { editions } = state;
  let myEditions = [];
  editions.forEach(edition => {
    myEditions.push({ label: edition.edi_name, onClick: item => onPrint(edition.id, item) });
  });
  return [
    {
      name: 'animal',
      label: 'Animaux',
      onClick: obj => {
        onSelectList(obj, 'animal');
      },
      param: 'object',
      theme: 'secondary',
      icon: <CauseIcon color="white" />,
      role: 'DETAIL',
      active: state.animalsSite > 0,
    },
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
      active: state.alertsSite > 0,
    },
    {
      name: 'document',
      label: 'Documents',
      onClick: obj => {
        onSelectList(obj, 'document');
      },
      param: 'object',
      theme: 'secondary',
      icon: <DocumentIcon color="white" />,
      role: 'DETAIL',
      active: state.documentsSite > 0,
    },
    {
      name: 'photo',
      label: 'Photos',
      onClick: obj => {
        onSelectList(obj, 'photo');
      },
      param: 'object',
      theme: 'secondary',
      icon: <PhotoIcon color="white" />,
      role: 'DETAIL',
      active: state.photosSite > 0,
    },
    {
      name: 'map',
      label: 'Carte',
      onClick: onZoomMap,
      param: 'object',
      theme: 'secondary',
      icon: <ZoomMapIcon color="white" />,
      role: 'DETAIL',
    },
    {
      name: 'printOne',
      label: 'Imprimer',
      onClick: onPrint,
      theme: 'secondary',
      icon: <PrintIcon color="white" />,
      role: 'PRINT',
      active: myEditions.length > 0,
      options: myEditions,
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
      size: '0',
      mob_size: '0',
      hidden: true,
    },
    {
      name: 'site_name',
      label: 'Nom site',
      col: 'site_name',
      size: '5',
      mob_size: '36',
      title: true,
      sortable: true,
      selectable: true,
      filterable: { type: 'text' },
      first: true,
      card: { role: 'TITLE' },
    },
    {
      name: 'site_address1',
      label: 'Adresse',
      col: 'site_address1',
      size: '8',
      mob_size: '36',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'site_code',
      label: 'N° EDE',
      col: 'site_code',
      size: '4',
      mob_size: '10',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      card: { role: 'FIELD' },
    },
    {
      name: 'type',
      label: 'Type',
      col: 'site_type.sitt_name',
      size: '5',
      mob_size: '36',
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
    },
    {
      name: 'type',
      label: 'Type',
      col: 'site_type.sitt_id',
      size: '0',
      mob_size: '0',
      hidden: true,
      filterable: {
        type: 'select',
        options: siteTypeAsOptions(props.siteType.items),
      },
    },
    {
      name: 'parent_site',
      label: 'Site principal',
      col: 'parent_site.site_name',
      size: '6',
      mob_size: '26',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'parent_site2',
      label: 'Site principal (sélecteur)',
      col: 'parent_site.id',
      hidden: true,
      filterable: { type: 'picker', display: 'site_name', onSearch: searchSite },
    },
    {
      name: 'site_count_cause',
      label: 'Animaux',
      col: 'site_count_cause',
      size: '4',
      mob_size: 10,
      title: true,
      sortable: true,
      filterable: false,
    },
    {
      name: 'sep2',
      label: '',
      col: '',
      size: '5',
      mob_size: '0',
      title: true,
      sortable: false,
      filterable: false,
    },
    {
      name: 'site_town',
      label: '',
      col: 'site_town',
      size: '8',
      mob_size: '36',
      title: false,
      sortable: false,
      filterable: false,
      last: true,
      fDisplay: townCol,
      card: { role: 'FIELD' },
    },
    {
      name: 'site_to',
      label: 'Fin de validité',
      col: 'site_to',
      size: '8',
      mob_size: '36',
      hidden: true,
      sortable: false,
      filterable: { type: 'date' },
    },
    {
      name: 'sep3',
      label: '',
      col: '',
      size: '14',
      mob_size: '0',
      title: true,
      sortable: false,
      filterable: false,
    },
    {
      name: 'site_extern',
      label: 'Externe',
      col: 'site_extern',
      size: '1',
      mob_size: '1',
      title: false,
      sortable: false,
      type: 'bool',
      values: externCol,
      filterable: { type: 'bool' },
    },
  ];
};
