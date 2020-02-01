import React from 'react';
import { shallow } from 'enzyme';
import { PageNotFound } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PageNotFound />);
  expect(renderedComponent.find('.ui-page-not-found').length).toBe(1);
});
