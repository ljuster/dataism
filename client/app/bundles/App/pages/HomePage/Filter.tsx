import * as React from 'react';
import * as moment from 'moment';
import { css } from 'emotion';
import { connect } from 'react-redux'
import mq from 'styleguide/styles/layout/media-queries';
import _ from 'lodash';
import Autocomplete from 'react-autocomplete';
import { User } from './types';
import Icon from 'styleguide/components/Icon/Icon';
import Datepicker from 'styleguide/components/Datepicker/Datepicker';
import {
    fetchUsers,
    clearUsers
} from '../../actions/users'

interface Option {
  label: string
  value: string
}

interface Props {
  users: User[] | null
  selected_user: User | null
  selected_date: moment.Moment | null
  onDateChange: (date: moment.Moment) => void
  onUserSelect: (name: User) => void
  clearUsers: any
  fetchUsers: any
}

interface ComponentState {
  users: User[]
  value: string
  focused: boolean
}

const PLACEHOLDER = 'User name';

class Filter extends React.Component<Props, ComponentState> {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      value: '',
      focused: false,
    }
  }

  public getOptions = (): Option[] => {
    const { users } = this.props

    if (users.length === 0) return []
      return users
              .map(elem => ({ label: `${elem.name}`, value: elem.id.toString() }))
  }



  public getInputValue = () => {
    const { focused, value } = this.state;
    const { selected_user } = this.props;

    if (focused) {
      return value
    }

    if (!!selected_user) {
      return selected_user.name
    }

    return PLACEHOLDER
  }

  public onChange = (e, value) => {
    this.props.clearUsers()
    this.setState({
      value,
    },() => this.props.fetchUsers(value))
  }

  public onFocus = () => {
    this.props.clearUsers()
    this.setState({
      focused: true,
      users: [],
    }, () => {

      let str = this.state.value

      if (str.length === 0 && !!this.props.selected_user) {
        str = this.props.selected_user.name
      }

      if (str.length === 0) return

      this.props.fetchUsers(str)

    })
  }


  public onSelect = (value: string) => {
      const user = _.find(this.props.users, (elem: User) => elem.id.toString() === value)
      this.props.onUserSelect(user)
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
          <Icon name="menu" className={css`
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

const mapStateToProps = (state) => {
    return ({
        // DONT DO THIS - USE RESELECT!
        users: state.users.users || []
    })
}

const mapDispatchToProps = {
    clearUsers: clearUsers,
    fetchUsers: (name) => fetchUsers(name)
    // onCartUpdate: (item, val) => dispatch({ type: 'ADD_ITEM', payload: { item, val} })
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
