// src/pages/ConfirmPage.tsx
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../supabaseClient.ts'

export default function ConfirmPage() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const access_token = searchParams.get('access_token')
    if (access_token) {
      supabase.auth.exchangeCodeForSession(access_token)
        .then(() => {
          console.log('Email confirmed')
          // optionally redirect or show success
        })
        .catch((err: Error) => console.error('Error confirming:', err))
    }
  }, [searchParams])

  return <h1>Confirming email...</h1>
}
