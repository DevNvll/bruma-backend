import db from './../db'

export async function getUsersList() {
  const users = await db.select('id', 'username', 'join_date').from('usuarios')
  return users
}

export async function getUserById(id) {
  const user = await db.select('id', 'username', 'join_date').from('usuarios').where({id: id})
  return user
}

export async function getUserByUsername(username) {
  const user = await db.select('*').from('usuarios').where({username: username})
  return user
}