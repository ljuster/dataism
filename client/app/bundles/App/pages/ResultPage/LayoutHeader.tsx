import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import { Col, Row, Container } from 'styleguide/components/Layout'

const Header = styled('header')`
    top: 0;
    position: fixed;
    z-index: 1000;
    margin-right: auto;
    margin-left: auto;
    width: 100%;
`

interface Props {
  SecondRowComponent?: any
}

const LayoutHeader = ({ SecondRowComponent }: Props)=> (
  <Header>
    <Container fluid={true} className={css`
      height: 55px;
      background-color: #eec8c8;
      z-index:1000;
      display: flex;
      align-items: center;
    `}>
    <Row>
        <Col >
          <img src="/assets/83.png" className={css`
            max-width: 60px;
            box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
          `} />
            <h2 className={css`
            align-items: center;
            font-color: white;
            `}>Leora C. Juster</h2></Col>
    </Row>
    </Container>
    {!!SecondRowComponent && (
       <Container fluid={true} className={css`
        height: 55px;
        background-color: #fff;
        box-shadow: 2px 10px 31px -5px rgba(0, 0, 0, 0.13);
        display: flex;
        align-items: center;
        justify-content: center;
      `}>
        <Row>
          <Container>
            <Col width="100%">
              <SecondRowComponent />
            </Col>
          </Container>
        </Row>
      </Container>
    )}
  </Header>
)

export default LayoutHeader;
