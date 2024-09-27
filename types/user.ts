export interface User {
  id: number
  username: string
  password: string
  firstname: string
  lastname: string
  age: number
  role: string
  createdAt: string
  updatedAt: string
  activities: Activity[]
}

export interface Activity {
  id: number
  name: string
  description: string
  weekday: string
  time: string
  maxParticipants: number
  minAge: number
  maxAge: number
  createdAt: string
  updatedAt: string
  instructorId: number
  assetId: number
  roster: Roster
}

export interface Roster {
  createdAt: string
  updatedAt: string
  userId: number
  activityId: number
}
