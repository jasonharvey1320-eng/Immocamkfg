import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchFilters } from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid3x3, List, SlidersHorizontal, Search, X, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { allProperties, getPropertiesByCity, getCityBySlug, cities } from "@/lib/data";

const ITEMS_PER_PAGE = 12;

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const citySlug = searchParams.get("ville") || "all";
  const transaction = searchParams.get("transaction") || "all";
  const propertyType = searchParams.get("type") || "all";
  const maxPriceParam = searchParams.get("prix");
  const pageParam = searchParams.get("page");
  
  const city = citySlug !== "all" ? getCityBySlug(citySlug) : null;

  // Synchroniser la page avec l'URL
  useEffect(() => {
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
      }
    } else {
      setCurrentPage(1);
    }
  }, [pageParam]);

  const filteredProperties = useMemo(() => {
    setIsLoading(true);
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
    
    setIsLoading(false);
    return properties;
  }, [citySlug, sortBy, transaction, propertyType, maxPriceParam]);

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

  // Réinitialiser à la page 1 quand les filtres changent
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
      updatePageInUrl(1);
    }
  }, [filteredProperties.length, totalPages]);

  const updatePageInUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    setSearchParams(params, { replace: true });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      updatePageInUrl(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
    updatePageInUrl(1);
  };

  const resetFilters = () => {
    navigate("/catalogue");
    setCurrentPage(1);
    setSortBy("recent");
  };

  // Générer les numéros de page pour la pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb amélioré */}
        <div className="border-b border-border bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors duration-200">Accueil</a>
              <span>/</span>
              <span className="text-foreground font-medium">Catalogue</span>
              {city && (
                <>
                  <span>/</span>
                  <span className="text-foreground font-medium">{city.name}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 lg:py-12">
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
                  <Button variant="outline" className="w-full shadow-sm hover:shadow-md transition-shadow">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtres
                    {(transaction !== "all" || propertyType !== "all" || maxPriceParam) && (
                      <Badge variant="secondary" className="ml-2">
                        {[transaction !== "all", propertyType !== "all", !!maxPriceParam].filter(Boolean).length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                  <SearchFilters />
                </SheetContent>
              </Sheet>
            </div>

            {/* Results Section */}
            <div className="flex-1 min-w-0">
              {/* Results Header amélioré */}
              <div className="mb-6 space-y-4">
                {city && (
                  <div className="p-5 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-xl border border-primary/20 shadow-sm transition-all duration-500 animate-fade-in"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="outline" className="text-base px-4 py-1.5 border-primary/30">
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                        {city.name}
                      </Badge>
                      <span className="text-muted-foreground text-sm">
                        {city.region} • {city.count} annonces disponibles
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                      {city ? `Catalogue - ${city.name}` : "Catalogue Immobilier"}
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      {filteredProperties.length} {filteredProperties.length === 1 ? "bien trouvé" : "biens trouvés"}
                      {totalPages > 1 && (
                        <span className="text-sm">• Page {currentPage} sur {totalPages}</span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Sort */}
                    <Select value={sortBy} onValueChange={handleSortChange}>
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
                    <div className="flex border border-border rounded-lg p-1 bg-muted/30">
                      <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3x3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Filtres actifs */}
                {(transaction !== "all" || propertyType !== "all" || maxPriceParam) && (
                  <div className="flex items-center gap-2 flex-wrap p-3 bg-muted/50 rounded-lg border border-border">
                    <span className="text-sm text-muted-foreground">Filtres actifs:</span>
                    {transaction !== "all" && (
                      <Badge variant="secondary" className="gap-1">
                        {transaction === "vente" ? "Vente" : transaction === "location" ? "Location" : transaction}
                        <button
                          onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.delete("transaction");
                            setSearchParams(params);
                          }}
                          className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {propertyType !== "all" && (
                      <Badge variant="secondary" className="gap-1">
                        {propertyType}
                        <button
                          onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.delete("type");
                            setSearchParams(params);
                          }}
                          className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {maxPriceParam && (
                      <Badge variant="secondary" className="gap-1">
                        Prix max: {parseInt(maxPriceParam.replace(/\s/g, "")).toLocaleString("fr-FR")} FCFA
                        <button
                          onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.delete("prix");
                            setSearchParams(params);
                          }}
                          className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="h-7 text-xs"
                    >
                      Tout effacer
                    </Button>
                  </div>
                )}
              </div>

              {/* Properties Grid avec animations */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : filteredProperties.length > 0 ? (
                <>
                  <div
                    key={`${currentPage}-${viewMode}`}
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "flex flex-col gap-6"
                    }
                  >
                    {paginatedProperties.map((property, index) => (
                      <div
                        key={property.id}
                        className="transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <PropertyCard {...property} />
                      </div>
                    ))}
                  </div>

                  {/* Pagination améliorée */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage - 1);
                              }}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                          
                          {getPageNumbers().map((page, index) => (
                            <PaginationItem key={index}>
                              {page === "ellipsis" ? (
                                <PaginationEllipsis />
                              ) : (
                                <PaginationLink
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(page as number);
                                  }}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              )}
                            </PaginationItem>
                          ))}
                          
                          <PaginationItem>
                            <PaginationNext
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage + 1);
                              }}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}

                  {/* Info de pagination */}
                  {totalPages > 1 && (
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      Affichage de {startIndex + 1} à {Math.min(endIndex, filteredProperties.length)} sur {filteredProperties.length} biens
                    </div>
                  )}
                </>
              ) : (
                <div 
                  className="text-center py-20 px-4 transition-all duration-500 animate-fade-in"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                    <SlidersHorizontal className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Aucun bien trouvé
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Aucun bien ne correspond à vos critères de recherche.
                    <br />
                    Essayez de modifier vos filtres ou explorez d'autres villes.
                  </p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button variant="outline" onClick={resetFilters}>
                      Réinitialiser les filtres
                    </Button>
                    <Button onClick={() => navigate("/")}>
                      Voir toutes les villes
                    </Button>
                  </div>
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
