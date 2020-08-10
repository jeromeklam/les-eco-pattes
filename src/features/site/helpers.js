import React from 'react';
import {
  AddOne as AddOneIcon,
  Cause as CauseIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  Photo as PhotoIcon,
  Document as DocumentIcon,
  MapPose as ZoomMapIcon,
  FilterClear as FilterClearIcon,
  SiteExtern as SiteExternIcon,
} from '../icons';
import { siteTypeAsOptions } from '../site-type/functions';

const townCol = (item) => {
  let cpTown = '';
  if (item.site_cp) {
    cpTown = item.site_cp + " "
  }
  if (item.site_town) {
    cpTown = cpTown + item.site_town
  }
  return cpTown;
}

const externCol = [
  { value: true, label: 'Externe', icon: <SiteExternIcon className="col-icon"/> },
  { value: false, label: '' },
];


export const getGlobalActions = ({ onClearFilters, onCreate }) => {
  return [
    {
      name: 'clear',
      label: 'Effacer',
      onClick: onClearFilters,
      theme: 'secondary',
      icon: <FilterClearIcon color="white" />,
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
  onListCause,
  onListDocument,
  onListPhoto,
  onZoomMap,
  onGetOne,
  onDelOne,
  state,
}) => {
  return [
    {
      name: 'animals',
      label: 'Animaux',
      onClick: onListCause,
      param: 'object',
      theme: 'secondary',
      icon: <CauseIcon color="white" />,
      role: 'DETAIL',
      active: state.animalsSite > 0,
    },
    {
      name: 'documents',
      label: 'Documents',
      onClick: onListDocument,
      param: 'object',
      theme: 'secondary',
      icon: <DocumentIcon color="white" />,
      role: 'DETAIL',
      active: state.documentsSite > 0,
    },
    {
      name: 'photos',
      label: 'Photos',
      onClick: onListPhoto,
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
      filterable: { type: 'text' }, 
      first: true,
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
    },
    {
      name: 'type',
      label: 'Type',
      col: 'site_type.sitt_name',
      size: '5',
      mob_size: '36',
      title: true,
      sortable: true, 
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
      name: 'sep1',
      label: '',
      col: '',
      size: '1',
      mob_size: '0',
      title: true,
      sortable: false,
      filterable: false,
    },
    {
      name: 'site_count_cause',
      label: 'Animaux',
      col: 'site_count_cause',
      size: '3',
      mob_size: 10,
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
