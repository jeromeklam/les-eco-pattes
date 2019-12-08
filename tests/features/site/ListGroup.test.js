import React from 'react';
import { shallow } from 'enzyme';
import { ListGroup } from '../../../src/features/site/ListGroup';

describe('site/ListGroup', () => {
  it('renders node with correct class name', () => {
    const props = {
      site: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListGroup {...props} />
    );

    expect(
      renderedComponent.find('.site-list-group').length
    ).toBe(1);
  });
});
