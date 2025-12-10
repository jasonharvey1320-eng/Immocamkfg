import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Building2, 
  MapPin, 
  ShoppingBag, 
  Bed, 
  Building, 
  CheckCircle2, 
  Users, 
  TrendingUp,
  Award,
  ChevronRight,
  Search,
  Heart,
  Calculator,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";
import { cities, allProperties, getPropertiesByCity } from "@/lib/data";

const Index = () => {
  const navigate = useNavigate();

  const propertyTypes = [
    { icon: Home, label: "Maisons", count: 1247, color: "text-primary", slug: "maison" },
    { icon: Building2, label: "Appartements", count: 2853, color: "text-secondary", slug: "appartement" },
    { icon: MapPin, label: "Terrains", count: 642, color: "text-accent", slug: "terrain" },
    { icon: ShoppingBag, label: "Commerces", count: 428, color: "text-primary", slug: "commercial" },
    { icon: Bed, label: "Chambres", count: 1532, color: "text-secondary", slug: "chambre" },
    { icon: Building, label: "Immeubles", count: 187, color: "text-accent", slug: "immeuble" },
  ];

  const handleCityClick = (citySlug: string) => {
    navigate(`/catalogue?ville=${citySlug}`);
  };

  const handlePropertyTypeClick = (typeSlug: string) => {
    navigate(`/catalogue?type=${typeSlug}`);
  };

  const featuredProperties = allProperties.filter((p) => p.isFeatured).slice(0, 4);
  const recentProperties = allProperties.slice(-8);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 to-foreground/50" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground backdrop-blur-sm border-primary/30">
            🏡 Plus de 5000 biens disponibles
          </Badge>
          <h1 className="mb-6 text-4xl md:text-6xl font-bold text-white">
            Trouvez la Maison de Vos Rêves
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              au Cameroun
            </span>
          </h1>
          <p className="mb-8 text-xl text-white/90 max-w-2xl mx-auto">
            Des milliers d'annonces vérifiées dans toutes les régions du Cameroun. 
            Achat, location ou investissement, trouvez votre bien idéal.
          </p>

          <SearchBar />

          {/* Quick stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">5,247</p>
              <p className="text-sm text-muted-foreground">Annonces</p>
            </div>
            <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold text-secondary">10</p>
              <p className="text-sm text-muted-foreground">Régions</p>
            </div>
            <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold text-accent">2,340</p>
              <p className="text-sm text-muted-foreground">Biens vendus</p>
            </div>
            <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">15K+</p>
              <p className="text-sm text-muted-foreground">Clients satisfaits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recherche par Ville */}
      <section className="py-16 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <MapPin className="h-3 w-3 mr-1" />
              {cities.length} Villes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recherchez par Ville
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Découvrez les biens disponibles dans les principales villes du Cameroun
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cities.map((city) => (
              <Card
                key={city.name}
                onClick={() => handleCityClick(city.slug)}
                className="group cursor-pointer overflow-hidden border-border hover:border-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-elegant)] relative"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <MapPin className="h-6 w-6 text-white mb-2" />
                    <h3 className="font-bold text-lg mb-1">
                      {city.name}
                    </h3>
                    <p className="text-sm text-white/90 mb-2">{city.region}</p>
                    <p className="text-primary font-semibold text-lg">
                      {city.count} annonces
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Annonces en Vedette */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Annonces en Vedette
              </h2>
              <p className="text-muted-foreground">
                Les meilleures offres du moment
              </p>
            </div>
            <Button 
              variant="outline" 
              className="hidden md:flex"
              onClick={() => navigate("/catalogue")}
            >
              Voir tout
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Types de Biens */}
      <section className="py-16 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              <Building2 className="h-3 w-3 mr-1" />
              {propertyTypes.length} Catégories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recherchez par Type
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trouvez exactement ce que vous cherchez parmi nos différentes catégories de biens
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {propertyTypes.map((type) => (
              <Card
                key={type.label}
                onClick={() => handlePropertyTypeClick(type.slug)}
                className="group cursor-pointer overflow-hidden border-border hover:border-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-card)] bg-gradient-to-br from-card to-card/50"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <type.icon className={`h-8 w-8 ${type.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {type.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {type.count} biens
                  </p>
                  <ArrowRight className="h-4 w-4 mx-auto mt-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Annonces Récentes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Annonces Récentes
              </h2>
              <p className="text-muted-foreground">
                Les dernières opportunités immobilières
              </p>
            </div>
            <Button 
              variant="outline" 
              className="hidden md:flex"
              onClick={() => navigate("/catalogue")}
            >
              Voir tout
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ImmoCAM en Chiffres
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Des statistiques qui parlent d'elles-mêmes
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="text-center p-6 border-2 border-primary/20 hover:border-primary transition-colors bg-gradient-to-br from-card to-card/50">
              <div className="text-4xl font-bold text-primary mb-2">{allProperties.length}+</div>
              <p className="text-muted-foreground">Annonces Actives</p>
            </Card>
            <Card className="text-center p-6 border-2 border-secondary/20 hover:border-secondary transition-colors bg-gradient-to-br from-card to-card/50">
              <div className="text-4xl font-bold text-secondary mb-2">{cities.length}</div>
              <p className="text-muted-foreground">Villes Couvertes</p>
            </Card>
            <Card className="text-center p-6 border-2 border-accent/20 hover:border-accent transition-colors bg-gradient-to-br from-card to-card/50">
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <p className="text-muted-foreground">Taux de Satisfaction</p>
            </Card>
            <Card className="text-center p-6 border-2 border-primary/20 hover:border-primary transition-colors bg-gradient-to-br from-card to-card/50">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Support Client</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pourquoi Nous Choisir */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Award className="h-3 w-3 mr-1" />
              Excellence
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pourquoi Nous Choisir ?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              ImmoCAM est la plateforme immobilière de référence au Cameroun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border text-center hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Annonces Vérifiées
                </h3>
                <p className="text-muted-foreground">
                  Tous nos biens sont contrôlés et validés par nos équipes
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Contact Direct
                </h3>
                <p className="text-muted-foreground">
                  Échangez directement avec les propriétaires via WhatsApp
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Outils Gratuits
                </h3>
                <p className="text-muted-foreground">
                  Calculateurs de prêt, rentabilité et comparateur de biens
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Mise à Jour Quotidienne
                </h3>
                <p className="text-muted-foreground">
                  De nouvelles annonces chaque jour dans toutes les régions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à Trouver Votre Bien Idéal ?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de camerounais qui ont déjà trouvé leur maison grâce à ImmoCAM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="font-semibold"
              onClick={() => navigate("/catalogue")}
            >
              <Search className="mr-2 h-5 w-5" />
              Voir le Catalogue
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white text-white hover:bg-white hover:text-primary font-semibold"
              onClick={() => navigate("/contact")}
            >
              <Home className="mr-2 h-5 w-5" />
              Déposer une Annonce
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
