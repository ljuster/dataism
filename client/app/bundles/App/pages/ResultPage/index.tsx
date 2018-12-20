import * as React from 'react';
import Container from 'styleguide/components/Layout/Container';
import ImageDetails from './ImageDetails';
import api from 'lib/api/apiCall';
import { Hotel, CountryState, City, isCountryState } from './types'
import LayoutHeader from './LayoutHeader';
import Filter from './Filter';
import * as moment from 'moment';
import Cookies from 'js-cookie';
import { css } from 'emotion';
import { RouteComponentProps } from 'react-router-dom';
import qs from 'qs';


interface NotFoundProps {
  state?: CountryState
  city?: City
}

const NotFound = (props: NotFoundProps) => {
  let caption = null
  if (!!props.city) {
    caption = `Here are the  nearest hotels  to ${props.city.city}.  Totally worth  the trip for  a relaxing  daycation!`
  }

  if (!!props.state) {
    caption = `Here are hotels located within ${props.state.name}. Totally worth the trip for a relaxing daycation!`
  }

  if (caption === null) return null

  return <div className={css`
              padding: 35px;
              color: #262626;
              font-family: 'ProximaNova-light';
              font-size: 22px;
              text-align: center;
              margin-top: 0px !important;
              margin-bottom: 50px !important;
              max-width: 1024px;
              margin: auto;
              width: 100%;
          `}>{caption}</div>
}

interface State {
  hotels: Array<Hotel>
  selected_state: CountryState | null
  selected_city: City | null
  selected_date: moment.Moment | null
  showLocationNotFound: 'state' | 'city' | null
}

export interface ResultPageProps {
  hotels: Array<Hotel> | null
  selected_state: CountryState | null
  selected_city: City | null
  selected_date: string | null
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

  private lastLocationTitle: string = '';

  constructor(props) {
    super(props);

    this.state = {
      hotels: props.hotels || [],
      selected_state: props.selected_state,
      selected_city: props.selected_city,
      selected_date: !!props.selected_date ? moment(props.selected_date, 'MM/DD/YYYY') : null,
      showLocationNotFound: null,
    }
  }

  public componentDidMount() {
    this.fetchHotels()
  }

  public componentDidUpdate(prevProps) {
    if(this.props.location.search != prevProps.location.search) {
      const { selected_city, selected_state, selected_date } = this.parseUrl()
      this.setState({ selected_city, selected_state, selected_date }, this.fetchHotels)
    }
  }

  public fetchHotels() {

      api.get(`/images`, { }).then((result: Array<Hotel>) => {
        this.setState({
          hotels: result
        })
      })
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
          <NotFound
            city={this.state.showLocationNotFound === 'city' ? this.state.selected_city : null}
            state={this.state.showLocationNotFound === 'state' ? this.state.selected_state : null}
          />
          {this.state.hotels.length === 0 && <div>Loading</div>}
            {this.state.hotels.length !== 0 && (
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

export default ResultPage;
