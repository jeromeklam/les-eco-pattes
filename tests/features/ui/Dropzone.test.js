import React from 'react';
import { shallow } from 'enzyme';
import { Dropzone } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Dropzone />);
  expect(renderedComponent.find('.ui-dropzone').length).toBe(1);
});
