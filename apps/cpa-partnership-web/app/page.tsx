const benefits = [
  ['CPA Alignment', 'Keep tax strategy with the CPA while the licensed mortgage team evaluates financing paths.'],
  ['Self-Employed Focus', 'Educate business owners on alternative-documentation concepts without promising approval or terms.'],
  ['Partner Operations', 'Create a repeatable introduction, follow-up, training, and status workflow for professional partners.'],
  ['Proof + Governance', 'Version claims, disclosures, evidence, approvals, and distribution before regulated content is published.']
];

const methods = ['Business bank statements', 'Personal bank statements', 'Profit-and-loss documentation', 'Asset-based qualification', 'Rental-property cash flow'];

export default function HomePage() {
  return (
    <main>
      <nav className="nav shell">
        <div className="brand">DREAM.<em>Estates</em><span>CPA PARTNERSHIP</span></div>
        <div className="navLinks"><a href="#opportunity">Opportunity</a><a href="#solution">Solution</a><a href="#partners">Partners</a><a className="button small" href="#contact">Strategy Call</a></div>
      </nav>

      <section className="hero shell">
        <div className="eyebrow">Strategic Mortgage Partnership for CPAs</div>
        <h1>Protect the tax strategy.<br/><em>Expand the financing conversation.</em></h1>
        <p className="lede">A coordinated growth and operations platform for CPA firms, self-employed business owners, and licensed mortgage professionals.</p>
        <div className="actions"><a className="button" href="#partners">Explore the partnership</a><a className="button ghost" href="#solution">See how it works</a></div>
        <div className="truth">Discussion draft. Programs, rates, documentation, savings, and eligibility depend on borrower qualifications, lender guidelines, underwriting, and market conditions.</div>
      </section>

      <section id="opportunity" className="section shell">
        <div className="eyebrow">The Opportunity</div>
        <div className="twoCol">
          <div><h2>Good tax planning can complicate traditional mortgage qualification.</h2></div>
          <div className="bodyCopy"><p>Legitimate business deductions can reduce taxable income used by conventional underwriting. The answer should not automatically be to undo sound tax planning.</p><p>The better first question is whether an appropriate, legitimate financing path already exists for the borrower profile.</p></div>
        </div>
      </section>

      <section id="solution" className="section dark">
        <div className="shell">
          <div className="eyebrow">The Solution</div>
          <h2>Alternative-documentation education + governed partner workflow.</h2>
          <div className="grid4">{benefits.map(([title, body]) => <article className="card" key={title}><span>01</span><h3>{title}</h3><p>{body}</p></article>)}</div>
          <div className="methods"><div><strong>Examples of qualification methods</strong><p>Availability varies by lender and borrower.</p></div><ul>{methods.map(m => <li key={m}>{m}</li>)}</ul></div>
        </div>
      </section>

      <section id="partners" className="section shell">
        <div className="eyebrow">Partner Value</div>
        <h2>One coordinated experience. Three professional roles.</h2>
        <div className="flow"><div><small>CPA</small><strong>Tax strategy + client trust</strong></div><b>→</b><div><small>Mortgage Team</small><strong>Qualification + financing structure</strong></div><b>→</b><div><small>Client</small><strong>Real-estate opportunity + informed decisions</strong></div></div>
      </section>

      <section id="contact" className="section cta">
        <div className="shell twoCol"><div><div className="eyebrow">Next Action</div><h2>Build the partnership around proof, process, and professional boundaries.</h2></div><div><p>Review the positioning, verify credentials and program claims, define the partner workflow, and activate the first design-partner firms.</p><a className="button" href="mailto:partnerships@example.com">Schedule a strategy conversation</a></div></div>
      </section>

      <footer className="footer shell"><div>DREAM.Estates Production Ltd. — platform architecture</div><div>Creative direction: Darius | KINDCEO</div><div>ACoolNERD / ACoolBRANDING — production systems</div><small>Public-safe development build. No licensing, approval, rate, or compliance certification claim.</small></footer>
    </main>
  );
}
