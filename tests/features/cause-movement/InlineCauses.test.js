import React from 'react';
import { shallow } from 'enzyme';
import { InlineCauses } from '../../../src/features/cause-movement';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineCauses />);
  expect(renderedComponent.find('.cause-movement-inline-causes').length).toBe(1);
});
