import * as React from 'react';
import {Col, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

interface TextAreaProps {
  id: string;
  label: string;
  value?: any;
  labelSize?: number;
  horizontal?: boolean;
  rows?: number;
  onChange?: (val: any) => void;
}

const noop = (() => ({}));

export const TextAreaField = ({ id, label, value = '', labelSize = 4, horizontal = false, rows = 10, onChange =  noop }: Partial<TextAreaProps> = {}) => {
  if (horizontal) {
    return (
      <FormGroup controlId={id}>
        <Col sm={labelSize}>
          <ControlLabel htmlFor={id}>{label}</ControlLabel>
        </Col>
        <Col sm={12 - labelSize}>
          <FormControl
            id={id}
            componentClass="textarea"
            rows={rows}
            placeholder={`Enter ${label}`}
            value={value}
            onChange={(evt: any) => onChange(evt.target.value)}/>
        </Col>
      </FormGroup>
    );
  }

  return (
    <FormGroup controlId={id}>
      <ControlLabel htmlFor={id}>{label}</ControlLabel>
      <FormControl
        id={id}
        componentClass="textarea"
        rows={rows}
        placeholder={`Enter ${label}`}
        value={value}
        onChange={(evt: any) => onChange(evt.target.value)}/>
    </FormGroup>
  );
};
