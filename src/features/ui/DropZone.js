import React from 'react';
import Dropzone from 'react-dropzone';

export default function DropZone(props) {
  return (
    <Dropzone className="dropzone" {...props}>
      {props.children}
    </Dropzone>  
  );
};