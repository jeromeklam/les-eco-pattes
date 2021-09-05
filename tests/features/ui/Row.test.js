import React from 'react';
import { shallow } from 'enzyme';
import { Row } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Row />);
  expect(renderedComponent.find('.ui-row').length).toBe(1);
});
