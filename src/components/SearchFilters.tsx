import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Bed, Bath, Maximize, RotateCcw } from "lucide-react";

const regions = [
  "Toutes les régions",
  "Centre",
  "Littoral",
  "Ouest",
  "Nord-Ouest",
  "Sud-Ouest",
  "Adamaoua",
  "Nord",
  "Extrême-Nord",
  "Est",
  "Sud",
];

const cities = {
  "Centre": ["Yaoundé", "Mbalmayo", "Obala", "Akonolinga"],
  "Littoral": ["Douala", "Edéa", "Nkongsamba", "Limbé"],
  "Ouest": ["Bafoussam", "Dschang", "Mbouda", "Bangangté"],
  "Nord-Ouest": ["Bamenda", "Kumbo", "Wum"],
  "Sud-Ouest": ["Buea", "Kumba", "Mamfé"],
  "Adamaoua": ["Ngaoundéré", "Tibati", "Banyo"],
  "Nord": ["Garoua", "Guider", "Tcholliré"],
  "Extrême-Nord": ["Maroua", "Kousseri", "Mokolo"],
  "Est": ["Bertoua", "Batouri", "Yokadouma"],
  "Sud": ["Ebolowa", "Kribi", "Sangmélima", "Ambam"],
};

const propertyTypes = [
  { id: "appartement", label: "Appartement" },
  { id: "maison", label: "Maison/Villa" },
  { id: "terrain", label: "Terrain" },
  { id: "commercial", label: "Local Commercial" },
  { id: "immeuble", label: "Immeuble" },
  { id: "chambre", label: "Chambre" },
];

const propertyStates = [
  { id: "neuf", label: "Neuf" },
  { id: "excellent", label: "Excellent" },
  { id: "bon", label: "Bon" },
  { id: "renover", label: "À rénover" },
  { id: "construction", label: "En construction" },
];

export const SearchFilters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [transaction, setTransaction] = useState(searchParams.get("transaction") || "all");
  const [selectedRegion, setSelectedRegion] = useState("Toutes les régions");
  const [priceRange, setPriceRange] = useState([0, 200000000]);
  const [areaRange, setAreaRange] = useState([0, 1000]);
  
  useEffect(() => {
    const maxPrice = searchParams.get("prix");
    if (maxPrice) {
      const price = parseInt(maxPrice.replace(/\s/g, "")) || 0;
      if (price > 0) {
        setPriceRange([0, Math.min(price, 200000000)]);
      }
    }
  }, [searchParams]);

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Filtres</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-2"
          onClick={() => {
            navigate("/catalogue");
            setTransaction("all");
            setSelectedRegion("Toutes les régions");
            setPriceRange([0, 200000000]);
            setAreaRange([0, 1000]);
          }}
        >
          <RotateCcw className="h-3 w-3" />
          Réinitialiser
        </Button>
      </div>

      <Separator />

      {/* Transaction Type */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Type de transaction</Label>
        <RadioGroup value={transaction} onValueChange={setTransaction}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="font-normal cursor-pointer">
              Tous
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vente" id="vente" />
            <Label htmlFor="vente" className="font-normal cursor-pointer">
              Vente
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="location" id="location" />
            <Label htmlFor="location" className="font-normal cursor-pointer">
              Location
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="location-vente" id="location-vente" />
            <Label htmlFor="location-vente" className="font-normal cursor-pointer">
              Location-Vente
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Location */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Localisation</Label>
        
        <div className="space-y-2">
          <Label htmlFor="region" className="text-xs text-muted-foreground">
            Région
          </Label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger id="region">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city" className="text-xs text-muted-foreground">
            Ville
          </Label>
          <Select disabled={selectedRegion === "Toutes les régions"}>
            <SelectTrigger id="city">
              <SelectValue placeholder="Sélectionnez une ville" />
            </SelectTrigger>
            <SelectContent>
              {selectedRegion !== "Toutes les régions" &&
                cities[selectedRegion as keyof typeof cities]?.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quartier" className="text-xs text-muted-foreground">
            Quartier
          </Label>
          <Input id="quartier" placeholder="Ex: Bastos, Akwa..." />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="nearby" />
          <Label
            htmlFor="nearby"
            className="text-xs font-normal cursor-pointer"
          >
            Rechercher dans les villes voisines
          </Label>
        </div>
      </div>

      <Separator />

      {/* Property Type */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Type de bien</Label>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox id={type.id} />
              <Label
                htmlFor={type.id}
                className="text-sm font-normal cursor-pointer"
              >
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Prix (FCFA)</Label>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={200000000}
            step={1000000}
            className="w-full"
          />
          <div className="flex items-center gap-3">
            <Input
              type="text"
              value={formatPrice(priceRange[0])}
              readOnly
              className="text-center"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="text"
              value={formatPrice(priceRange[1])}
              readOnly
              className="text-center"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="negotiable" />
          <Label
            htmlFor="negotiable"
            className="text-xs font-normal cursor-pointer"
          >
            Prix négociables uniquement
          </Label>
        </div>
      </div>

      <Separator />

      {/* Bedrooms */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Chambres</Label>
        <div className="flex flex-wrap gap-2">
          {["Studio", "1", "2", "3", "4", "5+"].map((num) => (
            <Button
              key={num}
              variant="outline"
              size="sm"
              className="flex-1 min-w-[60px]"
            >
              <Bed className="h-3 w-3 mr-1" />
              {num}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Bathrooms */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Salles de bain (min)</Label>
        <Select defaultValue="any">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Peu importe</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Area Range */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Surface (m²)</Label>
        <div className="space-y-4">
          <Slider
            value={areaRange}
            onValueChange={setAreaRange}
            min={0}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex items-center gap-3">
            <Input
              type="number"
              value={areaRange[0]}
              readOnly
              className="text-center"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              value={areaRange[1]}
              readOnly
              className="text-center"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Property State */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">État du bien</Label>
        <div className="space-y-2">
          {propertyStates.map((state) => (
            <div key={state.id} className="flex items-center space-x-2">
              <Checkbox id={state.id} />
              <Label
                htmlFor={state.id}
                className="text-sm font-normal cursor-pointer"
              >
                {state.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <Button 
          className="w-full"
          onClick={() => {
            const params = new URLSearchParams();
            if (transaction !== "all") params.append("transaction", transaction);
            if (priceRange[1] < 200000000) params.append("prix", priceRange[1].toString());
            const citySlug = searchParams.get("ville");
            if (citySlug) params.append("ville", citySlug);
            navigate(`/catalogue?${params.toString()}`);
          }}
        >
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
};
