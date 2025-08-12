import { NextResponse } from "next/server";

export async function GET(request) {
  const {searchParams} = new URL (request.url)
  const token = searchParams.get("token")
  try {
    
    const res = await fetch("http://localhost:8000/reviews", {
      cache: 'no-cache', // Disable caching
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Token ${token}`,
      }
    });
    
    if (!res.ok) {
      throw new Error(`Django returned ${res.status}: ${res.statusText}`);
    }
    
    const textResponse = await res.text();
    
    const reviews = JSON.parse(textResponse);
    return NextResponse.json(reviews);
    
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reviews", details: error.message },
      { status: 500 }
    );
  }
}