import React from 'react';
import { shallow } from 'enzyme';
import { SearchModal } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SearchModal />);
  expect(renderedComponent.find('.ui-search-modal').length).toBe(1);
});
