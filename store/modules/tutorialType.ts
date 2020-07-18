export interface Tutorial {
  id: string
  title: string
  description: string
  link: string
  image: string
  selected: string
  categories: string
  fee: string 
  language: string
  likeCount: number
  created_at: number
  creatorId: string
}

export class TutorialClass implements Tutorial {
  id: string
  title: string
  description: string
  link: string
  image: string
  selected: string
  categories: string
  fee: string
  language: string
  likeCount: number
  created_at: number
  creatorId: string
  
  constructor(
    id: string,
    title: string,
    description: string,
    link: string,
    image: string,
    selected: string,
    categories: string,
    fee: string,
    language: string,
    likeCount: number,
    created_at: number,
    creatorId: string
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.link = link
    this.image = image
    this.selected = selected
    this.categories = categories
    this.fee = fee
    this.language = language
    this.likeCount = likeCount
    this.created_at = created_at
    this.creatorId = creatorId
  }
}

export interface TutorialState {
  tutorials: Tutorial[]
}

export interface RootState {
  
}