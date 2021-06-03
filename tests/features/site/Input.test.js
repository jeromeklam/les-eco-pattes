import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/site/Input';

describe('site/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      site: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.site-input').length
    ).toBe(1);
  });
});
