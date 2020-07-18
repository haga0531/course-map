export interface User {
  displayName: string | null
  photoURL: string | null
  uid: string | null
}

export class UserClass implements User {
  displayName: string | null
  photoURL: string | null
  uid: string | null

  constructor(displayName: string | null, photoURL: string | null, uid: string | null) {
    this.displayName = displayName
    this.photoURL = photoURL
    this.uid = uid
  }
}

export interface UserState {
  user: User | null
}

export interface RootState {
}