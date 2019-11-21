import React from 'react';
import { shallow } from 'enzyme';
import { LoadError } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LoadError />);
  expect(renderedComponent.find('.layout-load-error').length).toBe(1);
});
