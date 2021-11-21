import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { PortalLoader, createSuccess, modifySuccess, showErrors } from '../ui';
import Form from './Form';

export class Input extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultProps = {
    loader: true,
  };

  constructor(props) {
    super(props);
    /**
     * On récupère l'id et l'élément à afficher
     */
    this.state = {
      id: props.id || props.cauId || 0,
      modal: props.modal || false,
      item: false,
    };
    /**
     * Bind des méthodes locales au contexte courant
     */
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onPrint = this.onPrint.bind(this);
  }

  componentDidMount() {
    /**
     *  En async on va demander le chargement des données
     *  Lorsque fini le store sera modifié
     */
    this.props.actions.loadOne(this.state.id).then(result => {
      const item = this.props.cause.loadOneItem;
      this.setState({ item: item });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cauId !== this.props.cauId) {
      this.setState({ id: this.props.cauId });
      this.props.actions.loadOne(this.props.cauId).then(result => {
        const item = this.props.cause.loadOneItem;
        this.setState({ item: item });
      });
    }
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    if (!this.state.modal) {
      this.props.history.push('/cause');
    } else {
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   */
  onSubmit(datas = {}, close = true) {
    this.setState({ saving: true });
    delete datas.default_blob;
    if (this.state.id > 0) {
      this.props.actions
        .updateOne(this.state.id, datas)
        .then(item => {
          modifySuccess();
          if (this.props.onClose && close) {
            this.setState({ saving: false });
            this.props.onClose();
          } else {
            this.setState({ item: item, saving: false });
          }
        })
        .catch(errors => {
          this.setState({ saving: false });
          showErrors(this.props.intl, errors, 'updateOneError');
        });
    } else {
      this.props.actions
        .createOne(datas)
        .then(item => {
          createSuccess();
          if (this.props.onClose && close) {
            this.setState({ saving: false });
            this.props.onClose();
          } else {
            this.setState({ id: item.id, item: item, saving: false });
          }
        })
        .catch(errors => {
          this.setState({ saving: false });
          showErrors(this.props.intl, errors, 'createOneError');
        });
    }
  }

  onPrint(ediId = 0) {
    let idx = this.props.editions.findIndex(elem => elem.id === ediId);
    if (idx < 0) {
      idx = 0;
    }
    this.props.actions.printOne(this.state.id, this.props.editions[idx].id);
  }

  render() {
    const item = this.state.item;
    const prev = '/cause/modify/' + this.props.cause.loadItemPrev;
    const next = '/cause/modify/' + this.props.cause.loadItemNext;
    return (
      <div className="cause-input global-card">
        {!item ? (
          <PortalLoader show={this.props.loader} />
        ) : (
          <div>
            <Form
              item={item}
              prev={prev}
              next={next}
              modify
              modal={this.state.modal}
              cause_types={this.props.causeType.items}
              cause_main_types={this.props.causeMainType.items}
              tab_datas={this.props.data.items}
              tab_configs={this.props.config.items}
              tab={this.props.cause.tab}
              tabs={this.props.cause.tabs}
              properties={this.props.cause.properties}
              errors={
                this.state.id > 0
                  ? this.props.cause.updateOneError
                  : this.props.cause.createOneError
              }
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
              onClose={this.props.onClose}
              saving={this.state.saving}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
    config: state.config,
    cause: state.cause,
    causeType: state.causeType,
    causeMainType: state.causeMainType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Input));
