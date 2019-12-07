import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Map from 'pigeon-maps';

const  osm = (x, y, z) => {
    const s = String.fromCharCode(97 + (x + y + z) % 3)
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
  }

export class Map extends Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Map center={[50.879, 4.6997]} zoom={12} width={600} height={400} provider={osm} >
      </Map>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    map: state.map,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
