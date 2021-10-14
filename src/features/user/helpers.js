import React from 'react';

export const displayItemPicker = item => {
  if (item && item.id) {
    return (
      <>
        <span>{item.user_login}</span>
      </>
    );
  }
  return null;
};

export const getPickerDisplay = item => {
  if (item && item.id) {
    return (
      <>
        <span>{item.user_login}</span>
      </>
    );
  }
  return null;
};

/**
 * Descriptions de toutes les colonnes de la liste
 * Même les colonnes cachées
 * Ces colonnes peuvent ou non données des champs dans les filtres
 * (une info peut de pas être affichée dans la liste mais on peut peut-être mettre un filtre dessus)
 */
export const getCols = ({ props }) => {
  return [
    {
      name: 'user_id',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_id.label',
        defaultMessage: 'user_id',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_id.short',
        defaultMessage: 'user_id',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_id.comment',
        defaultMessage: "Identifiant de l'utilisateur",
      }),
      col: 'user_id',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      hidden: true,
      card: { role: 'ID' },
      filterable: true,
    },
    {
      name: 'user_login',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_login.label',
        defaultMessage: 'user_login',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_login.short',
        defaultMessage: 'user_login',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_login.comment',
        defaultMessage: "Login de l'utilisateur",
      }),
      col: 'user_login',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'TITLE' },
      first: true,
      filterable: true,
    },
    {
      name: 'user_active',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_active.label',
        defaultMessage: 'user_active',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_active.short',
        defaultMessage: 'user_active',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_active.comment',
        defaultMessage: 'Utilisateur actif ?',
      }),
      col: 'user_active',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: { type: 'bool' },
      type: 'bool',
    },
    {
      name: 'user_email',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_email.label',
        defaultMessage: 'user_email',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_email.short',
        defaultMessage: 'user_email',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_email.comment',
        defaultMessage: 'Email, en général login',
      }),
      col: 'user_email',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: true,
    },
    {
      name: 'user_first_name',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_first_name.label',
        defaultMessage: 'user_first_name',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_first_name.short',
        defaultMessage: 'user_first_name',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_first_name.comment',
        defaultMessage: "Prénom de l'utilisateur",
      }),
      col: 'user_first_name',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: true,
    },
    {
      name: 'user_last_name',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_last_name.label',
        defaultMessage: 'user_last_name',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_last_name.short',
        defaultMessage: 'user_last_name',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_last_name.comment',
        defaultMessage: "Nom de l'utilisateur",
      }),
      col: 'user_last_name',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: true,
    },
    {
      name: 'user_title',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_title.label',
        defaultMessage: 'user_title',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_title.short',
        defaultMessage: 'user_title',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_title.comment',
        defaultMessage: "Civilité de l'utilisateur",
      }),
      col: 'user_title',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: true,
    },
    {
      name: 'user_scope',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_scope.label',
        defaultMessage: 'user_scope',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_scope.short',
        defaultMessage: 'user_scope',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_scope.comment',
        defaultMessage: "Roles de l'utilisateur séparés par ,",
      }),
      col: 'user_scope',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: true,
    },
    {
      name: 'user_type',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_type.label',
        defaultMessage: 'user_type',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_type.short',
        defaultMessage: 'user_type',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_type.comment',
        defaultMessage: "Type de l'utilisateur",
      }),
      col: 'user_type',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: true,
    },
    {
      name: 'user_ips',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_ips.label',
        defaultMessage: 'user_ips',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_ips.short',
        defaultMessage: 'user_ips',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_ips.comment',
        defaultMessage: 'IPs autorisées séparées par ,',
      }),
      col: 'user_ips',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: true,
    },
    {
      name: 'user_avatar',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_avatar.label',
        defaultMessage: 'user_avatar',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_avatar.short',
        defaultMessage: 'user_avatar',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_avatar.comment',
        defaultMessage: 'Avatar',
      }),
      col: 'user_avatar',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: true,
    },
    {
      name: 'user_cache',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_cache.label',
        defaultMessage: 'user_cache',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_cache.short',
        defaultMessage: 'user_cache',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_cache.comment',
        defaultMessage: 'Informations de cache',
      }),
      col: 'user_cache',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: true,
    },
    {
      name: 'user_extern_code',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.user_extern_code.label',
        defaultMessage: 'user_extern_code',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.user_extern_code.short',
        defaultMessage: 'user_extern_code',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.user_extern_code.comment',
        defaultMessage: "Code externe de l'utilisateur",
      }),
      col: 'user_extern_code',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: true,
    },
    {
      name: 'lang_id',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.lang_id.label',
        defaultMessage: 'lang_id',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.lang_id.short',
        defaultMessage: 'lang_id',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.lang_id.comment',
        defaultMessage: "Langue par défaut de l'utilisateur",
      }),
      col: 'lang_id',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: true,
    },
    {
      name: 'permissions',
      label: props.intl.formatMessage({
        id: 'app.features.user.field.permissions.label',
        defaultMessage: 'permissions',
      }),
      shortLabel: props.intl.formatMessage({
        id: 'app.features.user.field.permissions.short',
        defaultMessage: 'permissions',
      }),
      comment: props.intl.formatMessage({
        id: 'app.features.user.field.permissions.comment',
        defaultMessage: "Permissions de l'utilisateur",
      }),
      col: 'permissions',
      size: { xxs: 36, sm: 12, md: 4 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
      filterable: true,
    },
  ];
};
