// src/pages/ResetPage.tsx
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../supabaseClient.ts'

export default function ResetPage() {
  const [searchParams] = useSearchParams()
  const [newPassword, setNewPassword] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const access_token = searchParams.get('access_token')
    if (access_token) {
      supabase.auth.exchangeCodeForSession(access_token)
        .then(({ error }: { error: any }) => {
          if (error) setError('Session error: ' + error.message)
          else setConfirmed(true)
        })
    } else {
      setError('Missing access token.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) setError(error.message)
    else {
      setSuccess(true)
      setError(null)
    }
  }

  if (!confirmed) return <p>Confirming identity...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Reset Your Password</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success ? (
        <p>Password reset successful! You can now log in.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
        </form>
      )}
    </div>
  )
}
