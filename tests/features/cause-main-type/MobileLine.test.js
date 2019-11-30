import React from 'react';
import { shallow } from 'enzyme';
import { MobileLine } from '../../../src/features/cause-main-type';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MobileLine />);
  expect(renderedComponent.find('.cause-main-type-mobile-line').length).toBe(1);
});
