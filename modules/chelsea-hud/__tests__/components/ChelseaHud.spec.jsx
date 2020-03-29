import React from 'react';
import { shallow } from 'enzyme';
import ChelseaHud from '../../src/components/ChelseaHud';

describe('ChelseaHud should render as expected', () => {
  it('module should render correct JSX', () => {
    const renderedModule = shallow(<ChelseaHud />);
    expect(renderedModule.find('div')).toMatchSnapshot();
  });
});
