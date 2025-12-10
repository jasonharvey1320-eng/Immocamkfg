import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property5 from "@/assets/property-5.jpg";

// Type pour les favoris
interface FavoriteProperty {
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

// Données de démonstration (normalement stockées dans localStorage)
const demoFavorites: FavoriteProperty[] = [
  {
    id: "1",
    image: property1,
    title: "Villa moderne avec piscine à Bastos",
    price: 85000000,
    location: "Bastos, Yaoundé",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    type: "Vente",
    isNew: true,
    isFeatured: true,
    hasTitleDeed: true,
    negotiable: true,
  },
  {
    id: "2",
    image: property2,
    title: "Appartement F4 standing à Bonanjo",
    price: 35000000,
    location: "Bonanjo, Douala",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    type: "Vente",
    isNew: true,
    hasTitleDeed: true,
  },
  {
    id: "5",
    image: property5,
    title: "Villa avec jardin à Odza",
    price: 55000000,
    location: "Odza, Yaoundé",
    bedrooms: 5,
    bathrooms: 4,
    area: 280,
    type: "Vente",
    hasTitleDeed: true,
  },
];

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteProperty[]>([]);

  useEffect(() => {
    // Charger les favoris depuis localStorage
    const stored = localStorage.getItem("immocam_favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing favorites:", error);
        // Utiliser les données de démo en cas d'erreur
        setFavorites(demoFavorites);
      }
    } else {
      // Utiliser les données de démo si aucun favori n'est sauvegardé
      setFavorites(demoFavorites);
    }
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem("immocam_favorites", JSON.stringify(updated));
  };

  const clearAllFavorites = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer tous vos favoris ?")) {
      setFavorites([]);
      localStorage.setItem("immocam_favorites", JSON.stringify([]));
    }
  };

  const shareUrl = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: "Mes biens favoris - ImmoCAM",
        text: "Découvrez mes biens immobiliers favoris sur ImmoCAM",
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Lien copié dans le presse-papiers !");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">
                Accueil
              </a>
              <span>/</span>
              <span className="text-foreground">Favoris</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                  <Heart className="h-8 w-8 text-destructive fill-destructive" />
                  Mes Favoris
                </h1>
                <p className="text-muted-foreground">
                  {favorites.length} {favorites.length === 1 ? "bien enregistré" : "biens enregistrés"}
                </p>
              </div>

              {favorites.length > 0 && (
                <div className="flex gap-3">
                  <Button variant="outline" onClick={shareUrl}>
                    Partager mes favoris
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={clearAllFavorites}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Tout supprimer
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {favorites.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((property) => (
                  <div key={property.id} className="relative group">
                    <PropertyCard {...property} />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFavorite(property.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Info Card */}
              <div className="mt-12 bg-muted/50 border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  💡 Astuce
                </h3>
                <p className="text-muted-foreground text-sm">
                  Vos favoris sont sauvegardés localement dans votre navigateur. 
                  Pour ne pas les perdre, pensez à créer un compte ou à partager le lien de cette page.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Aucun favori enregistré
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Vous n'avez pas encore ajouté de biens à vos favoris. 
                Explorez nos annonces et cliquez sur le cœur pour sauvegarder vos biens préférés.
              </p>
              <Button asChild size="lg">
                <a href="/recherche">
                  Découvrir les annonces
                </a>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
