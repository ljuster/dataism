import * as React from 'react';
import ReactOnRails from 'react-on-rails';
import Container from 'styleguide/components/Layout/Container';
import HotelDetails from './HotelDetails';
import api from 'lib/api/apiCall';
import { Hotel, CountryState, City, isCountryState } from './types'
import LayoutHeader from './LayoutHeader';
import Filter from './Filter';
import * as moment from 'moment';
import Cookies from 'js-cookie';
import { css } from 'emotion';


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

interface Props {
  selected_state: CountryState | null
  selected_city: City | null
  selected_date: string | null
}

class ResultPage extends React.Component<Props, State> {

  private lastLocationTitle: string = '';

  constructor(props) {
    super(props);

    this.state = {
      hotels: [],
      selected_state: props.selected_state,
      selected_city: props.selected_city,
      selected_date: !!props.selected_date ? moment(props.selected_date, 'MM/DD/YYYY') : null,
      showLocationNotFound: null,
    }
  }

  public componentDidMount() {
    this.fetchHotels()
  }

  public fetchHotels() {
    const { selected_city, selected_state, selected_date } = this.state;
    const date = !!selected_date ? moment(selected_date).format('MM/DD/YYYY') : null;
    let showLocationNotFound = null;

    this.setState({
      hotels: [],
      showLocationNotFound: null,
    }, () => { 
      if (!!selected_city) {
        api.get(`/hotel_search`, { city: selected_city.city, date }).then((result: Array<Hotel>) => {
          if (result.length > 0) {
            if (result[0].city_name !== selected_city.city) {
              showLocationNotFound = 'city'
            }
          }
          this.setState({
            hotels: result,
            showLocationNotFound
          })
        })
        return;
      }
    
      if (!!selected_state) {
        api.get(`/hotel_search`, { state: selected_state.code, date }).then((result: Array<Hotel>) => {
          if (result.length > 0) {
            if (result[0].state_name !== selected_state.name) {
              showLocationNotFound = 'state'
            }
          }
          this.setState({
            hotels: result,
            showLocationNotFound
          })
        })
        return;
      }

      api.get(`/hotel_search`, { date }).then((result: Array<Hotel>) => {
        this.setState({
          hotels: result
        })
      })
    })
  }

  public onDateChange = (date: moment.Moment) => {
    this.setState({
      selected_date: date
    }, this.updatePage)
  }

  public onLocationSelect = (location: CountryState | City) => {
    if (isCountryState(location)) {
      this.setState({
        selected_state: location,
        selected_city: null,
        showLocationNotFound: null,
      }, this.updatePage)
      Cookies.set('state_code', location.code)
    } else {
      this.setState({
        selected_state: null,
        selected_city: location,
        showLocationNotFound: null,
      }, this.updatePage)
      Cookies.set('xcity_id', location.id)
    }
  }

  public updatePage = () => {
    const { selected_city, selected_state, selected_date } = this.state; 
    //TODO: change results2
    let url = '/results2'
    let params = []
    if (!!selected_city) {
      params.push(`xcity_id=${selected_city.id}`)
    } else if (!!selected_state) {
      params.push(`state=${selected_state.code}`)
    }

    if (!!selected_date) {
      params.push(`date=${moment(selected_date).format('MM/DD/YYYY')}`)
    }

    if (params.length > 0) {
      url += ('?' + params.join('&'));
    }
  
    history.pushState(null, null, url)

    this.fetchHotels()
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
              const location = `${elem.city_name}, ${elem.state_name}`;

              if (this.lastLocationTitle !== location) {
                this.lastLocationTitle = location;
                return (
                    <HotelDetails {...elem} locationTitle={location} />
                )
              }
              
              return (
                <HotelDetails {...elem} />
              )
            }
            ))
          }
        </Container>
      </>
    )
  }
}

ReactOnRails.register({ ResultPage });

export default ResultPage;
