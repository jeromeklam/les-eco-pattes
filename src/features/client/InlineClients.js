import React, { Component } from 'react';
import classnames from 'classnames';
import { CenteredLoading3Dots } from '../ui';
import { getFullName, getClients } from './';

export default class InlineClients extends Component {
  static propTypes = {

  };

  static getDerivedStateFromProps(props, state) {
    if (props.parentId !== state.parent_id ) {
      return { parent_id: props.client.id };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      parent_id: props.parentId || 0,
      loading: true,
      items: [],
    };
    this.localLoadClients = this.localLoadClients.bind(this);
  }

  localLoadClients() {
    this.setState({ loading: true });
    getClients(this.state.parent_id).then(result => {
      this.setState({ loading: false, items: result });
    });
  } 

  componentDidMount() {
    this.localLoadClients();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.parent_id !== this.state.parent_id) {
      this.localLoadClients();
    }
  }

  render() {
    if (this.state.loading) {
      return <CenteredLoading3Dots />;
    }
    let counter = 0;
    let clients = this.state.items;
    return (
      <div className="cause-inline-causes">
        {clients && clients.length > 0 ? (
          <div className="inline-list">
            <div
              className={classnames(
                'row row-title row-line',
                counter++ % 2 !== 1 ? 'row-odd' : 'row-even',
              )}
              key="client-inline-clients"
            >
              <div className="col-sm-w10 col-first">
                <span>Nom</span>
              </div>
              <div className="col-sm-w6">
                <span>Portable</span>
              </div>
              <div className="col-sm-w6">
                <span>Mail</span>
              </div>
            </div>
            {clients.map(client => (
              <div
                className={classnames('row row-line', counter++ % 2 !== 1 ? 'row-odd' : 'row-even')}
                key={client.id}
              >
                <div className="col-sm-w10 col-first">
                  <span>{getFullName(client)}</span>
                </div>
                <div className="col-sm-w6">
                  <span>{client.cli_phone_gsm}</span>
                </div>
                <div className="col-sm-w6">
                  <span>{client.cli_email}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-3">
            <span className="text-secondary">Aucun vétérinaire attaché</span>
          </div>
        )}
      </div>
    );
  }
}
