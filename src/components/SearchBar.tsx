import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { cities } from "@/lib/data";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [city, setCity] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (transaction !== "all") params.append("transaction", transaction);
    if (propertyType !== "all") params.append("type", propertyType);
    if (city !== "all") params.append("ville", city);
    if (maxPrice) params.append("prix", maxPrice);
    
    navigate(`/catalogue?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-card rounded-2xl shadow-[var(--shadow-elegant)] p-6 backdrop-blur-sm bg-card/95">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Type de transaction */}
          <Select value={transaction} onValueChange={setTransaction}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Transaction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="vente">Vente</SelectItem>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="location-vente">Location-Vente</SelectItem>
            </SelectContent>
          </Select>

          {/* Type de bien */}
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="appartement">Appartement</SelectItem>
              <SelectItem value="maison">Maison</SelectItem>
              <SelectItem value="terrain">Terrain</SelectItem>
              <SelectItem value="commercial">Local commercial</SelectItem>
              <SelectItem value="chambre">Chambre</SelectItem>
            </SelectContent>
          </Select>

          {/* Ville */}
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les villes</SelectItem>
              {cities.map((cityItem) => (
                <SelectItem key={cityItem.slug} value={cityItem.slug}>
                  {cityItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Prix */}
          <Input
            type="text"
            placeholder="Prix max (FCFA)"
            className="bg-background"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          {/* Bouton recherche */}
          <Button 
            className="lg:col-span-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={handleSearch}
          >
            <Search className="mr-2 h-4 w-4" />
            Rechercher
          </Button>
        </div>
      </div>
    </div>
  );
};
