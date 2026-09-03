const modules = [
  { title: 'Onboarding', body: 'Complete organization setup, communication rules, security orientation, and partner training.' },
  { title: 'Client Introductions', body: 'Submit minimum-necessary client context for authorized routing to the licensed mortgage team.' },
  { title: 'Resources', body: 'Use current, approved educational and marketing assets with claim/disclosure version control.' },
  { title: 'Training', body: 'Review self-employed borrower education, role boundaries, escalation, and workflow playbooks.' },
  { title: 'Support', body: 'Route borrower-specific, compliance, technical, or operational questions to the correct human owner.' },
  { title: 'Partner Health', body: 'Track onboarding completion, activity, response SLAs, support, and quarterly review readiness.' }
];

export default function PortalHome() {
  return (
    <main className="shell">
      <header className="topbar">
        <div><strong>DREAM.<em>Estates</em></strong><span>CPA PARTNER PORTAL</span></div>
        <div className="status">DEVELOPMENT PREVIEW</div>
      </header>

      <section className="welcome">
        <div className="eyebrow">Partner Workspace</div>
        <h1>One place for onboarding, education, introductions, and support.</h1>
        <p>This preview intentionally excludes protected mortgage documents and underwriting data. Production access will require authenticated organization membership and purpose-based authorization.</p>
      </section>

      <section className="grid">
        {modules.map((module, index) => (
          <article className="card" key={module.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{module.title}</h2>
            <p>{module.body}</p>
            <button disabled>Coming in next build</button>
          </article>
        ))}
      </section>

      <section className="boundary">
        <div><strong>Professional boundary</strong><p>Tax strategy remains with the CPA. Borrower-specific mortgage qualification, terms, and licensed activities route to authorized mortgage personnel.</p></div>
        <div><strong>Data boundary</strong><p>No SSN, bank credentials, identity documents, or protected mortgage files belong in this generic partner portal by default.</p></div>
      </section>
    </main>
  );
}
