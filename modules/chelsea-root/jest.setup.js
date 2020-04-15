require('@babel/polyfill');

const response = {
  json: jest.fn(() => Promise.resolve({})),
  text: jest.fn(() => Promise.resolve('{}')),
};

global.fetch = jest.fn(() => Promise.resolve(response));
