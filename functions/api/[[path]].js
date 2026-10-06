export async function onRequest({ request, env, params }) {
  const path = "/" + params.path.join("/");
  const allowed = ["/trending", "/movie", "/tv", "/search", "/discover"];
  if (!allowed.some(p => path.startsWith(p))) {
    return new Response("Not allowed", { status: 403 });
  }
  const url = new URL(request.url);
  url.searchParams.set("api_key", env.TMDB_KEY);
  const res = await fetch("https://api.themoviedb.org/3" + path + url.search);
  return new Response(res.body, {
    status: res.status,
    headers: { "Content-Type": "application/json" }
  });
}