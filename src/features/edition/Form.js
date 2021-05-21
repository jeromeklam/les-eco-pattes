import React from 'react';
import { injectIntl } from 'react-intl';
import { InputHidden, InputText, InputSelect, Row, Col } from 'react-bootstrap-front';
import PropTypes from 'prop-types';
import { getEditionObjectNames, getEditionObjectTypes, getEditionObjectModes } from './';
import { useForm, ResponsiveModalOrForm, InputTextarea, InputFileContent } from '../ui';

/**
 * Form
 *
 * @param object props
 */
function Form(props) {
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    getErrorMessage,
  } = useForm(props.item, '', props.onSubmit, props.onCancel, '', props.errors, props.intl);
  return (
    <ResponsiveModalOrForm
      title={values.edi_name}
      size="md"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
      modal={true}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <Row>
        <Col size={18}>
          <InputText
            label="Nom"
            name="edi_name"
            id="edi_name"
            required={true}
            value={values.edi_name}
            onChange={handleChange}
            error={getErrorMessage('edi_name')}
          />
        </Col>
        <Col size={9}>
          <InputSelect
            label="Objet"
            name="edi_object_name"
            id="edi_object_name"
            required={true}
            value={values.edi_object_name}
            onChange={handleChange}
            error={getErrorMessage('edi_object_name')}
            options={getEditionObjectNames(props.intl)}
          />
        </Col>
      </Row>
      <Row>
        <Col size={16}>
          <InputSelect
            label="Type"
            name="edi_type"
            id="edi_type"
            required={true}
            value={values.edi_type}
            defaultValue="HTML"
            onChange={handleChange}
            error={getErrorMessage('edi_type')}
            options={getEditionObjectTypes(props.intl)}
          />
        </Col>
        <Col size={11}>
          <InputSelect
            label="Mode de génération"
            name="edi_mode"
            id="edi_mode"
            required={true}
            value={values.edi_mode}
            defaultValue="RENEW"
            onChange={handleChange}
            error={getErrorMessage('edi_mode')}
            options={getEditionObjectModes(props.intl)}
          />
        </Col>
        <Col size={9}>
          <InputText
            label="Durée de conservation (j)"
            name="edi_duration"
            id="edi_duration"
            value={values.edi_duration}
            onChange={handleChange}
            error={getErrorMessage('edi_duration')}
          />
        </Col>
      </Row>
      <Row>
        <Col size={36}>
          <InputTextarea
            label="Description"
            name="edi_desc"
            id="edi_desc"
            value={values.edi_desc}
            onChange={handleChange}
            error={getErrorMessage('edi_desc')}
          />
        </Col>
        <Col size={27}>
          <InputFileContent
            label="Fichier"
            name="edi_data"
            id="edi_data"
            required={true}
            value={values.edi_data}
            defaultValue={null}
            onChange={handleChange}
            error={getErrorMessage('edi_data')}
          />
        </Col>
      </Row>
    </ResponsiveModalOrForm>
  );
}

Form.propTypes = {
  item: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
Form.defaultProps = {};

export default injectIntl(Form);
