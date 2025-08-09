import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { getAuthToken, stripAuthFromUrl } from '../lib/getAuthToken';
import { exchangeCode } from '../lib/exchangeCode';

export default function ResetPage() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [done, setDone] = useState(false);

  // Add animations to the page
  const addAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
          transform: translate3d(0,0,0);
        }
        40%, 43% {
          transform: translate3d(0, -30px, 0);
        }
        70% {
          transform: translate3d(0, -15px, 0);
        }
        90% {
          transform: translate3d(0, -4px, 0);
        }
      }
      
      @keyframes pulse {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.7;
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  };

  useEffect(() => {
    addAnimations();
    
    (async () => {
      const { code, access_token, refresh_token, error, error_description, type } = getAuthToken();

      if (error) {
        setError(error_description || error || 'Could not validate reset link');
        return;
      }

      try {
        // For reset emails, Supabase usually sets type=recovery
        if (code) {
          const { error } = await exchangeCode(code);
          if (error) throw error;
          stripAuthFromUrl();
          setReady(true);
          return;
        }

        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) throw error;
          stripAuthFromUrl();
          setReady(true);
          return;
        }

        // If it’s clearly a recovery flow but no usable tokens/code → expired
        if (type === 'recovery') {
          setError('Reset link is invalid or expired. Please request a new email.');
          return;
        }

        setError('Missing credentials in URL.');
      } catch (e: any) {
        setError(e?.message ?? 'Could not validate reset link');
      }
    })();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setError(error.message);
    else { setDone(true); setError(null); }
  };

  if (error) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fce7f3, #ffffff, #fdf2f8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '28rem',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '2rem',
        border: '4px solid #fca5a5',
        position: 'relative'
      }}>
        {/* Pokéball decoration */}
        <div style={{
          position: 'absolute',
          top: '-1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '3rem',
          height: '3rem',
          backgroundColor: '#ef4444',
          borderRadius: '50%',
          border: '4px solid white',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '1rem',
            height: '1rem',
            backgroundColor: 'white',
            borderRadius: '50%',
            border: '2px solid #1f2937'
          }}></div>
        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>😰</div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#dc2626',
            marginBottom: '0.5rem',
            fontFamily: 'monospace'
          }}>PASSWORD RESET FAILED!</h2>
          <div style={{
            backgroundColor: '#fef2f2',
            border: '2px solid #fecaca',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <p style={{ color: '#b91c1c', fontWeight: '500' }}>⚠️ {error}</p>
          </div>
          <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>Please visit a Pokémon Center near you for assistance!</p>
        </div>
      </div>
    </div>
  );
  
  if (!ready) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fce7f3, #ffffff, #fdf2f8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '28rem',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '2rem',
        border: '4px solid #f9a8d4',
        position: 'relative'
      }}>
        {/* Pokéball decoration */}
        <div style={{
          position: 'absolute',
          top: '-1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '3rem',
          height: '3rem',
          backgroundColor: '#ef4444',
          borderRadius: '50%',
          border: '4px solid white',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '1rem',
            height: '1rem',
            backgroundColor: 'white',
            borderRadius: '50%',
            border: '2px solid #1f2937'
          }}></div>
        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
          <div style={{
            fontSize: '3.5rem',
            marginBottom: '1rem',
            animation: 'bounce 1s infinite'
          }}>⚡</div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#db2777',
            marginBottom: '1rem',
            fontFamily: 'monospace'
          }}>HEALING IN PROGRESS...</h2>
          <div style={{
            background: 'linear-gradient(to right, #f472b6, #ef4444)',
            borderRadius: '9999px',
            height: '0.75rem',
            marginBottom: '1rem',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: 'white',
              height: '100%',
              borderRadius: '9999px',
              animation: 'pulse 2s infinite'
            }}></div>
          </div>
          <p style={{ color: '#4b5563' }}>Nurse Joy is validating your reset link...</p>
        </div>
      </div>
    </div>
  );
  
  if (done) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #dcfce7, #ffffff, #f0fdf4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '28rem',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '2rem',
        border: '4px solid #86efac',
        position: 'relative'
      }}>
        {/* Pokéball decoration */}
        <div style={{
          position: 'absolute',
          top: '-1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '3rem',
          height: '3rem',
          backgroundColor: '#ef4444',
          borderRadius: '50%',
          border: '4px solid white',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '1rem',
            height: '1rem',
            backgroundColor: 'white',
            borderRadius: '50%',
            border: '2px solid #1f2937'
          }}></div>
        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
          <div style={{
            fontSize: '3.5rem',
            marginBottom: '1rem',
            animation: 'pulse 2s infinite'
          }}>✨</div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#16a34a',
            marginBottom: '1rem',
            fontFamily: 'monospace'
          }}>HEALING COMPLETE!</h2>
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '2px solid #bbf7d0',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <p style={{ color: '#15803d', fontWeight: '500' }}>🎉 Your password has been successfully reset!</p>
          </div>
          <div style={{
            backgroundColor: '#fef3c7',
            border: '2px solid #fcd34d',
            borderRadius: '0.75rem',
            padding: '0.75rem',
            marginBottom: '1rem'
          }}>
            <p style={{ fontSize: '0.875rem', color: '#92400e', fontWeight: '500' }}>💬 "Your Pokémon... er, password is now fully healed!"</p>
            <p style={{ fontSize: '0.75rem', color: '#a16207', marginTop: '0.25rem' }}>- Nurse Joy</p>
          </div>
          <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>You can now close this tab and continue your journey!</p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fce7f3, #ffffff, #fdf2f8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '2.5rem',
        left: '2.5rem',
        fontSize: '2.5rem',
        animation: 'bounce 1s infinite',
        animationDelay: '0.1s'
      }}>⚡</div>
      <div style={{
        position: 'absolute',
        top: '5rem',
        right: '5rem',
        fontSize: '2rem',
        animation: 'pulse 2s infinite',
        animationDelay: '0.3s'
      }}>✨</div>
      <div style={{
        position: 'absolute',
        bottom: '5rem',
        left: '5rem',
        fontSize: '2rem',
        animation: 'bounce 1s infinite',
        animationDelay: '0.5s'
      }}>💊</div>
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        right: '2.5rem',
        fontSize: '2.5rem',
        animation: 'pulse 2s infinite',
        animationDelay: '0.7s'
      }}>🏥</div>
      
      <div style={{
        maxWidth: '28rem',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '2rem',
        border: '4px solid #f9a8d4',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Pokéball decoration */}
        <div style={{
          position: 'absolute',
          top: '-1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '3rem',
          height: '3rem',
          backgroundColor: '#ef4444',
          borderRadius: '50%',
          border: '4px solid white',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '1rem',
            height: '1rem',
            backgroundColor: 'white',
            borderRadius: '50%',
            border: '2px solid #1f2937'
          }}></div>
        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>👩‍⚕️</div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#db2777',
            marginBottom: '0.5rem',
            fontFamily: 'monospace'
          }}>POKÉMON CENTER</h1>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>Password Recovery Station</h2>
          
          <div style={{
            backgroundColor: '#fdf2f8',
            border: '2px solid #fbb6ce',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <p style={{ fontSize: '0.875rem', color: '#be185d' }}>💬 "Welcome to our Pokémon Center! Let's get your password healed up!"</p>
            <p style={{ fontSize: '0.75rem', color: '#be185d', marginTop: '0.25rem' }}>- Nurse Joy</p>
          </div>
        </div>
        
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <label htmlFor="password" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              color: '#374151',
              marginBottom: '0.5rem',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              🔐 New Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type="password"
                placeholder="Enter a strong password..."
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '3px solid #f9a8d4',
                  borderRadius: '0.75rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  backgroundColor: '#fdf2f8',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = '#ec4899';
                  target.style.boxShadow = '0 0 0 4px rgba(236, 72, 153, 0.1)';
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = '#f9a8d4';
                  target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                }}
                required
              />
              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                height: '100%',
                paddingRight: '0.75rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ color: '#f472b6' }}>⚡</span>
              </div>
            </div>
          </div>
          
          <button 
            type="submit"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem 1.5rem',
              border: '3px solid #f87171',
              borderRadius: '0.75rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: 'white',
              background: 'linear-gradient(to right, #ef4444, #ec4899)',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'linear-gradient(to right, #dc2626, #db2777)';
              target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'linear-gradient(to right, #ef4444, #ec4899)';
              target.style.transform = 'scale(1)';
            }}
            onMouseDown={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = 'scale(1.05)';
            }}
          >
            <span style={{ marginRight: '0.5rem' }}>🎯</span>
            HEAL PASSWORD
            <span style={{ marginLeft: '0.5rem' }}>✨</span>
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Powered by Pokémon Center Technology™</p>
          </div>
        </form>
        
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          bottom: '-0.5rem',
          right: '-0.5rem',
          width: '2rem',
          height: '2rem',
          backgroundColor: '#fbbf24',
          borderRadius: '50%',
          animation: 'pulse 2s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-0.25rem',
          left: '-0.25rem',
          width: '1.5rem',
          height: '1.5rem',
          backgroundColor: '#60a5fa',
          borderRadius: '50%',
          animation: 'bounce 1s infinite'
        }}></div>
      </div>
    </div>
  );
}
