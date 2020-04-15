import React from 'react';
import { render } from '@testing-library/react';

import ChelseaScene from '../../src/components/Scene';

describe('ChelseaScene', () => {
  it('default export should return a function', () => {
    expect(ChelseaScene).toBeInstanceOf(Function);
  });

  it('module should render correct JSX', () => {
    const { asFragment } = render(<ChelseaScene />);
    expect(asFragment()).toMatchSnapshot();
  });
});
