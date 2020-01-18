import React from 'react';
import { shallow } from 'enzyme';
import { CenteredLoading3Dots } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CenteredLoading3Dots />);
  expect(renderedComponent.find('.ui-centered-loading-3-dots').length).toBe(1);
});
