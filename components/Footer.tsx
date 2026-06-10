const footerLinks = [
  { label: 'writing',   href: '/writing'                         },
  { label: 'journey',   href: '/journey'                         },
  { label: 'resources', href: '/resources'                       },
  { label: 'github',    href: 'https://github.com/zebacodes'     },
  { label: 'linkedin',  href: 'https://linkedin.com/in/zeba-a-7173251a0' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(240,235,224,0.07)' }}>
      <div className="px-6 sm:px-12 py-7 max-w-[1200px] mx-auto flex flex-wrap justify-between items-center gap-4">
        <p className="font-mono text-[11px]" style={{ color: 'rgba(240,235,224,0.22)' }}>
          <span style={{ color: 'rgba(240,235,224,0.45)' }}>Zeba Ali</span>
          {' '}· zebaali1415@gmail.com · +91-9953098290
        </p>
        <ul className="flex flex-wrap gap-6 list-none">
          {footerLinks.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-mono text-[11px] transition-colors duration-150"
                style={{ color: 'rgba(240,235,224,0.28)' }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
