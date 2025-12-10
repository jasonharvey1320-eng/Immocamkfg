import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize, MapPin, Phone, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "Vente" | "Location";
  isNew?: boolean;
  isFeatured?: boolean;
  isUrgent?: boolean;
  negotiable?: boolean;
  hasTitleDeed?: boolean;
}

export const PropertyCard = ({
  id,
  image,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  type,
  isNew,
  isFeatured,
  isUrgent,
  negotiable,
  hasTitleDeed,
}: PropertyCardProps) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  return (
    <Card 
      className="group overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-elegant)] cursor-pointer"
      onClick={() => navigate(`/catalogue?property=${id}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges en coin supérieur */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-accent text-accent-foreground font-semibold">
              Nouveau
            </Badge>
          )}
          {isUrgent && (
            <Badge className="bg-destructive text-destructive-foreground font-semibold">
              Urgent
            </Badge>
          )}
          {isFeatured && (
            <Badge className="bg-secondary text-secondary-foreground font-semibold">
              Vedette
            </Badge>
          )}
        </div>

        {/* Type de transaction */}
        <Badge
          className={`absolute right-3 top-3 font-semibold ${
            type === "Vente"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          {type}
        </Badge>


        {/* Overlay avec actions */}
        <div className="absolute inset-0 bg-foreground/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-2 backdrop-blur-sm">
          <Button 
            size="sm" 
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://wa.me/237699000000?text=Bonjour, je suis intéressé par: ${title} - ${location}`, '_blank');
            }}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            WhatsApp
          </Button>
          <Button 
            size="sm" 
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = 'tel:+237699000000';
            }}
          >
            <Phone className="h-4 w-4 mr-1" />
            Appeler
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Prix */}
        <div className="mb-2">
          <p className="text-2xl font-bold text-primary">{formatPrice(price)}</p>
          {negotiable && (
            <Badge variant="outline" className="mt-1 text-xs">
              Négociable
            </Badge>
          )}
        </div>

        {/* Titre */}
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground">
          {title}
        </h3>

        {/* Localisation */}
        <div className="mb-3 flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Caractéristiques */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-3">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{area}m²</span>
          </div>
        </div>

        {/* Titre foncier */}
        {hasTitleDeed && (
          <Badge variant="outline" className="mt-3 border-secondary text-secondary">
            Titre foncier
          </Badge>
        )}
      </div>
    </Card>
  );
};
