import React from 'react';
import { shallow } from 'enzyme';
import { Copyright } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Copyright />);
  expect(renderedComponent.find('.ui-copyright').length).toBe(1);
});
