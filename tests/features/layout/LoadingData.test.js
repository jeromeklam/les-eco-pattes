import React from 'react';
import { shallow } from 'enzyme';
import { LoadingData } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LoadingData />);
  expect(renderedComponent.find('.layout-loading-data').length).toBe(1);
});
