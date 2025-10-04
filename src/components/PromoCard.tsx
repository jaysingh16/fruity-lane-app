import { cn } from "@/lib/utils";

interface PromoCardProps {
  title: string;
  subtitle: string;
  buttonText: string;
  gradient: string;
  icon?: string;
}

const PromoCard = ({ title, subtitle, buttonText, gradient, icon }: PromoCardProps) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl p-5 shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer group",
      gradient
    )}>
      <div className="relative z-10 space-y-2">
        <p className="text-xs font-bold text-white/90 uppercase tracking-wide">{title}</p>
        <p className="text-sm font-bold text-white">{subtitle}</p>
        <button className="mt-3 bg-white/95 hover:bg-white text-foreground px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
          {buttonText}
        </button>
      </div>
      
      {icon && (
        <div className="absolute bottom-0 right-0 text-6xl opacity-20 transform translate-x-2 translate-y-2 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      )}
    </div>
  );
};

export default PromoCard;
