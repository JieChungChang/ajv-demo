import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Label from './Label';
import Message from './Message';

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  transition: border-color ease-in-out 0.15s;
  border: 1px solid #e0e0e0;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  appearance: none;

  ${({ invalid }) => (invalid
    ? css`
          border: 1px solid red;
          color: red;
        `
    : css`
          &:focus {
            border-color: #9654ff;
          }
        `)}

  &:disabled {
    opacity: 1;
    background-color: gray;
  }
`;

const TextInput = ({
  type,
  id,
  label,
  focused,
  message,
  invalid,
  disabled,
  validate,
  hasSubmit,
  ...props
}) => {
  const [validateByKeyUp, setValidateByKeyUp] = useState(false);

  const handleBlur = (e) => {
    const { name, value } = e.currentTarget;
    if (validateByKeyUp) return;
    validate(name, value);
    setValidateByKeyUp(true);
  };

  const handleKeyUp = (e) => {
    const { name, value } = e.currentTarget;
    if (!validateByKeyUp) return;
    validate(name, value);
  };

  useEffect(() => {
    if (hasSubmit) setValidateByKeyUp(true);
  }, [hasSubmit]);

  return (
    <div style={{ marginBottom: '0.875rem' }}>
      <Label id={id}>{label}</Label>
      <StyledInput
        type={type}
        id={id}
        invalid={invalid}
        disabled={disabled}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        {...props}
      />
      <Message message={message} />
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  focused: PropTypes.bool,
  message: PropTypes.string,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  validate: PropTypes.func,
  hasSubmit: PropTypes.bool,
};
TextInput.defaultProps = {
  type: 'text',
  id: undefined,
  label: undefined,
  focused: undefined,
  message: undefined,
  invalid: undefined,
  disabled: false,
  hasSubmit: false,
  validate: () => {},
};

export default TextInput;
