import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/site-type/Input';

describe('site-type/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      siteType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.site-type-input').length
    ).toBe(1);
  });
});
