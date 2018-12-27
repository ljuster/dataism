import * as React from 'react'
import { connect } from 'react-redux'
import Container from 'styleguide/components/Layout/Container'
import ImageDetails from './ImageDetails'
import { Hotel, CountryState, City, isCountryState } from './types'
import LayoutHeader from './LayoutHeader'
import Filter from './Filter'
import * as moment from 'moment'
import Cookies from 'js-cookie'
import { css } from 'emotion'
import { RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
// 1. Import action creators and selectors from our modules
import {
    fetchImages
} from '../../actions/images'

interface State {
  hotels: Hotel[]
  images: Hotel[]
  selected_state: CountryState | null
  selected_city: City | null
  selected_date: moment.Moment | null
  showLocationNotFound: 'state' | 'city' | null
}

export interface ResultPageProps {
  hotels: Hotel[] | null
  images: Hotel[] | null
  selected_state: CountryState | null
  selected_city: City | null
  selected_date: string | null
  fetchImages: any
  load: any
}

interface Props extends ResultPageProps, RouteComponentProps {}

interface ParsedQuery {
  xcity_id: number
  city_name: string
  city_state: string
  state: string
  state_name: string
  date: moment.Moment
}

interface parseUrlResults {
  selected_state: CountryState | null
  selected_city: City | null
  selected_date: moment.Moment | null
}

class ResultPage extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      images: props.images || [],
      hotels: props.hotels || [],
      selected_state: props.selected_state,
      selected_city: props.selected_city,
      selected_date: !!props.selected_date ? moment(props.selected_date, 'MM/DD/YYYY') : null,
      showLocationNotFound: null,
    }
  }

  public componentDidMount() {
      console.log("comp did mnt index res pg")
      this.props.fetchImages()
  }

  public componentDidUpdate(prevProps) {
    if(this.props.location.search != prevProps.location.search) {
      const { selected_city, selected_state, selected_date } = this.parseUrl()
      // this.setState(hotels, this.props.fetchImages())
    }
  }

  public parseUrl(): parseUrlResults {
    const parsedQuery: ParsedQuery = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    return {
      selected_city: parsedQuery.xcity_id ? { city: parsedQuery.city_name, id: parsedQuery.xcity_id, state_code: parsedQuery.city_state } : null,
      selected_state: parsedQuery.state ? { code: parsedQuery.state, name: parsedQuery.state_name, active: null, id: 0 } : null,
      selected_date: parsedQuery.date ? moment(parsedQuery.date, 'MM/DD/YYYY') : null,
    }
  }

  public onDateChange = (date: moment.Moment) => {
    this.setState({
      selected_date: date
    }, this.updateUrl)
  }

  public onLocationSelect = (location: CountryState | City) => {
    if (isCountryState(location)) {
      this.setState({
        selected_state: location,
        selected_city: null,
        showLocationNotFound: null,
      }, this.updateUrl)
      Cookies.set('state_code', location.code)
    } else {
      this.setState({
        selected_state: null,
        selected_city: location,
        showLocationNotFound: null,
      }, this.updateUrl)
      Cookies.set('xcity_id', location.id)
    }
  }

  public updateUrl = () => {
    const { selected_city, selected_state, selected_date } = this.state
    let url = this.props.location.pathname
    let params = []
    if (!!selected_city) {
      params.push(`xcity_id=${selected_city.id}`)
      params.push(`city_name=${selected_city.city}`)
      params.push(`city_state=${selected_city.state_code}`)
    } else if (!!selected_state) {
      params.push(`state=${selected_state.code}`)
      params.push(`state_name=${selected_state.name}`)
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
            selected_city={this.state.selected_city}
            selected_state={this.state.selected_state}
            selected_date={this.state.selected_date}
            onDateChange={this.onDateChange}
            onLocationSelect={this.onLocationSelect}
          />} />
        <Container className={css`
          margin-top: 145px
        `}>
          {this.state.hotels.length === 0 && <div>Loading</div>}
            {this.state.hotels.length > 1 && (
                this.state.hotels.map(elem => {
                    return (
                        <ImageDetails {...elem} key={elem.url} />
                    )
                }))}
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
    return ({
        // DONT DO THIS - USE RESELECT!
        hotels: state.images,
        images: state.images
    })
}

const mapDispatchToProps = {
    fetchImages: fetchImages
    // onCartUpdate: (item, val) => dispatch({ type: 'ADD_ITEM', payload: { item, val} })
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage)
