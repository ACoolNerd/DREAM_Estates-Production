const mobileNav = [
  ['About', '#about'],
  ['Services', '#services'],
  ['Collection', '#collection'],
  ['Trade', '#trade'],
  ['Contact', '#contact'],
]

export function MobileMenu() {
  return (
    <details className="relative md:hidden">
      <summary
        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center border border-white/40 [&::-webkit-details-marker]:hidden"
        aria-label="Open navigation menu"
      >
        <span className="grid gap-1">
          <span className="block h-px w-4 bg-white" />
          <span className="block h-px w-4 bg-white" />
          <span className="block h-px w-4 bg-white" />
        </span>
      </summary>
      <nav className="absolute right-0 top-12 min-w-52 border border-white/20 bg-[#3A3831]/95 p-5 shadow-2xl backdrop-blur-md">
        <div className="grid gap-4">
          {mobileNav.map(([label, href]) => (
            <a key={href} href={href} className="eyebrow text-[10px] text-white/80 hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </nav>
    </details>
  )
}
