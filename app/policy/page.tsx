export default function PolicyPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="text-white/40 text-sm">Last updated: November 2026.</p>

      <section className="mb-2">
        <h2 className="text-xl font-bold text-white mb-3">What we collect: nothing</h2>
        <p className="text-white/60 text-sm md:text-base leading-relaxed">
          Frynime has no accounts, no analytics, no tracking pixels, and no advertising. The
          site does not set cookies and does not send your data to any Frynime server — there
          is no Frynime server.
        </p>
      </section>

      <section className="mb-2">
        <h2 className="text-xl font-bold text-white mb-3">What stays in your browser</h2>
        <p className="text-white/60 text-sm md:text-base leading-relaxed">
          Two things are stored in your browser&apos;s localStorage, and nowhere else: your
          favorites list (<code className="text-cyan-400">animeFavorites</code>) and whether
          you have entered the catalog (<code className="text-cyan-400">frynime-entered</code>
          ). Clearing site data deletes both. They are never uploaded or synced.
        </p>
      </section>

      <section className="mb-2">
        <h2 className="text-xl font-bold text-white mb-3">Third parties</h2>
        <p className="text-white/60 text-sm md:text-base leading-relaxed">
          Your browser talks directly to three third parties: the Jikan API
          (<code className="text-cyan-400">api.jikan.moe</code>) for catalog data, the
          MyAnimeList CDN (<code className="text-cyan-400">cdn.myanimelist.net</code>) for
          posters, and the stream mirror embedded on episode pages. Each of them sees your IP
          address and applies its own privacy policy — that traffic is outside Frynime&apos;s
          control.
        </p>
      </section>
    </div>
  );
}
