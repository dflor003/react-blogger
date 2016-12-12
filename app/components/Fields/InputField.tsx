import * as React from 'react';
import {Col, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value?: any;
  labelSize?: number;
  horizontal?: boolean;
  onChange?: (val: any) => void;
}

const noop = (() => ({}));

export const InputField = ({ id, label, type = 'text', value = '', labelSize = 4, horizontal = false, onChange =  noop }: Partial<InputFieldProps> = {}) => {
  if (horizontal) {
    return (
      <FormGroup controlId={id}>
        <Col sm={labelSize}>
          <ControlLabel htmlFor={id}>{label}</ControlLabel>
        </Col>
        <Col sm={12 - labelSize}>
          <FormControl
            id={id}
            type="text"
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
        type="text"
        placeholder={`Enter ${label}`}
        value={value}
        onChange={(evt: any) => onChange(evt.target.value)}/>
    </FormGroup>
  );
};
