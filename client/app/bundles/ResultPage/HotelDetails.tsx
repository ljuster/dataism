import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import mq from 'styleguide/styles/layout/media-queries';
import Icon from 'styleguide/components/Icon/Icon';
import Button from 'styleguide/components/Button/Button';
import { Col, Row } from 'styleguide/components/Layout';
import { Hotel, Product } from './types';

const Price = (props: Product) => (
  <div className={css`
    display: flex;
    flex-direction: column;
    text-transform: uppercase;
    text-align: center;

    font-family: 'ProximaNova-regular';
    font-size: 14px;
    text-transform: uppercase;
    text-align: center;
    line-height: 25px;
    color: #848484;
    font-weight: 600;
    width: 33.33%;
    flex-basis: 33.33%;
    padding-bottom: 10px;

    .title {
      font-weight: 600;
      letter-spacing: 1px !important;
      font-size: 15px !important;
      color: #4c4c4c !important;
      margin-bottom: 3px !important;
    }

    .starting-at {
      display: none;
      font-weight: 100;
      font-family: proximaNova-light !important;
      font-size: .8em !important;
      letter-spacing: 1px !important;
      color: #000;
      margin-bottom: 5px;

      ${mq.large(css`
        display: block;
      `)}
    }

    .price {
      font-size: 25px;
      font-family: 'ProximaNova-light';
      color: #4a4a4a;
      font-weight: normal;
      display: block;

      ${mq.large(css`
        font-size: 35px;
      `)}
    }
  `}>
    <div className="title">{props.name}</div>
    <div className="starting-at">starting at</div>
    <div className="price">{`$${props.product_price}`}</div>
  </div>
)

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

const LocationTitle = styled('h2')`
    max-width: 1024px;
    margin: 0 auto;
    padding-bottom: 25px;
    font-family: 'cera-thin';
    color: #5e5e5e;
    font-weight: 500;
    line-height: 1.1;
    font-size: 2rem;
`

const Image = styled('div')`
    align-self: stretch;
    background-image: url('${(props: any) => props.url}');
    background-size: cover;
    height: 500px;

    ${mq.medium(css`
      height: auto;
      flex: 0 0 41.666667%;
      max-width: 41.666667%;
    `)}
`

const Content = styled('div')`
    padding: 15px 30px 15px 30px;
    box-sizing: border-box;

    ${mq.medium(css`
      flex: 0 0 58.333333%;
      max-width: 58.333333%;
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
    <div className="location">{`${props.city_name}, ${props.code}`}</div>
  </div>
);

const Description = styled('p')`
    font-family: 'ProximaNova-light';
    font-size: 15px;
    line-height: 1.5;
`
const IconStyled = (props) => <Icon code={props.code} className={css`margin-right: 10px`} />

const Amenities = ({ amenities }:{ amenities: Array<string>}) => (
  <>
    {amenities.map(elem => (
      <IconStyled code={elem} />
    ))}
  </>
)

interface Props extends Hotel {
  locationTitle?: string
}

const HotelDetails = (props: Props) => (
  <>
  {!!props.locationTitle && <LocationTitle>{props.locationTitle}</LocationTitle>}
  <Wrapper>
    {/* TODO: remove base url */}
    <Image url={`https://resortpass.com/${props.image}`} />
    <Content>
      <Title name={props.name} code={props.code} city_name={props.city_name} />
      <Amenities amenities={props.amenities} />
      <Description>{props.short_description}</Description>
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
        {props.products
            .filter(elem => !!elem.name && !!elem.product_price)
            .map(elem => <Price {...elem} />)}
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
            ${mq.large(css`
              padding: 15px 32px;
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

export default HotelDetails