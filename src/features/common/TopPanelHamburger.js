import React from 'react';
import { Menu as MenuIcon } from '../icons';

export default function TopPanelHamburger(props) {
  return (
    <div className="common-top-panel-badges-2">
      <div className="btn-humburger-wrapper-2">
        <button className="btn btn-humburger" onClick={props.toggleRightPanel} id="menu-toggle">
          <MenuIcon className="secondary" />
        </button>
      </div>
    </div>
  );
}
