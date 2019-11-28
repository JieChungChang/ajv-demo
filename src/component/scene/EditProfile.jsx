import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { validateForEditProfile } from 'model/editProfile';
import { normalizeAllErrors, normalizeSingleError } from 'model/validator';
import axios from 'axios';

import Title from '../components/Title';
import Input from '../components/Input';
import Button from '../components/Button';
import Label from '../components/Label';
import Message from '../components/Message';
import Radio from '../components/Radio';

const EditProfile = ({ baseUrl }) => {
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
      isValid = validateForEditProfile(inputs);
    } catch (error) {
      setInvalids(normalizeAllErrors(error));
    }
    return isValid;
  };

  const validateSingle = (target, value) => {
    let isValid = false;
    try {
      isValid = validateForEditProfile({ ...inputs, [target]: value });
      if (isValid) setInvalids({});
    } catch (error) {
      setInvalids(normalizeSingleError(error, invalids, target));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setHasSubmit(true);
    if (!validateAll()) return;
    const response = await axios.post(`${baseUrl}/editProfile`, inputs);
    if (response.status === 200) {
      alert('success');
      setInputs({});
    }
  };
  return (
    <>
      <div style={{ width: '360px' }}>
        <Title text="Edit Profile" />
        <Input
          label="Name"
          name="name"
          onChange={handleOnChange}
          value={inputs.name || ''}
          invalid={!!invalids.name}
          message={invalids.name}
          validate={validateSingle}
          hasSubmit={hasSubmit}
        />
        <Input
          label="Mobile"
          name="mobile"
          onChange={handleOnChange}
          value={inputs.mobile || ''}
          invalid={!!invalids.mobile}
          message={invalids.mobile}
          validate={validateSingle}
          hasSubmit={hasSubmit}
        />
        <div style={{ margin: '2rem' }} />
        <Input
          label="Address"
          name="address"
          onChange={handleOnChange}
          value={inputs.address || ''}
          invalid={!!invalids.address}
          message={invalids.address}
          validate={validateSingle}
          hasSubmit={hasSubmit}
        />
        <Label id="gender">Gender</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Radio
            val="Gay"
            onChange={handleOnChange}
            validate={validateSingle}
            checked={inputs.gender === 'Gay'}
          />
          <Radio
            val="Bisexual"
            onChange={handleOnChange}
            validate={validateSingle}
            checked={inputs.gender === 'Bisexual'}
          />
          <Radio
            val="Transgender"
            onChange={handleOnChange}
            validate={validateSingle}
            checked={inputs.gender === 'Transgender'}
          />
          <Radio
            val="Queer"
            onChange={handleOnChange}
            validate={validateSingle}
            checked={inputs.gender === 'Queer'}
          />
          <Radio
            val="Lesbian"
            onChange={handleOnChange}
            validate={validateSingle}
            checked={inputs.gender === 'Lesbian'}
          />
        </div>
        <Message message={invalids.gender} />
        <Button onClick={handleFormSubmit}>Submit</Button>
      </div>
    </>
  );
};

export default EditProfile;

EditProfile.propTypes = { baseUrl: PropTypes.string };
EditProfile.defaultProps = { baseUrl: undefined };
