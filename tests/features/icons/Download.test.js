import React from 'react';
import { shallow } from 'enzyme';
import { Download } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Download />);
  expect(renderedComponent.find('.icons-download').length).toBe(1);
});
