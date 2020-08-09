import React from 'react';
import { shallow } from 'enzyme';
import { SiteExtern } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SiteExtern />);
  expect(renderedComponent.find('.icons-site-extern').length).toBe(1);
});
