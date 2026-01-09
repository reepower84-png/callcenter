import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

export interface Contact {
  id: string
  name: string
  phone: string
  message: string
  status: 'pending' | 'contacted' | 'completed'
  createdAt: string
}

const DB_PATH = join(process.cwd(), 'data', 'contacts.json')

function ensureDbExists() {
  const dir = join(process.cwd(), 'data')
  if (!existsSync(dir)) {
    const { mkdirSync } = require('fs')
    mkdirSync(dir, { recursive: true })
  }
  if (!existsSync(DB_PATH)) {
    writeFileSync(DB_PATH, JSON.stringify([]), 'utf-8')
  }
}

export function getContacts(): Contact[] {
  ensureDbExists()
  const data = readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

export function addContact(contact: Omit<Contact, 'id' | 'status' | 'createdAt'>): Contact {
  ensureDbExists()
  const contacts = getContacts()
  const newContact: Contact = {
    ...contact,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  contacts.unshift(newContact)
  writeFileSync(DB_PATH, JSON.stringify(contacts, null, 2), 'utf-8')
  return newContact
}

export function updateContactStatus(id: string, status: Contact['status']): Contact | null {
  ensureDbExists()
  const contacts = getContacts()
  const index = contacts.findIndex((c) => c.id === id)
  if (index === -1) return null
  contacts[index].status = status
  writeFileSync(DB_PATH, JSON.stringify(contacts, null, 2), 'utf-8')
  return contacts[index]
}

export function deleteContact(id: string): boolean {
  ensureDbExists()
  const contacts = getContacts()
  const filtered = contacts.filter((c) => c.id !== id)
  if (filtered.length === contacts.length) return false
  writeFileSync(DB_PATH, JSON.stringify(filtered, null, 2), 'utf-8')
  return true
}
