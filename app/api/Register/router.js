export async function POST(request) {
  const body = await request.json();
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8000/users/register`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data);
}
