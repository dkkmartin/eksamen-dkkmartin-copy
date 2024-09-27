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
  asset: Asset
  users: unknown[]
}

export interface Asset {
  id: number
  url: string
  createdAt: string
  updatedAt: string
}
