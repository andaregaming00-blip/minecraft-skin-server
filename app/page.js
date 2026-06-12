'use client';
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [skinUrl, setSkinUrl] = useState('');
  const [capeUrl, setCapeUrl] = useState('');
  const [status, setStatus] = useState('');

  const saveAssets = async () => {
    if (!username.trim()) {
      alert("Please specify a profile username!");
      return;
    }
    setStatus("Syncing variables with Vercel KV cloud...");
    
    try {
      const res = await fetch(`/api/skin/${username.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skinUrl, capeUrl })
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Assets updated! Restart your game launcher to apply custom maps.");
      } else {
        setStatus("Server rejected configuration update step.");
      }
    } catch (err) {
      setStatus("Network communication failure.");
    }
  };

  return (
    <main style={{
      minHeight: '100vh', background: '#0a0b0e', color: 'white',
      fontFamily: 'Segoe UI, Roboto, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0
    }}>
      <div style={{
        background: 'rgba(20, 21, 26, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '45px', borderRadius: '16px', width: '380px', display: 'flex', flexDirection: 'column', gap: '22px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ color: '#8c52ff', margin: 0, textAlign: 'center', letterSpacing: '0.5px' }}>SKIN SERVER LINK</h2>
        <p style={{ color: '#777', fontSize: '13px', margin: '0 0 10px 0', textAlign: 'center', lineHeight: '1.4' }}>
          Assign direct image URLs to save custom cosmetic skins and capes instantly.
        </p>

        <div>
          <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Minecraft Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username..." style={inputStyle} />
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Skin Texture Link (.png)</label>
          <input type="text" value={skinUrl} onChange={(e) => setSkinUrl(e.target.value)} placeholder="https://i.imgur.com/example.png" style={inputStyle} />
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Cape Texture Link (.png)</label>
          <input type="text" value={capeUrl} onChange={(e) => setCapeUrl(e.target.value)} placeholder="https://i.imgur.com/cape.png" style={inputStyle} />
        </div>

        <button onClick={saveAssets} style={{
          padding: '14px', background: '#8c52ff', border: 'none', color: 'white', fontSize: '15px',
          borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', marginTop: '5px',
          boxShadow: '0 4px 15px rgba(140, 82, 255, 0.3)'
        }}>
          APPLY GRAPHIC SETTINGS
        </button>

        {status && <p style={{ fontSize: '12px', color: '#00c864', textAlign: 'center', margin: 0, fontWeight: '500' }}>{status}</p>}
      </div>
    </main>
  );
}

const inputStyle = {
  width: '100%', padding: '12px', background: '#0e0f12', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px', color: 'white', outline: 'none', boxSizing: 'border-box', fontSize: '14px'
};