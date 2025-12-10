import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchFilters } from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid3x3, List, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { allProperties, getPropertiesByCity, getCityBySlug } from "@/lib/data";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");
  
  const citySlug = searchParams.get("ville") || "all";
  const transaction = searchParams.get("transaction") || "all";
  const propertyType = searchParams.get("type") || "all";
  const maxPriceParam = searchParams.get("prix");
  
  const city = citySlug !== "all" ? getCityBySlug(citySlug) : null;

  const filteredProperties = useMemo(() => {
    let properties = getPropertiesByCity(citySlug);
    
    // Filtre par transaction
    if (transaction !== "all") {
      properties = properties.filter((p) => {
        if (transaction === "vente") return p.type === "Vente";
        if (transaction === "location") return p.type === "Location";
        return true;
      });
    }
    
    // Filtre par type de bien
    if (propertyType !== "all") {
      properties = properties.filter((p) => p.propertyType === propertyType);
    }
    
    // Filtre par prix max
    if (maxPriceParam) {
      const maxPrice = parseInt(maxPriceParam.replace(/\s/g, "")) || 0;
      if (maxPrice > 0) {
        properties = properties.filter((p) => p.price <= maxPrice);
      }
    }
    
    // Tri
    switch (sortBy) {
      case "price-asc":
        properties = [...properties].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        properties = [...properties].sort((a, b) => b.price - a.price);
        break;
      case "area-desc":
        properties = [...properties].sort((a, b) => b.area - a.area);
        break;
      default:
        // Plus récents (déjà triés)
        break;
    }
    
    return properties;
  }, [citySlug, sortBy, transaction, propertyType, maxPriceParam]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">Accueil</a>
              <span>/</span>
              <span className="text-foreground">Recherche</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-24">
                <SearchFilters />
              </div>
            </aside>

            {/* Mobile Filters */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtres
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <SearchFilters />
                </SheetContent>
              </Sheet>
            </div>

            {/* Results Section */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="mb-6">
                {city && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {city.name}
                      </Badge>
                      <span className="text-muted-foreground">
                        {city.region} • {city.count} annonces disponibles
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-1">
                      {city ? `Biens immobiliers à ${city.name}` : "Biens immobiliers au Cameroun"}
                    </h1>
                    <p className="text-muted-foreground">
                      {filteredProperties.length} {filteredProperties.length === 1 ? "bien trouvé" : "biens trouvés"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Sort */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Plus récents</SelectItem>
                        <SelectItem value="price-asc">Prix croissant</SelectItem>
                        <SelectItem value="price-desc">Prix décroissant</SelectItem>
                        <SelectItem value="area-desc">Surface décroissante</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View Toggle */}
                    <div className="flex border border-border rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3x3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Properties Grid */}
              {filteredProperties.length > 0 ? (
                <>
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "flex flex-col gap-6"
                    }
                  >
                    {filteredProperties.map((property) => (
                      <PropertyCard key={property.id} {...property} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <Button variant="outline" disabled>
                      Précédent
                    </Button>
                    <Button variant="secondary">1</Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <Button variant="outline">
                      Suivant
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aucun bien trouvé
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Aucun bien ne correspond à vos critères de recherche.
                    <br />
                    Essayez de modifier vos filtres.
                  </p>
                  <Button variant="outline">Réinitialiser les filtres</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
