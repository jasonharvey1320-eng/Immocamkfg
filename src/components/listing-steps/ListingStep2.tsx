import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin } from "lucide-react";

interface Step2Props {
  formData: any;
  setFormData: (data: any) => void;
}

const regions = [
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
  Centre: ["Yaoundé", "Mbalmayo", "Obala", "Akonolinga"],
  Littoral: ["Douala", "Edéa", "Nkongsamba", "Limbé"],
  Ouest: ["Bafoussam", "Dschang", "Mbouda", "Bangangté"],
  "Nord-Ouest": ["Bamenda", "Kumbo", "Wum"],
  "Sud-Ouest": ["Buéa", "Kumba", "Mamfé"],
  Adamaoua: ["Ngaoundéré", "Tibati", "Banyo"],
  Nord: ["Garoua", "Guider", "Tcholliré"],
  "Extrême-Nord": ["Maroua", "Kousseri", "Mokolo"],
  Est: ["Bertoua", "Batouri", "Yokadouma"],
  Sud: ["Ebolowa", "Kribi", "Sangmélima", "Ambam"],
};

const pointsOfInterest = [
  "École primaire",
  "Collège/Lycée",
  "Université",
  "Hôpital/Clinique",
  "Pharmacie",
  "Supermarché",
  "Marché",
  "Banque",
  "Station essence",
  "Transport public",
  "Église/Mosquée",
  "Restaurant",
  "Parc/Espace vert",
];

export const ListingStep2 = ({ formData, setFormData }: Step2Props) => {
  const selectedRegion = formData.region || "";

  return (
    <div className="space-y-6">
      {/* Region */}
      <div className="space-y-2">
        <Label htmlFor="region">
          Région <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.region}
          onValueChange={(value) => setFormData({ ...formData, region: value, city: "" })}
        >
          <SelectTrigger id="region">
            <SelectValue placeholder="Sélectionnez une région" />
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

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city">
          Ville <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.city}
          onValueChange={(value) => setFormData({ ...formData, city: value })}
          disabled={!selectedRegion}
        >
          <SelectTrigger id="city">
            <SelectValue placeholder="Sélectionnez une ville" />
          </SelectTrigger>
          <SelectContent>
            {selectedRegion &&
              cities[selectedRegion as keyof typeof cities]?.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quartier */}
      <div className="space-y-2">
        <Label htmlFor="quartier">
          Quartier <span className="text-destructive">*</span>
        </Label>
        <Input
          id="quartier"
          placeholder="Ex: Bastos, Akwa, Bonapriso..."
          value={formData.quartier || ""}
          onChange={(e) => setFormData({ ...formData, quartier: e.target.value })}
        />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Adresse précise (optionnelle)</Label>
        <Input
          id="address"
          placeholder="Ex: Avenue Kennedy, en face de..."
          value={formData.address || ""}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          Cette information ne sera pas affichée publiquement pour votre sécurité
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="space-y-2">
        <Label>Localisation sur la carte</Label>
        <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center bg-muted/30">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            Carte interactive pour pointer l'emplacement
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            (Fonctionnalité à implémenter avec Leaflet/Mapbox)
          </p>
        </div>
      </div>

      {/* Points of Interest */}
      <div className="space-y-3">
        <Label>Points d'intérêt à proximité</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {pointsOfInterest.map((poi) => (
            <div key={poi} className="flex items-center space-x-2">
              <Checkbox
                id={poi}
                checked={formData.pointsOfInterest?.includes(poi)}
                onCheckedChange={(checked) => {
                  const current = formData.pointsOfInterest || [];
                  const updated = checked
                    ? [...current, poi]
                    : current.filter((p: string) => p !== poi);
                  setFormData({ ...formData, pointsOfInterest: updated });
                }}
              />
              <Label
                htmlFor={poi}
                className="text-sm font-normal cursor-pointer"
              >
                {poi}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <strong>💡 Conseil :</strong> Plus votre localisation est précise, plus vous aurez de chances d'être contacté rapidement. Les acheteurs apprécient de savoir exactement où se situe le bien.
        </p>
      </div>
    </div>
  );
};
