type User = {
  id: string
  username: string
  name: string
  email: string
}

const DB_NAME = "Windoes"
const DB_VERSION = 1
const USER_STORE = "user"

const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(USER_STORE)) {
        db.createObjectStore(USER_STORE, { keyPath: "id" })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })

export const upsertUser = async (user: User): Promise<boolean> => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(USER_STORE, "readwrite")
    tx.objectStore(USER_STORE).put(user)
    tx.oncomplete = () => resolve(true)
    tx.onerror = () => reject(tx.error)
  })
}

export const getUserById = async (id: string): Promise<User | null> => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = db.transaction(USER_STORE).objectStore(USER_STORE).get(id)
    req.onsuccess = () => resolve(req.result ?? null)
    req.onerror = () => reject(req.error)
  })
}

export const upsertUserProfile = async (
  id: string,
  image: Blob | File
): Promise<boolean> => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(USER_STORE, "readwrite")
    const store = tx.objectStore(USER_STORE)
    const getReq = store.get(id)

    getReq.onsuccess = () => {
      const user = getReq.result
      if (!user) return reject("User not found")
      store.put({ ...user, image })
    }

    tx.oncomplete = () => resolve(true)
    tx.onerror = () => reject(tx.error)
  })
}

export const getUserProfileById = async (
  id: string
): Promise<Blob | null> => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = db.transaction(USER_STORE).objectStore(USER_STORE).get(id)
    req.onsuccess = () => resolve(req.result?.image ?? null)
    req.onerror = () => reject(req.error)
  })
}
