import React from 'react';
import { shallow } from 'enzyme';
import { Site } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Site />);
  expect(renderedComponent.find('.icons-site').length).toBe(1);
});
