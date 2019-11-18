import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/site/Modify';

describe('site/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      site: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.site-modify').length
    ).toBe(1);
  });
});
