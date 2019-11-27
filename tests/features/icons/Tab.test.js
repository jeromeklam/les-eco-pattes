import React from 'react';
import { shallow } from 'enzyme';
import { Tab } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Tab />);
  expect(renderedComponent.find('.icons-tab').length).toBe(1);
});
