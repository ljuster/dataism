import * as React from 'react';
import { storiesOf } from '@storybook/react';
import HelloTypescript from './HelloTypescript';

const props = (overrides: {} = {}) => ({
  name: 'Tony',
  ...overrides,
});

// stories
storiesOf('HelloTypescript', module).add('default', () => <HelloTypescript {...props()} />);
