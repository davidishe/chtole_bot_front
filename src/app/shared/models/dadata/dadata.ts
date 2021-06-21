export interface DadataQuery {
  query?: string;
  branch_type?: string;
  type?: string;
}


export interface SuggestionsResult {
  suggestions: Suggestion[]
}

export interface Suggestion {
  value: string
  unrestricted_value: string
  data: DadataData
}

export interface DadataData {
  kpp: string
  capital: Capital
  management: Management
  founders: Founder[]
  managers: Manager[]
  predecessors: any
  successors: any
  branch_type: string
  branch_count: number
  source: any
  qc: any
  hid: string
  type: string
  state: State
  opf: Opf
  name: Name
  inn: string
  ogrn: string
  okpo: string
  okato: string
  oktmo: string
  okogu: string
  okfs: string
  okved: string
  okveds: Okved[]
  authorities: Authorities
  documents: Documents
  licenses: any
  finance: Finance
  address: Address
  phones: Phone[]
  emails: Email[]
  ogrn_date: number
  okved_type: string
  employee_count: number
}

export interface Capital {
  type: string
  value: number
}

export interface Management {
  name: string
  post: string
  disqualified: any
}

export interface Founder {
  ogrn?: string
  inn?: string
  name: string
  hid: string
  type: string
  share: Share
}

export interface Share {
  value: number
  type: string
}

export interface Manager {
  inn: string
  fio: Fio
  post: string
  hid: string
  type: string
}

export interface Fio {
  surname: string
  name: string
  patronymic: string
  gender: string
  source: string
  qc: any
}

export interface State {
  status: string
  code: any
  actuality_date: number
  registration_date: number
  liquidation_date: any
}

export interface Opf {
  type: string
  code: string
  full: string
  short: string
}

export interface Name {
  full_with_opf: string
  short_with_opf: string
  latin: any
  full: string
  short: string
}

export interface Okved {
  main: boolean
  type: string
  code: string
  name: string
}

export interface Authorities {
  fts_registration: FtsRegistration
  fts_report: FtsReport
  pf: Pf
  sif: Sif
}

export interface FtsRegistration {
  type: string
  code: string
  name: string
  address: string
}

export interface FtsReport {
  type: string
  code: string
  name: string
  address: any
}

export interface Pf {
  type: string
  code: string
  name: string
  address: any
}

export interface Sif {
  type: string
  code: string
  name: string
  address: any
}

export interface Documents {
  fts_registration: FtsRegistration2
  pf_registration: PfRegistration
  sif_registration: SifRegistration
  smb: Smb
}

export interface FtsRegistration2 {
  type: string
  series: string
  number: string
  issue_date: number
  issue_authority: string
}

export interface PfRegistration {
  type: string
  series: any
  number: string
  issue_date: number
  issue_authority: string
}

export interface SifRegistration {
  type: string
  series: any
  number: string
  issue_date: number
  issue_authority: string
}

export interface Smb {
  category: string
  type: string
  series: any
  number: any
  issue_date: number
  issue_authority: any
}

export interface Finance {
  tax_system: any
  income: number
  expense: number
  debt: any
  penalty: any
  year: number
}

export interface Address {
  value: string
  unrestricted_value: string
  data: Data2
}

export interface Data2 {}

export interface Phone {
  value: string
  unrestricted_value: string
  data: Data3
}

export interface Data3 {
  contact: any
  source: string
  qc: any
  type: string
  number: string
  extension: any
  provider: string
  country: any
  region: string
  city: any
  timezone: string
  country_code: string
  city_code: string
  qc_conflict: any
}

export interface Email {
  value: string
  unrestricted_value: string
  data: Data4
}

export interface Data4 {
  local: string
  domain: string
  type: any
  source: string
  qc: any
}
