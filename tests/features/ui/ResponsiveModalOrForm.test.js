import React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveModalOrForm } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ResponsiveModalOrForm />);
  expect(renderedComponent.find('.ui-responsive-modal-or-form').length).toBe(1);
});
