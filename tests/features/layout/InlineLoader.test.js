import React from 'react';
import { shallow } from 'enzyme';
import { InlineLoader } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineLoader />);
  expect(renderedComponent.find('.layout-inline-loader').length).toBe(1);
});
