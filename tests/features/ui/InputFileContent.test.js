import React from 'react';
import { shallow } from 'enzyme';
import { InputFileContent } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputFileContent />);
  expect(renderedComponent.find('.ui-input-file-content').length).toBe(1);
});
