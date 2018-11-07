import * as React from 'react';
import * as moment from 'moment';
import { css } from 'emotion';
import mq from 'styleguide/styles/layout/media-queries';
import _ from 'lodash';
import Autocomplete from 'react-autocomplete';
import { CountryState, City } from './types';
import api from 'lib/api/apiCall';
import Icon from 'styleguide/components/Icon/Icon';
import Datepicker from 'styleguide/components/Datepicker/Datepicker';

interface Option {
  label: string
  value: string
}

interface Props {
  selected_state: CountryState | null
  selected_city: City | null
  selected_date: moment.Moment | null
  onDateChange: (date: moment.Moment) => void
  onLocationSelect: (location: CountryState | City) => void
}

type ApiDataType = Array<CountryState> | Array<City> | []

interface ComponentState {
  loadedDataType: 'state' | 'city' | null
  apiData: ApiDataType
  value: string
  focused: boolean
}

const PLACEHOLDER = 'City, state or zip code';

class Filter extends React.Component<Props, ComponentState> {

  constructor(props) {
    super(props);

    this.state = {
      loadedDataType: null,
      apiData: [],
      value: '',
      focused: false,
    }
  }

  public fetchData = (str) => {
    if (str.length === 0) return Promise.resolve();
    return new Promise((res, rej) => {
      api.get(`/q/${str}`, {}).then((result: any)  => {
        if (result.length > 0) {
          if (!!result[0].name) {
            this.setState({
              loadedDataType: 'state',
              apiData: result,
            }, () => res())
          } else {
            this.setState({
              loadedDataType: 'city',
              apiData: result,
            }, () => res())
          }
        }
      })
    });
  }

  public getOptions = (): Option[] => {
    const { loadedDataType, apiData } = this.state;

    if (apiData.length === 0) return []

    if (loadedDataType === 'city') {
      let cities = apiData as Array<City>
      return cities
              .map(elem => ({ label: `${elem.city}, ${elem.state_code}`, value: elem.id.toString() }))
    }

    if (loadedDataType === 'state') {
      let countryStates = apiData as Array<CountryState>
      return countryStates
                  .filter(elem => !!elem.active)
                  .map(elem => ({ label: elem.name, value: elem.code }))
    }

    return []
  }



  public getInputValue = () => {
    const { focused, value } = this.state;
    const { selected_city, selected_state } = this.props;

    if (focused) {
      return value
    }

    if (!!selected_city) {
      return `${selected_city.city}, ${selected_city.state_code}`;
    }

    if (!!selected_state) {
      return selected_state.name
    }

    return PLACEHOLDER
  }

  public onChange = (e, value) => {
    this.setState({
      loadedDataType: null,
      value,
      apiData: [],
    },() => this.fetchData(value))
  }

  public onFocus = () => {
    this.setState({
      focused: true,
      apiData: [],
    }, () => {

      let str = this.state.value

      if (str.length === 0 && !!this.props.selected_city) {
        str = this.props.selected_city.city
      }

      if (str.length === 0 && !!this.props.selected_state) {
        str = this.props.selected_state.name
      }

      if (str.length === 0) return

      this.fetchData(str)

    })
  }


  public onSelect = (value: string) => {
    if (this.state.loadedDataType === 'state') {
      const location = _.find(this.state.apiData, (elem: CountryState) => elem.code === value)
      this.props.onLocationSelect(location)
    } else {
      const location = _.find(this.state.apiData, (elem: City) => elem.id.toString() === value)
      this.props.onLocationSelect(location)
    }
  }

  render() {
    return (
      <div className={css`
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-around;

        ${mq.medium(css`
          width: 400px;
        `)}
      `}>
        <div className={css`
            display: flex;
            align-items: center;
        `}>
          <Icon name="if_location" className={css`
            position: relative;
            display: block;
            width: 25px;
            height: 25px;
            font-size: 18px;
            color: #9c9c9b;
            z-index: 10;
            left: 5px;
            top: 4px;
          `} />
          <Autocomplete
            getItemValue={(item) => item.value}
            items={this.getOptions()}
            renderItem={(item, isHighlighted) =>
              <div key={item.label} style={{ background: isHighlighted ? '#f0f0f0' : '#fff' }} className={css`
                padding: 10px;
                border-bottom: 1px solid #f3f3f3;
                color: #262626;
                font-family: proximaNova-light !important;
                letter-spacing: 1.2 !important;
                margin: 0px !important;
                &:last-child {
                  border-bottom: none;
                }
                &:hover {
                  cursor: pointer;
                }
              `}>
                <strong>{item.label}</strong>
              </div>
            }
            value={this.getInputValue()}
            inputProps={{
              onFocus: this.onFocus,
              onBlur: () => this.setState({ focused: false }),
              placeholder: PLACEHOLDER,
              className: css`
                border: none;
                line-height: normal;
                height: auto;
                font-family: proximaNova-light !important;
                color: #262626 !important;
                text-align: left;
                padding-top: 8px;
                font-weight: normal;
                text-decoration: none;
                font-size: 16px;
                display: block;
                width: 100%;
                padding: .5rem .75rem;
                font-size: 1rem;
                line-height: 1.25;
                color: #495057;
                background-color: #fff;
                background-image: none;
                background-clip: padding-box;
                border-radius: .25rem;
                transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
                outline: none;
              `
            }}
            menuStyle={{
              borderRadius: '3px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '2px 0',
              position: 'fixed',
              overflow: 'auto',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '1.2px',
              lineHeight: '24px'
            }}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />
        </div>
        <div className={css`
            display: flex;
            align-items: center;
        `}>
          <Icon name="if_calendar" className={css`
            position: relative;
            display: block;
            color: #9c9c9b;
            z-index: 10;
            font-size: 24px;
            left: 0px;
            top: -2px;
          `} />
          <Datepicker
            selected={this.props.selected_date}
            onChange={this.props.onDateChange}
            placeholderText='Choose a date'
          />
        </div>
      </div>
    )
  }
}

export default Filter;
