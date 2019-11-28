import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/cause-main-type/DefaultPage';

describe('cause-main-type/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeMainType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.cause-main-type-default-page').length
    ).toBe(1);
  });
});
