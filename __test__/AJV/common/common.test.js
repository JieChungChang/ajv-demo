import Ajv from 'ajv';
import addAjvErrors from 'ajv-errors';
import validate from '../../../src/model/validator';
import CommonSchema from '../../../src/model/schema/common.json';
import cases from './cases';

const SCHEMA_ID = 'http://ajv-demo/common.json#/definitions/';

const ajv = new Ajv({
  $data: true,
  allErrors: true,
  jsonPointers: true,
  schemas: {
    Common: CommonSchema,
  },
});

addAjvErrors(ajv);

describe('AJV validation rule for common data', () => {
  // Wrong type data input
  const { dataPool } = cases;
  dataPool.forEach((data) => {
    data.worngTypeData.forEach((type) => {
      describe(`Input wrong type(${type.name}) data of ${data.key}`, () => {
        if (data.key === 'gender') {
          test('get "should be string" and "one of LGBTQ" error message', () => {
            try {
              validate(type.value, `${SCHEMA_ID}${data.key}`);
            } catch (error) {
              expect(error.length).toEqual(2);
              expect(error[0].message).toEqual('should be string');
              expect(error[1].message).toEqual('Should be one of LGBTQ');
            }
          });
        } else {
          test('get "should be string" error message', () => {
            try {
              validate(type.value, `${SCHEMA_ID}${data.key}`);
            } catch (error) {
              expect(error.length).toEqual(1);
              expect(error[0].message).toEqual('should be string');
            }
          });
        }
      });
    });
  });

  // name valistion rules test
  const nameWorngPatternDataPool = dataPool[0].wrongPatternData;
  nameWorngPatternDataPool.forEach((data) => {
    describe(`Input ${data.name} of ${dataPool[0].key}`, () => {
      test('get "Please provide valid name" error message', () => {
        try {
          validate(data.value, `${SCHEMA_ID}${dataPool[0].key}`);
        } catch (error) {
          expect(error.length).toEqual(1);
          expect(error[0].message).toEqual('Please provide valid name');
        }
      });
    });
  });
  const emailWorngPatternDataPool = dataPool[1].wrongPatternData;
  emailWorngPatternDataPool.forEach((data) => {
    describe(`Input ${data.name} of ${dataPool[1].key}`, () => {
      test('get "Please provide valid email" error message', () => {
        try {
          validate(data.value, `${SCHEMA_ID}${dataPool[1].key}`);
        } catch (error) {
          expect(error.length).toEqual(1);
          expect(error[0].message).toEqual('Please provide valid email');
        }
      });
    });
  });
  const passwordWorngPatternDataPool = dataPool[2].wrongPatternData;
  passwordWorngPatternDataPool.forEach((data) => {
    describe(`Input ${data.name} of ${dataPool[2].key}`, () => {
      test('get "Please provide valid password" error message', () => {
        try {
          validate(data.value, `${SCHEMA_ID}${dataPool[2].key}`);
        } catch (error) {
          expect(error.length).toEqual(1);
          expect(error[0].message).toEqual('Please provide valid password');
        }
      });
    });
  });
  const genderWorngOptionData = dataPool[4].wrongOptionData;
  genderWorngOptionData.forEach((data) => {
    describe(`Input ${data.name} of ${dataPool[4].key}`, () => {
      test('get "Please provide valid password" error message', () => {
        try {
          validate(data.value, `${SCHEMA_ID}${dataPool[4].key}`);
        } catch (error) {
          expect(error.length).toEqual(1);
          expect(error[0].message).toEqual('Should be one of LGBTQ');
        }
      });
    });
  });
});
