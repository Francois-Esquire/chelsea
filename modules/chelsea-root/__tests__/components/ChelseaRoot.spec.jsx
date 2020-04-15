import React from 'react';
import { render } from '@testing-library/react';

import AppConfig from '../../src/config/appConfig';
import Chelsea from '../../src/components/Chelsea';

describe('Chelsea Root Module', () => {
  it('default export should return a function', () => {
    expect(Chelsea).toBeInstanceOf(Function);
  });

  it('module should render correct JSX', () => {
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn({ toJS: jest.fn({}) }),
    };
    const isLoading = jest.fn(() => false);
    const loadedWithErrors = jest.fn(() => false);
    const moduleState = {
      graphql: {},
    };
    const { asFragment } = render(
      <Chelsea
        store={store}
        isLoading={isLoading}
        loadedWithErrors={loadedWithErrors}
        moduleState={moduleState}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('appConfig should contain accurate csp', () => {
    expect(AppConfig.csp).toBeDefined();
    expect(typeof AppConfig.csp).toBe('string');
  });
});
