import React from 'react';
import { shallow } from 'enzyme';
import { Col } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Col />);
  expect(renderedComponent.find('.ui-col').length).toBe(1);
});
