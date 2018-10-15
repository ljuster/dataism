import * as React from 'react';
import styled from 'react-emotion';

const Col = styled('div')`
    ${(props: any) => !!props.width ? `flex-basis: ${props.width};` : ''}
    ${(props: any) => !!props.width ? `width: ${props.width};` : ''}
    display: flex;
    align-items: center;
`

export default (props) => <Col {...props} />
