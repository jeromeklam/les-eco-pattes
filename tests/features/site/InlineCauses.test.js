import React from 'react';
import { shallow } from 'enzyme';
import { InlineCauses } from '../../../src/features/site/InlineCauses';

describe('site/InlineCauses', () => {
  it('renders node with correct class name', () => {
    const props = {
      site: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineCauses {...props} />
    );

    expect(
      renderedComponent.find('.site-inline-causes').length
    ).toBe(1);
  });
});
