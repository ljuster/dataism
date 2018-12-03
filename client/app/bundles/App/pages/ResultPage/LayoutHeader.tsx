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
      height: 55px !important;
      background-color: #21b3d1 !important;
      z-index:1000;
      display: flex;
      align-items: center;
    `}>
    <Row>
        <Col width="50%">
          <img src="/assets/logo.png" className={css`
            max-width: 160px;
          `} />
        </Col>
        <Col width="50%">
        </Col>
    </Row>
    </Container>
    {!!SecondRowComponent && (
       <Container fluid={true} className={css`
        height: 55px !important;
        background-color: #fff !important;
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
