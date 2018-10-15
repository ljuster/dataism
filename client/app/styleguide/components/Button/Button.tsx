import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';

const styles = `
  display: inline-block;
  padding: 15px;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  float: right;
  background: #1bdeea;
  font-size: 15px;
  font-family: 'ProximaNova-regular';
  border: none;
  text-align:center;

  &:hover {
    color: #fff;
    background: #1b7cea;
    cursor: pointer;
  }
`

const A = styled('a')`
  ${styles}
`

const Button = styled('button')`
  ${styles}
`

export default (props) => (
  props.asLink ? <A {...props} /> : <Button {...props} />
)
