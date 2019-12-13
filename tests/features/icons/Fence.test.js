import React from 'react';
import { shallow } from 'enzyme';
import { Fence } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Fence />);
  expect(renderedComponent.find('.icons-fence').length).toBe(1);
});
