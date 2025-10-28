
import { initDB } from '../src/data/db'

beforeAll(() => {
  localStorage.clear()
  initDB()
})
