import React from 'react';
import { Menu as MenuIcon } from '../icons';

export default function TopPanelHamburger(props) {
  return (
    <div className="common-top-panel-badges">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <button
            className="btn btn-humburger"
            onClick={props.toggleRightPanel}
            id="menu-toggle"
          >
            <MenuIcon className="secondary" />
          </button>
        </li>
      </ul>
    </div>
  );
}
