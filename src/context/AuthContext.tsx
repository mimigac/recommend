import { FC, ReactNode } from 'react'
import { createContext, useState, useContext, useEffect } from 'react'
import { auth } from '../firebase'
import { User } from 'firebase/auth'

interface AuthContextInterface {
  user: User | null
}

interface Props {
  children: ReactNode
  loading: boolean
}
const AuthContext = createContext<AuthContextInterface | null>(null)

export function useAuthContext() {
  return useContext(AuthContext)
}

export const AuthProvider: FC<Props> = (props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const value = {
    user,
    loading,
  }

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })
    return () => {
      unsubscribed()
    }
  }, [])

  if (loading) {
    return <p>loading...</p>
  } else {
    return (
      <AuthContext.Provider value={value}>
        {!props.loading && props.children}
      </AuthContext.Provider>
    )
  }
}
