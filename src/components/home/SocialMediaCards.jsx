import { ExternalLink, Play, Camera } from 'lucide-react';

const icons = { youtube: Play, instagram: Camera };

export default function SocialMediaCards({ links }) {
  return (
    <section className="px-4 md:px-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Bizi Takip Edin</h2>
        <p className="text-gray-500 text-sm mt-2">Güncel haberler ve paylaşımlar için sosyal medyamızı takip edin.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {links.map(link => {
          const Icon = icons[link.icon] || ExternalLink;
          return (
            <div key={link.id} className={`${link.bgLight} rounded-3xl p-6 border border-gray-100`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className={`font-bold text-sm ${link.textColor}`}>{link.platform}</div>
                  <div className="text-gray-500 text-xs">{link.handle}</div>
                </div>
                <span className="ml-auto text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{link.stats}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{link.description}</p>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${link.color} text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity`}
              >
                Ziyaret Et <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
