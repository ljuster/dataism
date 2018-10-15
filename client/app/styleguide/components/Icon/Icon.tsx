import * as React from 'react';
import styled from 'react-emotion';

const IconStyled = styled('span')`
    font-family: 'icomoon';
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    font-size: 32px;
    fill: #1fd1de;
    color: #19acea;
`

export type IconType = 'if_calendar'
| 'if_location'
| 'spa'
| 'cabana'
| 'fitness-center'
| 'if_basics-22_296812'
| 'drink'
| 'hottub'
| 'food'
| 'pool'
| 'cart'
| 'uniE90C'
| 'uniE90D'
| 'uniE90E'
| 'uniE90F'
| 'uniE910'
| 'uniE911'
| 'uniE912'
| 'uniE913'
| 'uniE914'
| 'beac'
| 'uniE916'
| 'uniE917'
| 'uniE918'
| 'uniE919'
| 'uniE91A'
| 'menu'
| 'remov'
| 'angle_u'
| 'angle_dow';

export const iconNameToUnicode: { [K in IconType ]: string } = {
  'if_calendar': '&#xe900',
  'if_location': '&#xe901',
  'spa': '&#xe902',
  'cabana': '&#xe903',
  'fitness-center': '&#xe904',
  'if_basics-22_296812': '&#xe905',
  'drink': '&#xe906',
  'hottub': '&#xe907',
  'food': '&#xe908',
  'pool': '&#xe909',
  'cart': '&#xe90a',
  'uniE90C': '&#xe90c',
  'uniE90D': '&#xe90d',
  'uniE90E': '&#xe90e',
  'uniE90F': '&#xe90f',
  'uniE910': '&#xe910',
  'uniE911': '&#xe911',
  'uniE912': '&#xe912',
  'uniE913': '&#xe913',
  'uniE914': '&#xe914',
  'beac': '&#xe915',
  'uniE916': '&#xe916',
  'uniE917': '&#xe917',
  'uniE918': '&#xe918',
  'uniE919': '&#xe919',
  'uniE91A': '&#xe91a',
  'menu': '&#xe9bd',
  'remov': '&#xf00d',
  'angle_u': '&#xf106',
  'angle_dow': '&#xf107',
 };

 interface Props {
   name?: string
   code?: string
   className?: any
 }

const Icon = (props: Props) => (
  !!props.name 
    ? <IconStyled dangerouslySetInnerHTML={{__html: iconNameToUnicode[props.name]}} {...props} />
    : <IconStyled dangerouslySetInnerHTML={{__html: `&#x${props.code}`}} {...props} />
)

export default Icon;
