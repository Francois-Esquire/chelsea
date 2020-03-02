require('@babel/polyfill');

global.fetch = jest.fn(() => Promise.resolve({
  json: jest.fn(() => Promise.resolve({})),
  text: jest.fn(() => Promise.resolve('{}')),
}));
