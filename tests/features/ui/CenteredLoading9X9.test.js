import React from 'react';
import { shallow } from 'enzyme';
import { CenteredLoading9X9 } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CenteredLoading9X9 />);
  expect(renderedComponent.find('.ui-centered-loading-9-x-9').length).toBe(1);
});
