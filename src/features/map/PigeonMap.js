import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import Overlay from 'pigeon-overlay';

export class PigeonMap extends Component {
  static propTypes = {
    pigeonMap: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      center: [ 49.096306, 6.160053],
      zoom: 11,
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-28">
          <div style={{ height: '100vh', width: '100%' }}>
            <Map center={this.state.center} zoom={this.state.zoom}>
              <Marker
                anchor={[50.874, 4.6947]}
                payload={1}
                onClick={({ event, anchor, payload }) => {}}
              />

              <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
                <img src="pigeon.jpg" width={240} height={158} alt="" />
              </Overlay>
            </Map>
          </div>
          <div classname="col-8"></div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    pigeonMap: state.pigeonMap,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PigeonMap);
