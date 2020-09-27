import React from 'react';
import { shallow } from 'enzyme';
import { InputCheckList } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputCheckList />);
  expect(renderedComponent.find('.ui-input-check-list').length).toBe(1);
});
