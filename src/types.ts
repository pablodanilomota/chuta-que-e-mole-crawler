export interface Address {
  addressRegion: string
}

export interface Location {
  name: string
  address: Address
}

export interface MemberOf {
  name: string
}

export interface HomeTeam {
  name: string
  memberOf: MemberOf
  sport: string
}

export interface MemberOf2 {
  name: string
}

export interface AwayTeam {
  name: string
  memberOf: MemberOf2
  sport: string
}

export interface SubEvent {
  name: string
  startDate: Date
  location: Location
  homeTeam: HomeTeam
  awayTeam: AwayTeam
}

export interface RootObject {
  name: string
  sport: string
  startDate: Date
  location: string
  subEvent: SubEvent[]
}
