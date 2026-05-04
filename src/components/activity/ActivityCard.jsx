import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function ActivityCard({ activity }) {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col">
      <div className="bg-gradient-to-br from-emerald-700 to-teal-700 h-28 flex items-center justify-center relative">
        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {activity.emoji}
        </div>
        <Badge variant="white" className="absolute top-3 left-3 shadow-sm">
          {activity.category}
        </Badge>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(activity.date)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {activity.location}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2">{activity.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{activity.description}</p>
        <Link
          to={`/faaliyetler/${activity.slug}`}
          className="mt-4 flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 text-sm font-semibold transition-colors group/link"
        >
          Devamını Oku
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
