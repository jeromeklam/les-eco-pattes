import React from 'react';
import { shallow } from 'enzyme';
import { SimpleLabel } from '../../../src/features/data/SimpleLabel';

describe('data/SimpleLabel', () => {
  it('renders node with correct class name', () => {
    const props = {
      data: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SimpleLabel {...props} />
    );

    expect(
      renderedComponent.find('.data-simple-label').length
    ).toBe(1);
  });
});
