import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { getAuthToken, stripAuthFromUrl } from '../lib/getAuthToken';
import { exchangeCode } from '../lib/exchangeCode';

export default function ConfirmPage() {
  const [msg, setMsg] = useState('Confirming email…');

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
        }
        50% {
          opacity: 0.5;
        }
        100% {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  };

  useEffect(() => {
    addAnimations();
    (async () => {
      const { code, access_token, refresh_token, error, error_description } = getAuthToken();

      // Supabase bounced back with an error in the URL
      if (error) {
        setMsg(`Confirmation failed: ${error_description || error}`);
        return;
      }

      try {
        if (code) {
          const { error } = await exchangeCode(code);
          if (error) throw error;
          stripAuthFromUrl();
          setMsg('Email confirmed! You are signed in.');
          return;
        }

        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) throw error;
          stripAuthFromUrl();
          setMsg('Email confirmed! You are signed in.');
          return;
        }

        // Nothing useful present → likely expired/consumed link
        setMsg('Confirmation failed: link is invalid or expired. Please request a new email.');
      } catch (e: any) {
        setMsg('Confirmation failed: ' + (e?.message ?? 'unknown error'));
      }
    })();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #dbeafe, #ffffff, #f0f9ff)',
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
      }}>📧</div>
      <div style={{
        position: 'absolute',
        top: '5rem',
        right: '5rem',
        fontSize: '2rem',
        animation: 'pulse 2s infinite',
        animationDelay: '0.3s'
      }}>⚡</div>
      <div style={{
        position: 'absolute',
        bottom: '5rem',
        left: '5rem',
        fontSize: '2rem',
        animation: 'bounce 1s infinite',
        animationDelay: '0.5s'
      }}>✨</div>
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
        border: '4px solid #93c5fd',
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
        
        <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>👩‍⚕️</div>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#2563eb', 
            marginBottom: '0.5rem',
            fontFamily: 'monospace'
          }}>POKÉMON CENTER</h1>
          <h2 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '1rem'
          }}>Email Confirmation Station</h2>
          
          <div style={{
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '1rem',
            border: '3px solid',
            backgroundColor: msg.includes('confirmed') || msg.includes('signed in') 
              ? '#f0fdf4' : msg.includes('failed') 
                ? '#fef2f2' : '#eff6ff',
            borderColor: msg.includes('confirmed') || msg.includes('signed in') 
              ? '#86efac' : msg.includes('failed') 
                ? '#fca5a5' : '#93c5fd'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
              {msg.includes('confirmed') || msg.includes('signed in') 
                ? '🎉' 
                : msg.includes('failed') 
                  ? '😰'
                  : '⚡'}
            </div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              marginBottom: '0.75rem',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: msg.includes('confirmed') || msg.includes('signed in') 
                ? '#16a34a' : msg.includes('failed') 
                  ? '#dc2626' : '#2563eb'
            }}>
              {msg.includes('confirmed') || msg.includes('signed in') 
                ? 'EMAIL CONFIRMED!' 
                : msg.includes('failed') 
                  ? 'CONFIRMATION FAILED!'
                  : 'CONFIRMING EMAIL...'}
            </h3>
            <p style={{
              fontWeight: '500',
              color: msg.includes('confirmed') || msg.includes('signed in') 
                ? '#15803d' : msg.includes('failed') 
                  ? '#b91c1c' : '#1d4ed8'
            }}>
              {msg}
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#fef3c7',
            border: '2px solid #fcd34d',
            borderRadius: '0.75rem',
            padding: '0.75rem',
            marginBottom: '1rem'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#92400e',
              fontWeight: '500'
            }}>
              💬 {msg.includes('confirmed') || msg.includes('signed in') 
                ? '"Your email is now fully healed and ready for action!"'
                : msg.includes('failed')
                  ? '"Oh my! Something went wrong. Please try again later!"'
                  : '"Please wait while I check your email confirmation..."'}
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: '#a16207',
              marginTop: '0.25rem'
            }}>- Nurse Joy</p>
          </div>
          
          {(msg.includes('confirmed') || msg.includes('signed in')) && (
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '2px solid #86efac',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#15803d',
                fontWeight: '500'
              }}>
                🎮 You can now close this window and continue your adventure!
              </p>
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Powered by Pokémon Center Technology™</p>
          </div>
        </div>
        
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
