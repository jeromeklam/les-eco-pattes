import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { SocialIcon } from 'react-social-icons';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as authActions from '../auth/redux/actions';
import { ResponsivePage, Loading9x9 } from 'freeassofront';
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
  Map as MapIcon,
} from '../icons';
import { SimpleForm } from '../auth';
import { initAxios } from '../../common';

const options = [
  {
    icon: <HomeIcon />,
    label: 'Accueil',
    url: '/',
    role: 'HOME',
    public: true,
  },
  {
    icon: <LoginIcon />,
    label: 'Connexion',
    url: '/auth/signin',
    role: 'SIGNIN',
    public: true,
  },
  {
    icon: <LogoutIcon />,
    label: 'Déconnexion',
    url: '/auth/signout',
    role: 'SIGNOUT',
    public: false,
  },
  {
    icon: <SocialIcon url="https://facebook.com/KalaweitFrance/" />,
    label: 'Facebook',
    url: null,
    role: 'SOCIAL',
    position: 1,
    public: true,
  },
  {
    icon: <DashboardIcon />,
    label: 'Tableau de bord',
    url: '/dashboard',
    role: 'NAV',
    position: 2,
    public: false,
  },
  {
    icon: <MapIcon />,
    label: 'Carte',
    url: '/pigeon-map',
    role: 'NAV',
    position: 3,
    public: false,
  },
  {
    icon: <SiteIcon />,
    label: 'Sites',
    url: '/site',
    role: 'NAV',
    position: 4,
    public: false,
  },
  {
    icon: <CauseIcon />,
    label: 'Animaux',
    url: '/cause',
    role: 'NAV',
    position: 5,
    public: false,
  },
  {
    icon: <PersonIcon />,
    label: 'Personnes',
    url: '/client',
    role: 'NAV',
    position: 6,
    public: false,
  },
  {
    icon: null,
    label: 'Répertoires',
    url: null,
    role: 'MENU',
    position: 7,
    public: false,
    options: [
      {
        icon: null,
        label: 'Variables',
        url: '/data',
        role: 'NAV',
        position: 1,
      },
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
    ],
  },
  {
    icon: null,
    label: 'Paramétrage',
    url: null,
    role: 'MENU',
    position: 8,
    public: false,
    options: [
      {
        icon: null,
        label: 'Emails',
        url: '/email',
        role: 'NAV',
        position: 1,
      },
    ],
  },
  {
    icon: <AboutIcon />,
    label: 'Qui sommes nous ?',
    url: '/about',
    role: 'ABOUT',
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
      this.props.actions.setCoords({ lat: position.coords.latitude, lon: position.coords.longitude})
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
      if (!this.props.auth.authenticated || this.props.home.loadAllFinish) {
        return (
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
            {this.props.children}
          </ResponsivePage>
        );
      } else {
        return (
          <div className="main-loader bg-secondary-light">
            <h4 className="text-secondary p-3">... Chargement des données ...</h4>
            <Loading9x9 className="text-primary"/>
          </div>
        );
      }
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
