import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { validateForSignUp } from 'model/signUp';
import { normalizeAllErrors, normalizeSingleError } from 'model/validator';
import axios from 'axios';

import Title from '../components/Title';
import Input from '../components/Input';
import Button from '../components/Button';

const SignUp = ({ baseUrl }) => {
  const [inputs, setInputs] = useState({});
  const [invalids, setInvalids] = useState({});
  const [hasSubmit, setHasSubmit] = useState(false);

  const handleOnChange = ({ currentTarget: { name, value } }) => {
    if (!value) {
      delete inputs[name];
      setInputs({ ...inputs });
    } else setInputs({ ...inputs, [name]: value });
  };

  const validateAll = () => {
    let isValid = false;
    try {
      isValid = validateForSignUp(inputs);
    } catch (error) {
      setInvalids(normalizeAllErrors(error));
    }
    return isValid;
  };

  const validateSingle = (target, value) => {
    let isValid = false;
    try {
      isValid = validateForSignUp({ ...inputs, [target]: value });
      if (isValid) setInvalids({});
    } catch (error) {
      setInvalids(normalizeSingleError(error, invalids, target));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setHasSubmit(true);
    if (!validateAll()) return;
    const response = await axios.post(`${baseUrl}/signUp`, inputs);
    if (response.status === 200) {
      alert('success');
      setInputs({});
    }
  };
  return (
    <>
      <div style={{ width: '360px' }}>
        <Title text="Sign Up" />
        <Input
          label="User Name"
          name="name"
          onChange={handleOnChange}
          value={inputs.name || ''}
          invalid={!!invalids.name}
          message={invalids.name}
          validate={validateSingle}
          hasSubmit={hasSubmit}
        />
        <Input
          label="Email"
          name="email"
          onChange={handleOnChange}
          value={inputs.email || ''}
          invalid={!!invalids.email}
          message={invalids.email}
          validate={validateSingle}
          hasSubmit={hasSubmit}
        />
        <div style={{ margin: '2rem' }} />
        <Input
          label="Password"
          name="password"
          onChange={handleOnChange}
          value={inputs.password || ''}
          invalid={!!invalids.password}
          message={invalids.password}
          validate={validateSingle}
          hasSubmit={hasSubmit}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleOnChange}
          value={inputs.confirmPassword || ''}
          invalid={!!invalids.confirmPassword}
          message={invalids.confirmPassword}
          validate={validateSingle}
          hasSubmit={hasSubmit}
        />
        <Button onClick={handleFormSubmit}>Submit</Button>
      </div>
    </>
  );
};

export default SignUp;

SignUp.propTypes = { baseUrl: PropTypes.string };
SignUp.defaultProps = { baseUrl: undefined };
