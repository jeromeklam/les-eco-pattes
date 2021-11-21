import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
  InputGroup,
  InputGroupAppend,
  InputGroupPrepend,
  InputGroupText,
  ResponsiveConfirm,
} from 'react-bootstrap-front';
import { Upload as UploadIcon, DelOne as DelOneIcon } from '../icons';

export default class InputFileContent extends Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string,
    titleEmpty: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    label: '',
    title: '',
    titleEmpty: 'Ajouter un fichier',
    value: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
    };
    this.onDropFiles = this.onDropFiles.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onConfirmClear = this.onConfirmClear.bind(this);
  }

  onDropFiles(acceptedFiles) {
    const promises = acceptedFiles.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onabort = () => {
          reject();
        };
        reader.onerror = error => {
          reject(error);
        };
        reader.onload = () => {
          const binaryStr = reader.result;
          this.setState({ img: binaryStr });
          const event = {
            target: {
              name: this.props.name,
              value: binaryStr,
            },
          };
          this.props.onChange(event);
        };
        reader.readAsDataURL(file);
      });
    });
    const reload = Promise.all(promises);
    reload.then(result => {
      console.log('InputFile result', result);
    });
  }

  onClear() {
    this.setState({ confirm: false, img: '' });
    const event = {
      target: {
        name: this.props.name,
        value: '',
      },
    };
    this.props.onChange(event);
  }

  onConfirmClear() {
    this.setState({ confirm: !this.state.confirm });
  }

  render() {
    return (
      <div>
        <InputGroup {...this.props}>
          {this.props.prepend && this.props.prepend !== '' && (
            <InputGroupPrepend>
              <InputGroupText className="border-secondary bg-light">
                {this.props.prepend}
              </InputGroupText>
            </InputGroupPrepend>
          )}
          <input
            type="text"
            className={classnames(
              'border-secondary form-control',
              this.props.size && `form-control-${this.props.size}`,
            )}
            name={this.props.name}
            disabled
            value={this.props.value ? 'Fichier présent' : this.props.titleEmpty}
          />
          <InputGroupAppend>
            <button
              type="button"
              className={classnames(
                `btn btn-input btn-outline-secondary bg-light`,
                this.props.size && `btn-${this.props.size}`,
              )}
            >
              <Dropzone
                onDrop={acceptedFiles => {
                  this.onDropFiles(acceptedFiles);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <UploadIcon className="text-primary inline-action" size={0.8} />
                    </div>
                  </section>
                )}
              </Dropzone>
            </button>
            <button type="button" className="btn btn-input btn-outline-secondary bg-light">
              <DelOneIcon className="text-warning" onClick={this.onConfirmClear} size={0.8} />
            </button>
            {this.props.append && this.props.append !== '' && (
              <InputGroupText className="border-secondary bg-light">
                {this.props.append}
              </InputGroupText>
            )}
          </InputGroupAppend>
        </InputGroup>
        <ResponsiveConfirm
          show={this.state.confirm}
          onClose={this.onModalClose}
          onConfirm={this.onClear}
        />
      </div>
    );
  }
}
