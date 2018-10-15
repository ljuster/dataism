import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion'
import mq from 'styleguide/styles/layout/media-queries';

const Container = styled('div')`
  display: 'flex';
  max-width: 540px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 auto;

  ${mq.medium(css`
    max-width: 720px;
  `)}

  ${mq.large(css`
    max-width: 992px;
  `)}

  ${mq.xLarge(css`
    max-width: 1140px;
  `)}
`

const ContainerFluid = styled('div')`
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
    width: 100%;
 `

export default (props) => !!props.fluid ? <ContainerFluid {...props} /> : <Container {...props} />;
