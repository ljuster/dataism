export interface Image {
  name: string
  url: string
}

export interface CountryState {
  active: boolean | null
  id: number
  name: string
  code: string
}

export interface City {
  id: number
  city: string
  state_code: string
}

export function isCountryState(location: CountryState | City): location is CountryState {
  return (<CountryState>location).code !== undefined
}
