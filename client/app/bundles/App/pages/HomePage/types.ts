export interface Image {
  name: string
  url: string
}

export interface User {
  id: number
  name: string
}



export function isValidUser(user: User): user is User {
  return (<User>user).name !== undefined
}
