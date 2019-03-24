import * as React from 'react'
import { connect } from 'react-redux'
import Container from 'styleguide/components/Layout/Container'
import ImageDetails from './ImageDetails'
import { Image, User } from './types'
import LayoutHeader from './LayoutHeader'
import Filter from './Filter'
import * as moment from 'moment'
import { css } from 'emotion'
import { RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
// 1. Import action creators and selectors from our modules
import {
    fetchImages
} from '../../actions/images'
import {
    fetchUsers
} from '../../actions/users'


export interface HomePageProps {
  images: Image[] | null
  selected_user: User | null
  selected_date: string | null
  fetchImages: any
  fetchUsers: any
}

interface Props extends HomePageProps, RouteComponentProps {}

interface ParsedQuery {
  user_id: number
  user_name: string
  date: moment.Moment
}

interface parseUrlResults {
  selected_user: User | null
  selected_date: moment.Moment | null
}

interface componentState {
    users: User[] | null
    selected_date: moment.Moment | null
    selected_user: User | null
    showUserNotFound: 'user' | null
}

class HomePage extends React.Component<Props, componentState> {

  constructor(props) {
    super(props)

    this.state = {
      selected_user: props.selected_user,
      selected_date: !!props.selected_date ? moment(props.selected_date, 'MM/DD/YYYY') : null,
      showUserNotFound: null,
      users: null
    }
  }

  public componentDidMount() {
      this.props.fetchImages()
  }

  public componentDidUpdate(prevProps) {
    if(this.props.location.search != prevProps.location.search) {
      const { selected_user } = this.parseUrl()
      this.props.fetchUsers(selected_user)
    }
  }

  public parseUrl(): parseUrlResults {
    const parsedQuery: ParsedQuery = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })

    return {
      selected_user: parsedQuery.user_id ? { name: parsedQuery.user_name, id: parsedQuery.user_id } : null,
      selected_date: parsedQuery.date ? moment(parsedQuery.date, 'MM/DD/YYYY') : null,
    }
  }

  public onDateChange = (date: moment.Moment) => {
    this.setState({
      selected_date: date
    }, this.updateUrl)
  }

  public onUserSelect = (user: User ) => {
      this.setState({
        selected_user: user,
        showUserNotFound: null,
      }, this.updateUrl)
  }

  public updateUrl = () => {
    const { selected_user, selected_date } = this.state
    let url = this.props.location.pathname
    let params = []
    if (!!selected_user) {
      params.push(`user_id=${selected_user.id}`)
    }

    if (!!selected_date) {
      params.push(`date=${moment(selected_date).format('MM/DD/YYYY')}`)
    }

    if (params.length > 0) {
      url += ('?' + params.join('&'))
    }

    this.props.history.push(url)
  }


  render() {
    return (
      <>
        <LayoutHeader SecondRowComponent={() =>
          <Filter
            selected_user={this.state.selected_user}
            selected_date={this.state.selected_date}
            onDateChange={this.onDateChange}
            onUserSelect={this.onUserSelect}
          />} />
        <Container className={css`
          margin-top: 145px
        `}>
          { this.props.images.length === 0 && <div>Loading</div>}
            {this.props.images.length > 0 &&
                this.props.images.map(elem => <ImageDetails {...elem} key={elem.url} />)
            }
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
    return ({
        // DONT DO THIS - USE RESELECT!
        images: state.images.images || []
    })
}

const mapDispatchToProps = {
    fetchImages: fetchImages,
    fetchUsers: (name) => fetchUsers(name)
    // onCartUpdate: (item, val) => dispatch({ type: 'ADD_ITEM', payload: { item, val} })
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
