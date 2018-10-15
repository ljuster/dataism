export interface Product {
  name: string
  quantity?: number
  product_price: number
}

export interface Hotel {
  active: boolean 
  amenities: Array<string>
  city_name: string
  code: string
  image: string
  name: string
  products: Array<Product>
  short_description: string
  state_name: string
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
