import { ExternalLink } from 'lucide-react';

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
    </svg>
  );
}

function YouTubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const icons = { instagram: InstagramIcon, x: XIcon, youtube: YouTubeIcon, facebook: FacebookIcon };

export default function SocialMediaCards({ links }) {
  const doubled = [...links, ...links];

  return (
    <section className="px-4 md:px-6 overflow-hidden">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Bizi Takip Edin</h2>
        <p className="text-gray-500 text-sm mt-2">Güncel haberler ve paylaşımlar için sosyal medyamızı takip edin.</p>
      </div>
      <div className="marquee-paused relative">
        <div className="flex gap-4 w-max animate-marquee">
          {doubled.map((link, i) => {
            const Icon = icons[link.icon] || ExternalLink;
            return (
              <a
                key={`${link.id}-${i}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-3xl p-5 border border-gray-100 shadow-md hover:shadow-xl transition-all w-64 md:w-72 flex-shrink-0"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wide truncate">{link.group}</div>
                    <div className="font-bold text-gray-900 text-sm">{link.platform}</div>
                  </div>
                </div>
                <div className="text-gray-500 text-xs font-medium mb-3 truncate">{link.handle}</div>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-semibold group-hover:gap-2.5 transition-all">
                  Ziyaret Et <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}