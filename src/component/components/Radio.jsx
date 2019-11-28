import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin-right: 1rem;
  margin-bottom: 0.5rem;
`;
const Label = styled.span`
  margin-left: 0.5rem;
  font-size: 0.875rem;
`;

const Radio = ({
  val, onChange, validate, ...props
}) => {
  const handleOnChange = (e) => {
    const { name, value } = e.currentTarget;
    onChange(e);
    validate(name, value);
  };
  return (
    <Container>
      <input
        name="gender"
        type="radio"
        value={val}
        onChange={handleOnChange}
        {...props}
      />
      <Label>{val}</Label>
    </Container>
  );
};

Radio.propTypes = {
  val: PropTypes.string,
  onChange: PropTypes.func,
  validate: PropTypes.func,
};
Radio.defaultProps = {
  val: undefined,
  onChange: () => {},
  validate: () => {},
};

export default Radio;
