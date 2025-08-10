export async function POST(request) {
  const body = await request.json();

  const res = await fetch(`http://localhost:8000/users/login`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data);
}