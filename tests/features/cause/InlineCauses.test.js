import React from 'react';
import { shallow } from 'enzyme';
import { InlineCauses } from '../../../src/features/cause';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineCauses />);
  expect(renderedComponent.find('.cause-inline-causes').length).toBe(1);
});
