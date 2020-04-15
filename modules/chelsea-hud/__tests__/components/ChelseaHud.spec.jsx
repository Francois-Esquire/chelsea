import React from 'react';
import { render } from '@testing-library/react';
import ChelseaHud from '../../src/components/ChelseaHud';

describe('ChelseaHud should render as expected', () => {
  it('module should render correct JSX', () => {
    const { asFragment } = render(<ChelseaHud />);
    expect(asFragment()).toMatchSnapshot();
  });
});
