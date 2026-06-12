import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv'; // Official Vercel Free Cloud Storage

// GET Request: Fetches data for the launcher
export async function GET(request, { params }) {
  const { username } = params;
  const lowercaseUser = username.toLowerCase();

  try {
    // Read the user data from Vercel's free cloud store
    const playerData = await kv.get(`user:${lowercaseUser}`);

    if (playerData) {
      return NextResponse.json(playerData);
    }
  } catch (error) {
    console.error("Database read error:", error);
  }

  // Fallback defaults if the user has not registered custom designs yet
  return NextResponse.json({
    username: username,
    skinUrl: `https://minotar.net/skin/${username}.png`, 
    capeUrl: ""
  });
}

// POST Request: Saves input from your website dashboard form
export async function POST(request, { params }) {
  const { username } = params;
  const lowercaseUser = username.toLowerCase();
  
  try {
    const body = await request.json();
    
    const profileToSave = {
      username: username,
      skinUrl: body.skinUrl || `https://minotar.net/skin/${username}.png`,
      capeUrl: body.capeUrl || ""
    };

    // Save permanently to the free database tier
    await kv.set(`user:${lowercaseUser}`, profileToSave);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}