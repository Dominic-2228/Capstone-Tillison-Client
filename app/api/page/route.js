import { NextResponse } from "next/server";

export async function GET() {
  console.log("🔥 API ROUTE CALLED: /api/page");
  console.log("🔥 Timestamp:", new Date().toISOString());
  
  try {
    console.log("📡 About to fetch from: http://localhost:8000/reviews");
    
    const res = await fetch("http://localhost:8000/reviews", {
      cache: 'no-cache', // Disable caching
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    
    console.log("📡 Django response status:", res.status);
    console.log("📡 Django response headers:", Object.fromEntries(res.headers.entries()));
    
    if (!res.ok) {
      throw new Error(`Django returned ${res.status}: ${res.statusText}`);
    }
    
    const textResponse = await res.text();
    console.log("📡 Raw response from Django:");
    console.log(textResponse);
    
    const reviews = JSON.parse(textResponse);
    console.log("📡 Parsed reviews:", reviews);
    console.log("📡 First review user field:", reviews[0]?.user);
    console.log("📡 Type of user field:", typeof reviews[0]?.user);
    
    console.log("✅ About to return data to frontend");
    return NextResponse.json(reviews);
    
  } catch (error) {
    console.error("❌ API route error:", error);
    console.error("❌ Error stack:", error.stack);
    return NextResponse.json(
      { error: "Failed to fetch reviews", details: error.message },
      { status: 500 }
    );
  }
}