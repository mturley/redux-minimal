import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, HelpBlock, Row, Col } from 'react-bootstrap';

// Form field component
export default class FormField extends Component {
  // the field content
  content() {
    const { theme, label } = this.props;
    if (theme === 'other_theme') {
      // layout for some other theme
      return null;
    }
    // default theme: 2col
    return (
      <Row>
        <Col sm={3}>{label}</Col>
        <Col sm={9}>{this.field()}</Col>
      </Row>
    );
  }

  // the field itself
  field() {
    const { input, componentClass, type, placeholder, children } = this.props;
    return (
      <FormControl {...input} componentClass={componentClass} type={type} placeholder={placeholder}>
        {children}
      </FormControl>
    );
  }

  // render
  render() {
    const { className, doValidate, meta } = this.props;
    if (doValidate) {
      return (
        <FormGroup
          className={className}
          validationState={(!meta.touched && (meta.error ? 'error' : 'success')) || null}
        >
          {this.content()}
          <FormControl.Feedback />
          <HelpBlock>
            {meta.touched && meta.error ? meta.error : null}
          </HelpBlock>
        </FormGroup>
      );
    }
    return (
      <FormGroup className={className}>
        {this.content()}
      </FormGroup>
    );
  }
}

// prop checks
FormField.propTypes = {
  children: PropTypes.func,
  meta: PropTypes.object,
  input: PropTypes.object,
  theme: PropTypes.string, // 2col (default), etc
  doValidate: PropTypes.bool, // true or false
  label: PropTypes.any, // the field text or a react component if we have html inside (empty string by default)
  componentClass: PropTypes.string, // input (by default), textarea, select
  type: PropTypes.string, // input type: text (by default), password
  placeholder: PropTypes.string, // input placeholder (empty string by default)
  className: PropTypes.string, // the class name (empty string by default)
};

FormField.defaultProps = {
  children: null,
  meta: {},
  input: {},
  theme: '2col',
  doValidate: true,
  label: '',
  componentClass: 'input',
  type: 'text',
  placeholder: '',
  className: '',
};
