import React from 'react';
// import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap-front';

import { DashboardCard } from '../dashboard';
import {
  Site as SiteIcon,
  Cause as CauseIcon,
  Area as AreaIcon,
  Fence as FenceIcon,
} from '../icons';

export default function Statistics(props) {
  return (
    <div className="home-statistics">
      <h2 className="text-secondary">EN QUELQUES CHIFFRES</h2>
      <br />
      <br />
      <Row>
        <Col size={9}>
          <DashboardCard
            title="Animaux"
            count={props.stats.total_cause}
            icon={<CauseIcon />}
            url="/cause"
          />
        </Col>
        <Col size={9}>
          <DashboardCard
            title="Sites"
            count={props.stats.total_site}
            icon={<SiteIcon />}
            url="/site"
          />
        </Col>
        <Col size={9}>
          <DashboardCard
            title="Surface"
            count={props.stats.area_site || 0}
            unit="m2"
            icon={<AreaIcon />}
          />
        </Col>
        <Col size={9}>
          <DashboardCard
            title="Clôtures"
            count={props.stats.clot_site || 0}
            unit="ml"
            icon={<FenceIcon />}
          />
        </Col>
      </Row>
    </div>
  );
}

Statistics.propTypes = {};
Statistics.defaultProps = {};
