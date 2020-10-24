import React, { Component } from 'react';
import { InputCheckList as RBFInputCheckList } from 'react-bootstrap-front';
import { 
  AddOne as AddOneIcon,  
  DelOne as DelOneIcon,  
  AddLine as AddOneLine,
  CloseLines,  
  OpenLines,  
  Checked as CheckedLine,
  UnChecked as UncheckedLine,
} from '../icons';

export default class InputCheckList extends Component {
  render() {
    return (
      <RBFInputCheckList
        {...this.props}
        addIcon={<AddOneIcon />}
        delIcon={<DelOneIcon className="text-warning" size={0.9} />}
        addLineIcon={<AddOneLine className="text-primary" size={0.9} />}
        delLineIcon={<DelOneIcon className="text-warning-line" size={0.9} />}
        openLinesIcon={<OpenLines className="text-secondary"  size={0.9}/>}
        closeLinesIcon={<CloseLines className="text-secondary" size={0.9}/> }
        checkedLineIcon={<CheckedLine className="text-secondary" />}
        uncheckedLineIcon={<UncheckedLine className="text-secondary"/>}
        checkedLine={"item-done"}
      />
    );
  }
}
