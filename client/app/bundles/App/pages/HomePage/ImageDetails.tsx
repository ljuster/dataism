import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import mq from 'styleguide/styles/layout/media-queries';
import Button from 'styleguide/components/Button/Button';
import { Col, Row } from 'styleguide/components/Layout';
import { Image } from './types';

const Wrapper = styled('div')`
    display: flex;
    flex-direction: column;
    max-width: 1024px;
    margin: 0 auto;
    box-shadow: 2px 4px 49px 0px #e8e8e8;
    background: #ffffff;
    margin-bottom: 100px;
    font-family: 'ProximaNova-regular';
    color: #393938;
    font-size: 12px;

    ${mq.medium(css`
      flex-direction: row;
    `)}
`

const Image = styled('div')`
    align-self: stretch;
    background-image: url('${(props: any) => props.url}');
    background-size: cover;
    height: 700px;

    ${mq.medium(css`
      height: auto;
      flex: 0 0 41.666667%;
      max-width: 41.666667%;
    `)}
`

const Content = styled('div')`
    padding: 5px 5px 5px 20px;
    box-sizing: border-box;

    ${mq.medium(css`
      flex: 0 0 8.333333%;
      max-width: 8.333333%;
    `)}
`

const Title = props => (
  <div className={css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .name {
      font-family: 'cera-thin';
      color: #5f5f5f;
      font-weight: 600;
      font-size: 22px;
      padding-right: 15px;
      padding-top: 10px;

      ${mq.medium(css`
        flex: 0 0 68.333333%;
        max-width: 58.333333%;
      `)}
    }

    .location {
      display: none;
      flex: 0 0 31.666667%;
      max-width: 41.666667%;
      text-align: right;
      padding-top: 12px;
      font-size: 16px;
      text-align: right;
      color: #404040;

      ${mq.medium(css`
        display: block;
      `)}
    }
  `}>
    <div className="name">{props.name}</div>
  </div>
);

const Description = styled('p')`
    font-family: 'ProximaNova-light';
    font-size: 15px;
    line-height: 1.5;
`

interface Props extends Image {
  locationTitle?: string
}

const ImageDetails = (props: Props) => (
  <>
  <Wrapper>
    <Image url={props.url} />
    <Content>
      <Title name={props.name} code={`props.code`} city_name={`props.city_name`} />
      <Description>{`props.short_description`}</Description>
      <Row className={css`
        flex-direction: column;
        ${mq.medium(css`
          flex-direction: row;
        `)}
      `}>
        <Col className={css`
          flex-basis: auto;
          width: 100%;
          justify-content: center;

          ${mq.medium(css`
            flex-basis: 75%;
            width: 75%;
            justify-content: flex-start;
          `)}
        `}>
        </Col>
        <Col className={css`
          flex-basis: auto;
          width: 100%;
          justify-content: flex-end;

          ${mq.medium(css`
            flex-basis: 25%;
            width: 25%;
          `)}
        `}>
          <Button asLink={true} href="#" className={css`
            width: 100%;
            margin-top: 10px;
            ${mq.medium(css`
              margin-top: 0px;
              width: auto;
            `)}
          `}>
            View
          </Button>
        </Col>
      </Row>
    </Content>
  </Wrapper>
  </>
)

export default ImageDetails
