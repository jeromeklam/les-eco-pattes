import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { FormattedMessage } from 'react-intl';
import {
  Home as HomeIcon,
  About as AboutIcon,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Cause as CauseIcon,
  Person as PersonIcon,
  Site as SiteIcon,
  Stock as StockIcon,
  Map as MapIcon,
  Movement as MovementIcon,
  Version as VersionIcon,
  Settings as SettingsIcon,
  Agenda as AgendaIcon,
  Contract as ContractIcon,
  Task as TaskIcon,
  Print as PrintIcon,
} from '../icons';

export const globalMenu = (authCookie = false) => {
  let appMenu = [];
  appMenu.push({
    icon: <HomeIcon />,
    label: <FormattedMessage id="app.features.home.app.menu.home" defaultMessage="Home" />,
    url: '/',
    role: 'HOME',
    help: <FormattedMessage id="app.features.home.app.menu.help.home" defaultMessage="Back home" />,
    public: true,
  });
  if (authCookie) {
    appMenu.push({
      icon: <LoginIcon />,
      label: <FormattedMessage id="app.features.home.app.menu.signin" defaultMessage="Sign in" />,
      url: '/auth/signin',
      role: 'SIGNIN',
      help: (
        <FormattedMessage id="app.features.home.app.menu.help.signin" defaultMessage="Sign in" />
      ),
      public: true,
    });
  }
  appMenu.push({
    icon: <LogoutIcon />,
    label: <FormattedMessage id="app.features.home.app.menu.signout" defaultMessage="Sign out" />,
    url: '/auth/signout',
    role: '-SIGNOUT-',
    help: (
      <FormattedMessage id="app.features.home.app.menu.help.signout" defaultMessage="Sign out" />
    ),
    public: false,
  });
  appMenu.push({
    icon: <SocialIcon url="https://facebook.com/Les-éco-pattes-140387953308320/" />,
    label: <FormattedMessage id="app.features.home.app.menu.facebook" defaultMessage="Facebook" />,
    url: null,
    role: 'SOCIAL',
    position: 1,
    help: (
      <FormattedMessage id="app.features.home.app.menu.help.facebook" defaultMessage="Facebook" />
    ),
    public: true,
  });
  appMenu.push({
    icon: <DashboardIcon />,
    label: (
      <FormattedMessage id="app.features.home.app.menu.dashboard" defaultMessage="Dashboard" />
    ),
    url: '/dashboard',
    role: 'NAV',
    position: 2,
    help: (
      <FormattedMessage id="app.features.home.app.menu.help.dashboard" defaultMessage="Dashboard" />
    ),
    public: false,
  });
  appMenu.push({
    icon: <MapIcon />,
    label: <FormattedMessage id="app.features.home.app.menu.map" defaultMessage="Map" />,
    url: '/pigeon-map',
    role: 'NAV',
    position: 3,
    help: <FormattedMessage id="app.features.home.app.menu.help.map" defaultMessage="Map" />,
    public: false,
  });
  appMenu.push({
    icon: <AgendaIcon />,
    label: <FormattedMessage id="app.features.home.app.menu.agenda" defaultMessage="Agenda" />,
    url: '/agenda',
    role: 'NAV',
    position: 4,
    help: <FormattedMessage id="app.features.home.app.menu.help.agenda" defaultMessage="Agenda" />,
    public: false,
  });
  appMenu.push({
    icon: <TaskIcon />,
    label: <FormattedMessage id="app.features.home.app.menu.alerts" defaultMessage="Tâches" />,
    url: '/alert',
    role: 'NAV',
    position: 5,
    help: <FormattedMessage id="app.features.home.app.menu.help.alerts" defaultMessage="Tâches" />,
    public: false,
  });
  appMenu.push({
    icon: <ContractIcon />,
    label: (
      <FormattedMessage id="app.features.home.app.menu.contracts" defaultMessage="Contracts" />
    ),
    url: '/contract',
    role: 'NAV',
    position: 6,
    help: (
      <FormattedMessage id="app.features.home.app.menu.help.contracts" defaultMessage="Contracts" />
    ),
    public: false,
  });
  appMenu.push({
    icon: <SiteIcon />,
    label: (
      <FormattedMessage id="app.features.home.app.menu.locations" defaultMessage="Locations" />
    ),
    url: '/site',
    role: 'NAV',
    position: 7,
    help: (
      <FormattedMessage id="app.features.home.app.menu.help.locations" defaultMessage="Locations" />
    ),
    public: false,
  });
  appMenu.push({
    icon: <CauseIcon />,
    label: <FormattedMessage id="app.features.home.app.menu.causes" defaultMessage="Animals" />,
    url: '/cause',
    role: 'NAV',
    position: 8,
    help: <FormattedMessage id="app.features.home.app.menu.help.causes" defaultMessage="Animals" />,
    public: false,
  });
  appMenu.push({
    icon: <PersonIcon />,
    label: <FormattedMessage id="app.features.home.app.menu.clients" defaultMessage="People" />,
    url: '/client',
    role: 'NAV',
    position: 9,
    help: <FormattedMessage id="app.features.home.app.menu.help.clients" defaultMessage="People" />,
    public: false,
  });
  appMenu.push({
    icon: <MovementIcon />,
    label: (
      <FormattedMessage id="app.features.home.app.menu.movements" defaultMessage="Movements" />
    ),
    url: '/movement',
    role: 'NAV',
    position: 10,
    help: (
      <FormattedMessage id="app.features.home.app.menu.help.movements" defaultMessage="Movements" />
    ),
    public: false,
  });
  appMenu.push({
    icon: <SettingsIcon />,
    label: <FormattedMessage id="app.features.home.app.menu.settings" defaultMessage="Settings" />,
    url: null,
    role: 'MENU',
    position: 20,
    public: false,
    help: (
      <FormattedMessage id="app.features.home.app.menu.help.settings" defaultMessage="Settings" />
    ),
    options: [
      {
        icon: null,
        label: 'Types de site',
        url: '/site-type',
        role: 'NAV',
        position: 2,
      },
      {
        icon: null,
        label: 'Espèces',
        url: '/cause-main-type',
        role: 'NAV',
        position: 3,
      },
      {
        icon: null,
        label: 'Races',
        url: '/cause-type',
        role: 'NAV',
        position: 4,
      },
      {
        icon: null,
        label: 'Catégories de contact',
        url: '/client-category',
        role: 'NAV',
        position: 5,
      },
      {
        icon: null,
        label: 'Types de contact',
        url: '/client-type',
        role: 'NAV',
        position: 6,
      },
      {
        icon: null,
        label: 'Maladies',
        url: '/sickness',
        role: 'NAV',
        position: 7,
      },
      {
        label: "Modèles d'éditions",
        url: '/edition',
        role: 'NAV',
        position: 8,
      },
      {
        icon: null,
        label: 'Variables',
        url: '/data',
        role: 'NAV',
        position: 99,
      },
    ],
  });
  appMenu.push({
    icon: <VersionIcon />,
    label: (
      <FormattedMessage id="app.features.home.app.menu.changelog" defaultMessage="Changelog" />
    ),
    url: '/version',
    role: 'NAV',
    position: 98,
    help: (
      <FormattedMessage id="app.features.home.app.menu.help.changelog" defaultMessage="Changelog" />
    ),
    public: true,
  });
  appMenu.push({
    icon: <AboutIcon />,
    label: (
      <FormattedMessage id="app.features.home.app.menu.whoAreWe" defaultMessage="Who are we ?" />
    ),
    url: '/about',
    role: 'ABOUT',
    position: 99,
    help: (
      <FormattedMessage
        id="app.features.home.app.menu.help.whoAreWe"
        defaultMessage="Who are we ?"
      />
    ),
    public: true,
  });
  return appMenu;
};

/**
 * appMenu.push({
    icon: <StockIcon />,
    label: <FormattedMessage id="app.features.home.app.menu.stock" defaultMessage="Stock" />,
    url: '/stock',
    role: 'NAV',
    position: 30,
    help: <FormattedMessage id="app.features.home.app.menu.help.stock" defaultMessage="Stock" />,
    public: false,
  });
 */