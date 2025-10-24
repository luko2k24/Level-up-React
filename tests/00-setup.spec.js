// tests/00-setup.spec.js
import { initDB } from '../src/data/db'

beforeAll(() => {
  localStorage.clear()
  initDB()
})
