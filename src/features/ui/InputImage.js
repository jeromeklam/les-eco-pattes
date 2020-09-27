import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { ResponsiveConfirm } from 'react-bootstrap-front';
import { Upload as UploadIcon, GetOne as GetOneIcon, DelOne as DelOneIcon } from '../icons';

export default class InputImage extends Component {
  static propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
    titleEmpty: PropTypes.string,
    image: PropTypes.string,
  };

  static defaultProps = {
    label: '',
    title: '',
    titleEmpty: 'Ajouter une image',
    image: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      img: `data:image/jpeg;base64,${this.props.image}`,
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
      console.log('InputImage result', result);
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
    let imgOk = true;
    if (this.state.img === '' || this.state.img == null) {
      imgOk = false;
    }
    return (
      <div>
        <div className="ui-input-image">
          <div className="card">
            <div className="card-header">
              {imgOk ? (
                <div className="row">
                  <div className="col-20">
                    <span>{this.props.title}</span>
                  </div>
                  <div className="col-16 text-right">
                    <div className="btn-group-sm">
                      <button type="button" className="btn btn-inline btn-secondary">
                        <Dropzone
                          onDrop={acceptedFiles => {
                            this.onDropFiles(acceptedFiles);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <GetOneIcon color="white" />
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </button>
                      <button type="button" className="btn btn-inline btn-warning">
                        <DelOneIcon color="white" onClick={this.onConfirmClear} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <span>{this.props.titleEmpty}</span>
              )}
            </div>
            <div className="card-body text-center">
              <input type="hidden" value={this.state.img} />
              {imgOk ? (
                <img className="img-fluid" src={this.state.img} alt="" />
              ) : (
                <Dropzone
                  onDrop={acceptedFiles => {
                    this.onDropFiles(acceptedFiles);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <UploadIcon className="text-primary inline-action" size={4} />
                      </div>
                    </section>
                  )}
                </Dropzone>
              )}
            </div>
          </div>
        </div>
        <ResponsiveConfirm
          show={this.state.confirm}
          onClose={this.onModalClose}
          onConfirm={this.onClear}
        />
      </div>
    );
  }
}
