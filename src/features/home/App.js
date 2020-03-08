import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { SocialIcon } from 'react-social-icons';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as authActions from '../auth/redux/actions';
import { ResponsivePage } from 'freeassofront';
import {
  Home as HomeIcon,
  About as AboutIcon,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Cause as CauseIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Site as SiteIcon,
  Stock as StockIcon,
  Map as MapIcon,
  Movement as MovementIcon,
  Version as VersionIcon,
  Settings as SettingsIcon,
} from '../icons';
import { CenteredLoading9X9 } from '../ui';
import { SimpleForm } from '../auth';
import { initAxios } from '../../common';
import fond from '../../images/fond2.jpg';

const options = [
  {
    icon: <HomeIcon />,
    label: 'Accueil',
    url: '/',
    role: 'HOME',
    help: "Accueil : Permet de revenir à l'écran principal",
    public: true,
  },
  {
    icon: <LoginIcon />,
    label: 'Connexion',
    url: '/auth/signin',
    role: 'SIGNIN',
    help: "Pour accéder à la page d'authentification",
    public: true,
  },
  {
    icon: <LogoutIcon />,
    label: 'Déconnexion',
    url: '/auth/signout',
    role: 'SIGNOUT',
    help: 'Pour se déconnecter',
    public: false,
  },
  {
    icon: <SocialIcon url="https://facebook.com/KalaweitFrance/" />,
    label: 'Facebook',
    url: null,
    role: 'SOCIAL',
    position: 1,
    help: 'Accéder au site Facebook',
    public: true,
  },
  {
    icon: <DashboardIcon />,
    label: 'Tableau de bord',
    url: '/dashboard',
    role: 'NAV',
    position: 2,
    help: 'Tableau de bord : pour consulter les éléments en attente, tâches à effectuer, ...',
    public: false,
  },
  {
    icon: <MapIcon />,
    label: 'Carte',
    url: '/pigeon-map',
    role: 'NAV',
    position: 3,
    help:
      "Carte : Pour visualiser l'emplacement des sites sur une carte, les positionner, une vue rapide",
    public: false,
  },
  {
    icon: <SiteIcon />,
    label: 'Sites',
    url: '/site',
    role: 'NAV',
    position: 4,
    help: 'Sites : La gestion des sites',
    public: false,
  },
  {
    icon: <CauseIcon />,
    label: 'Animaux',
    url: '/cause',
    role: 'NAV',
    position: 5,
    help: 'Animaux : La gestion des animaux',
    public: false,
  },
  {
    icon: <PersonIcon />,
    label: 'Personnes',
    url: '/client',
    role: 'NAV',
    position: 6,
    help: 'Personnes : La gestion des vétérinaires, contacts, ...',
    public: false,
  },
  {
    icon: <MovementIcon />,
    label: 'Mouvements',
    url: '/movement',
    role: 'NAV',
    position: 7,
    help: "Mouvements : Déplacement en masse d'animaux, ...",
    public: false,
  },
  {
    icon: <StockIcon />,
    label: 'Stock',
    url: '/stock',
    role: 'NAV',
    position: 8,
    help: 'Stock : La gestion des médicaments, du stock en général',
    public: false,
  },
  {
    icon: <SettingsIcon />,
    label: 'Répertoires',
    url: null,
    role: 'MENU',
    position: 20,
    public: false,
    help: 'Répertoires : Les éléments configurables',
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
        label: 'Catégories de personne',
        url: '/client-category',
        role: 'NAV',
        position: 5,
      },
      {
        icon: null,
        label: 'Types de personne',
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
        icon: null,
        label: 'Variables',
        url: '/data',
        role: 'NAV',
        position: 99,
      },
    ],
  },
  {
    icon: <VersionIcon />,
    label: 'Fiche version',
    url: '/version',
    role: 'NAV',
    position: 11,
    help: 'Fiche version : Les modifications par version',
    public: true,
  },
  {
    icon: <AboutIcon />,
    label: 'Qui sommes nous ?',
    url: '/about',
    role: 'ABOUT',
    position: 99,
    help: 'Qui sommes nous : Présentation générale',
    public: true,
  },
];

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      menuDataOpen: false,
    };
    this.onNavigate = this.onNavigate.bind(this);
    this.onGeo = this.onGeo.bind(this);
  }

  componentDidMount() {
    initAxios();
    if (this.props.auth.authenticated) {
      this.props.actions.loadAll();
    } else {
      // Check auth...
      this.props.actions.checkIsAuthenticated();
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onGeo);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth.authenticated !== this.props.auth.authenticated) {
      if (
        this.props.auth.authenticated &&
        !this.props.home.loadAllFinish &&
        !this.props.home.loadAllError &&
        !this.props.home.loadAllPending
      ) {
        initAxios(prevProps.auth.token);
        this.props.actions.loadAll();
      }
    }
  }

  onGeo(position) {
    if (position && position.coords) {
      this.props.actions.setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    }
  }

  onNavigate(url) {
    this.props.history.push(url);
  }

  render() {
    if (this.props.home.loadAllError) {
      return (
        <div className="text-danger">
          <h4>Erreur d'accès au service</h4>
        </div>
      );
    } else {
      return (
        <div>
          <img className="fond-site2 d-none d-sm-block" src={fond} alt="" />
          <ResponsivePage
            menuIcon={<MenuIcon className="light" />}
            title={process.env.REACT_APP_APP_NAME}
            options={options}
            authenticated={this.props.auth.authenticated}
            location={this.props.location}
            onNavigate={this.onNavigate}
            userForm={<SimpleForm />}
            userTitle={this.props.auth.user.user_first_name || this.props.auth.user.user_first_name}
          >
            {!this.props.auth.authenticated || this.props.home.loadAllFinish ? (
              <div>
                {this.props.children}
              </div>
            ) : (
              <div className="text-center mt-5 text-secondary">
                <h4>... Chargement ...</h4>
                <CenteredLoading9X9 />
              </div>
            )}
          </ResponsivePage>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...authActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
