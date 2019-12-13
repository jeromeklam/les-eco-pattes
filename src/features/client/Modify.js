import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { LoadingData } from '../layout';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    console.log("FK Modify ", props)
    /**
     * On récupère l'id et l'élément à afficher
     */
    this.state = {
      clientId: this.props.match.params.clientId || false,
      item: false,
    };
    /**
     * Bind des méthodes locales au contexte courant
     */
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    /**
     *  En async on va demander le chargement des données
     *  Lorsque fini le store sera modifié
     */
    this.props.actions.loadOne(this.state.clientId).then(result => {
      const item = this.props.client.loadOneItem;
      this.setState({ item: item });
    });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="client-modify global-card">
        {this.props.client.loadOnePending ? (
          <LoadingData />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                tab_datas={this.props.data.items}
                tab_configs={this.props.config.items}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.client,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modify);
