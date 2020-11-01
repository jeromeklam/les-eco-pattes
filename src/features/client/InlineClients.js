import React, { Component } from 'react';
import classnames from 'classnames';
import { CenteredLoading3Dots } from '../ui';
import { getClients } from './';

export default class InlineClients extends Component {
  static propTypes = {

  };

  static getDerivedStateFromProps(props, state) {
    if (props.parentId !== state.parent_id || props.client !== state.item) {
      return { parent_id: props.parentId, parent: props.parent, item: props.client };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      parent: props.parent || null,
      parent_id: props.parent_id || 0,
      loading: true,
      item: props.client || null,
      items: [],
    };
    this.localLoadClients = this.localLoadClients.bind(this);
  }

  localLoadClients() {
    this.setState({ loading: true });
    getClients(this.state.parent_id, this.state.item).then(result => {
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
              <div className="col-sm-w6 col-first">
                <span>Nom</span>
              </div>
            </div>
            {clients.map(client => (
              <div
                className={classnames('row row-line', counter++ % 2 !== 1 ? 'row-odd' : 'row-even')}
                key={client.id}
              >
                <div className="col-sm-w6 col-first">
                  <span>{client.cli_lastname}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-3">
            <span className="text-secondary">Aucun contact attaché</span>
          </div>
        )}
      </div>
    );
  }
}
