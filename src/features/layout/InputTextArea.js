import Editor from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import createImagePlugin from 'draft-js-image-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import React, { Component } from 'react';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

const imagePlugin = createImagePlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, imagePlugin];

export default class InputTextArea extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    let content = "";
    if (this.props.value) {
      content = this.props.value;
    } else {
      content = "<p/>"
    }
    this.state = {
      editorState: EditorState.createWithContent(convertFromHTML(content)),
    };

    
    this.focus = this.focus.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  focus() {
    this.editor.focus();
  }

  onChange = editorState => {
    this.setState({
      editorState,
    });
    const content = this.state.editorState.getCurrentContent();
    const event = {
      target: {
        name: this.props.name,
        value: convertToHTML(content),
      },
    };
    this.props.onChange(event);
  };

  render() {
    return (
      <div className="form-group row">
        <label className="col-sm-6 col-form-label">
          {this.props.label}
          {this.props.required && <span>&nbsp;*</span>}
        </label>
        <div className="col-sm-30">
          <div className="editor" onClick={this.focus}>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              plugins={plugins}
              ref={element => {
                this.editor = element;
              }}
            />
            <InlineToolbar />
          </div>
        </div>
      </div>
    );
  }
}
