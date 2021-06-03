import React from 'react';
import { injectIntl } from 'react-intl';
import { HighlightButton, Highlight, Row } from 'react-bootstrap-front';
import {
  GetOne as GetOneIcon,
  Save as SaveIcon,
  Reload as ReloadIcon,
  DashboardReset as ResetIcon,
  Stop as StopIcon,
} from '../icons';

export function DashboardToolbar(props) {
    return (
      <div className="dashboard-dashboard-toolbar">
        <Row className="row-short">
          <div className="col-xs-w6 text-center">
            <HighlightButton className="text-light" theme="DASHBOARD">
              <div title="Aide">
                <button className="btn btn-secondary">?</button>
              </div>
            </HighlightButton>
          </div>
          <div className="col-xs-w10 text-center"/>
          <div className="col-xs-w20 text-right">
            <div className="nav justify-content-end">
              {!props.editable && (
                <Highlight
                  className="nav-item"
                  position="bottom"
                  theme="DASHBOARD"
                  title="Rafraîchir les données"
                >
                  <button
                    className="btn btn-secondary text-light"
                    title="Rafraîchir les données"
                    onClick={props.onRefresh}
                  >
                    <ReloadIcon />
                  </button>
                </Highlight>
              )}
              {props.editable && (
                <Highlight
                  className="nav-item"
                  position="bottom"
                  theme="DASHBOARD"
                  title="Revenir à la présentation par défaut"
                >
                  <button
                    className="btn btn-warning text-light"
                    title="Revenir à la présentation par défaut"
                    onClick={props.onReset}
                  >
                    <ResetIcon />
                  </button>
                </Highlight>
              )}
              {props.editable && (
                <Highlight
                  className="nav-item"
                  position="bottom"
                  theme="DASHBOARD"
                  title="Enregistrer la présentation"
                >
                  <button
                    className="btn btn-primary text-light"
                    title="Enregistrer cette présentation personnalisée"
                    onClick={props.onSave}
                  >
                    <SaveIcon />
                  </button>
                </Highlight>
              )}
              {!props.editable ? (
                <Highlight
                  className="nav-item"
                  position="bottom"
                  theme="DASHBOARD"
                  title="Editer la présentation"
                >
                  <button
                    className="btn btn-secondary text-light"
                    title="Modifier la disposition"
                    onClick={props.onEditStart}
                  >
                    <GetOneIcon />
                  </button>
                </Highlight>
              ) : (
                <Highlight
                  className="nav-item"
                  position="bottom"
                  theme="DASHBOARD"
                  title="Arrêter l'édition"
                >
                  <button
                    className="btn btn-secondary text-light"
                    title="Stop"
                    onClick={props.onEditCancel}
                  >
                    <StopIcon />
                  </button>
                </Highlight>
              )}
            </div>
          </div>
        </Row>
      </div>
    );
}

export default injectIntl(DashboardToolbar);
