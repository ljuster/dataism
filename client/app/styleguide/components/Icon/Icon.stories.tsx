import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Icon, { iconNameToUnicode, IconType } from './Icon';

// stories
storiesOf('Icon', module)
  .add('default', () => (
    <>
    {Object.keys(iconNameToUnicode).map((key: IconType, index) => (
    <div>
     <Icon name={key} /> {`– <Icon name="${key}" />`}
    </div>))}
    </>
  ))
