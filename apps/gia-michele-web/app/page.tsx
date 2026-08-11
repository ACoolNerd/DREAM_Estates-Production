import { getFeaturedPortfolio, getServiceTiers } from '@/lib/data'

const nav = [
  ['About', '#about'],
  ['Services', '#services'],
  ['Collection', '#collection'],
  ['Trade', '#trade'],
  ['Contact', '#contact'],
]

export default async function HomePage() {
  const [services, portfolio] = await Promise.all([
    getServiceTiers(),
    getFeaturedPortfolio(),
  ])

  return (
    <main>
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/20 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <a href="#top" className="serif text-xl tracking-[.14em]">GIA MICHÈLE</a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map(([label, href]) => (
              <a key={href} href={href} className="eyebrow text-[10px] text-white/85 hover:text-white">{label}</a>
            ))}
          </nav>
          <a href="#contact" className="eyebrow border border-white/50 px-4 py-3 text-[9px] hover:bg-white hover:text-[#3A3831]">
            Begin a project
          </a>
        </div>
      </header>

      <section id="top" className="hero-wash relative min-h-[92vh] overflow-hidden text-white">
        <div className="absolute inset-0 bg-black/5" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-end px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
          <div className="max-w-4xl">
            <p className="eyebrow mb-6 text-white/80">Curated interiors for modern living</p>
            <h1 className="serif max-w-4xl text-6xl leading-[.94] sm:text-7xl lg:text-8xl">
              Space. Purpose. <span className="italic">Beauty.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/82">
              Thoughtful residential interiors and made-to-order furnishings shaped by proportion,
              material, function, and a sense of quiet permanence.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-40">
        <div>
          <p className="eyebrow text-[#8C867B]">The studio</p>
        </div>
        <div>
          <h2 className="serif max-w-3xl text-4xl leading-tight sm:text-5xl">
            Design that feels composed, personal, and built to live with beautifully.
          </h2>
          <div className="mt-10 grid gap-8 border-t editorial-rule pt-8 sm:grid-cols-2">
            <p className="text-sm leading-7 text-[#68645B]">
              Gia Michèle Design pairs interior design services with a growing private-label furniture
              collection, creating a more complete experience from room concept through final placement.
            </p>
            <p className="text-sm leading-7 text-[#68645B]">
              Every product offered through the collection must be original to the brand or sourced from
              a legally licensed catalog. Exclusivity is built through curation, customization, service,
              and presentation—not imitation.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#EBE7DF] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-[#8C867B]">Services</p>
              <h2 className="serif mt-4 text-5xl">A considered level of support.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#68645B]">
              Service tiers are read from Supabase when configured, with graceful public-safe fallback copy.
            </p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article key={service.id} className="luxury-card flex min-h-64 flex-col justify-between p-8">
                <div>
                  <p className="eyebrow text-[#8C867B]">{service.price_display}</p>
                  <h3 className="serif mt-5 text-3xl">{service.title}</h3>
                </div>
                <p className="mt-10 text-sm leading-6 text-[#68645B]">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="collection" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
        <div className="max-w-3xl">
          <p className="eyebrow text-[#8C867B]">Private-label collection</p>
          <h2 className="serif mt-4 text-5xl leading-tight">Made to order. Presented with intention.</h2>
          <p className="mt-7 max-w-2xl text-sm leading-7 text-[#68645B]">
            The collection is structured for a zero-inventory operating model: qualified orders fund production,
            customization is confirmed before release, and expected lead times are communicated before deposit.
          </p>
        </div>

        {portfolio.length > 0 ? (
          <div className="mt-14 grid auto-rows-[320px] gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((asset, index) => (
              <article
                key={asset.id}
                className={`group relative overflow-hidden bg-[#D9D3C8] ${index === 0 ? 'lg:col-span-2' : ''}`}
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(30,29,26,.62), transparent 58%), url(${asset.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <p className="eyebrow text-white/70">{asset.category ?? 'Portfolio'}</p>
                  <h3 className="serif mt-2 text-3xl">{asset.title}</h3>
                  {asset.location && <p className="mt-2 text-xs text-white/75">{asset.location}</p>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-14 border border-dashed editorial-rule bg-[#FAF9F6] p-12 text-center">
            <p className="serif text-3xl">Featured work is being curated.</p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#68645B]">
              No portfolio imagery is fabricated here. Approved projects will appear automatically when marked
              featured in the <code>portfolio_assets</code> table.
            </p>
          </div>
        )}
      </section>

      <section id="trade" className="bg-[#3A3831] px-6 py-28 text-[#FAF9F6] lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-white/55">Designer trade program</p>
            <h2 className="serif mt-5 text-5xl leading-tight">A collection designed to travel through trusted designers.</h2>
          </div>
          <div className="border-t border-white/20 pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <p className="text-sm leading-7 text-white/70">
              Qualified interior designers can access trade pricing, customization support, specification materials,
              and white-glove coordination. Trade discount bands are governed by approved program terms and should
              be finalized against product margin, freight, duty, damage reserve, and delivery cost before publication.
            </p>
            <a href="#contact" className="mt-9 inline-block border-b border-white/50 pb-2 text-xs font-bold uppercase tracking-[.22em]">
              Apply for trade access
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-28 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-7xl border-t editorial-rule pt-14">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_.7fr]">
            <div>
              <p className="eyebrow text-[#8C867B]">Begin a conversation</p>
              <h2 className="serif mt-5 max-w-3xl text-5xl leading-tight sm:text-6xl">
                Let’s shape the room—and the experience around it.
              </h2>
            </div>
            <div className="flex items-end lg:justify-end">
              <a href="mailto:hello@example.com" className="inline-block bg-[#3A3831] px-7 py-5 text-xs font-bold uppercase tracking-[.22em] text-white">
                Contact the studio
              </a>
            </div>
          </div>
          <footer className="mt-24 flex flex-col justify-between gap-6 border-t editorial-rule pt-8 text-xs text-[#8C867B] sm:flex-row">
            <p>© {new Date().getFullYear()} Gia Michèle Design</p>
            <p className="acool-signature">Production systems by ACoolBRANDING</p>
          </footer>
        </div>
      </section>
    </main>
  )
}
