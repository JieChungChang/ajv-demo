const worngTypeData = [
  {
    name: 'undefined',
    value: undefined,
  },
  {
    name: 'integer',
    value: 123,
  },
  {
    name: 'null',
    value: null,
  },
  {
    name: 'array',
    value: [],
  },
  {
    name: 'object',
    value: {},
  },
];


export default {
  dataPool: [
    {
      key: 'name',
      worngTypeData,
      wrongPatternData: [
        {
          name: 'include number',
          value: '張捷中2',
        },
        {
          name: 'include special character',
          value: '/*&^張捷中',
        },
      ],
    },
    {
      key: 'email',
      worngTypeData,
      wrongPatternData: [
        {
          name: 'not email format 1',
          value: '123.123.123',
        },
        {
          name: 'not email format 1',
          value: '124@123213',
        },
      ],
    },
    {
      key: 'password',
      worngTypeData,
      wrongPatternData: [
        {
          name: 'only number',
          value: '123123123',
        },
        {
          name: 'only characters',
          value: 'englishhhhhhh',
        },
      ],
    },
    {
      key: 'mobile',
      worngTypeData,
      wrongPatternData: [
        {
          name: 'not email format',
          value: '000000000',
        },
      ],
    },
    {
      key: 'gender',
      worngTypeData,
      wrongOptionData: [
        {
          name: 'out of LGBTQ options',
          value: 'female',
        },
      ],
    },
    {
      key: 'address',
      worngTypeData,
    },
  ],
};
