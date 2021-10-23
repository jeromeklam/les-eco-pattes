import React from 'react';
import { ResponsiveForm, ResponsiveModal } from 'react-bootstrap-front';
import {
  Save as SaveIcon,
  Valid as ValidIcon,
  Cancel as CancelIcon,
} from '../icons';

export default function ResponsiveModalOrForm(props) {
  if (props.modal) {
    let buttons = [];
    if (props.onSave) {
      buttons.push({
        function: props.onSave,
        theme: 'primary',
        icon: <SaveIcon title="Sauvegarder" />,
      });
    }
    if (props.actionsButtons) {
      
      props.actionsButtons.forEach(btnAction => {
        if (!btnAction.hidden) {
          buttons.push(btnAction);
        }
      });
    }
    if (props.onSave || props.actionsButtons) {
      buttons.push({
        name: '',
        icon: '',
      });
    }
    if (props.onSubmit) {
      buttons.push({
        name: 'Enregistrer',
        function: props.onSubmit,
        theme: 'primary',
        icon: <ValidIcon />,
      });
    }
    if (props.onClose) {
      buttons.push({
        name: 'Annuler',
        function: ev => {
          props.onClose();
        },
        theme: 'secondary-dark',
        icon: <CancelIcon />,
      });
    }
    return (
      <ResponsiveModal
        {...props}
        size={props.size || 'fullscreen'}
        show={true}
        buttons={buttons}
      >
         {props.children}
      </ResponsiveModal>
    );
  }
  return <ResponsiveForm {...props} />;
}
