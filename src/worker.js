export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const path = url.pathname.slice(4); // removes "/api"
      const allowed = ["/trending", "/movie", "/tv", "/search", "/discover"];
      if (!allowed.some(p => path.startsWith(p))) {
        return new Response("Not allowed", { status: 403 });
      }
      url.searchParams.set("api_key", env.TMDB_KEY);
      const res = await fetch("https://api.themoviedb.org/3" + path + url.search);
      return new Response(res.body, {
        status: res.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    return env.ASSETS.fetch(request); // everything else is your site
  }
};