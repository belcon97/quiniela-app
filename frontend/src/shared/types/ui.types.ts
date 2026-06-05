export type BadgeVariant = 'live' | 'soon' | 'win' | 'partial' | 'loss' | 'final'


export interface RankingRowData {
  position:     number
  name:         string
  username:     string
  flagUrl:      string    
  points:       number
  movement?:    number
}

export interface CountryOption {
  label: string
  value: string
  icon:  string
  code:  string
}