import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Building2, MapPin, Store, Building, DoorOpen } from "lucide-react";

interface Step1Props {
  formData: any;
  setFormData: (data: any) => void;
}

const propertyTypes = [
  {
    category: "Appartement",
    icon: Building2,
    subtypes: ["Studio", "F1", "F2", "F3", "F4", "F5+", "Duplex", "Triplex", "Penthouse"],
  },
  {
    category: "Maison",
    icon: Home,
    subtypes: ["Villa", "Duplex", "Bungalow", "Château"],
  },
  {
    category: "Terrain",
    icon: MapPin,
    subtypes: ["Résidentiel", "Commercial", "Agricole", "Industriel"],
  },
  {
    category: "Local commercial",
    icon: Store,
    subtypes: ["Bureau", "Boutique", "Entrepôt", "Showroom"],
  },
  {
    category: "Immeuble",
    icon: Building,
    subtypes: ["R+1", "R+2", "R+3", "R+4+"],
  },
  {
    category: "Chambre",
    icon: DoorOpen,
    subtypes: ["Chambre salon", "Chambre simple"],
  },
];

export const ListingStep1 = ({ formData, setFormData }: Step1Props) => {
  return (
    <div className="space-y-8">
      {/* Transaction Type */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">
          Type de transaction <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          defaultValue={formData.transaction || "vente"}
          onValueChange={(value) => setFormData({ ...formData, transaction: value })}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <RadioGroupItem value="vente" id="vente" className="peer sr-only" />
            <Label
              htmlFor="vente"
              className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all"
            >
              <span className="text-lg font-semibold">Vente</span>
              <span className="text-sm text-muted-foreground">
                Vendre votre bien
              </span>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="location" id="location" className="peer sr-only" />
            <Label
              htmlFor="location"
              className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all"
            >
              <span className="text-lg font-semibold">Location</span>
              <span className="text-sm text-muted-foreground">
                Louer votre bien
              </span>
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="location-vente"
              id="location-vente"
              className="peer sr-only"
            />
            <Label
              htmlFor="location-vente"
              className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all"
            >
              <span className="text-lg font-semibold">Location-Vente</span>
              <span className="text-sm text-muted-foreground">
                Les deux options
              </span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Property Type */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">
          Type de bien <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.category}
                className="border-2 border-muted rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-semibold">{type.category}</span>
                </div>
                <Select
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      propertyType: type.category,
                      propertySubtype: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {type.subtypes.map((subtype) => (
                      <SelectItem key={subtype} value={subtype}>
                        {subtype}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <strong>💡 Astuce :</strong> Sélectionnez le type qui correspond le mieux à votre bien. 
          Vous pourrez ajouter plus de détails dans les prochaines étapes.
        </p>
      </div>
    </div>
  );
};
