import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bed, Bath, Maximize, Building, Calendar, Wrench } from "lucide-react";

interface Step3Props {
  formData: any;
  setFormData: (data: any) => void;
}

const propertyStates = ["Neuf", "Excellent", "Bon", "À rénover", "En construction"];
const titleTypes = ["Titre foncier", "Attestation", "Bail", "ACD", "Aucun"];

export const ListingStep3 = ({ formData, setFormData }: Step3Props) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bedrooms */}
        <div className="space-y-2">
          <Label htmlFor="bedrooms" className="flex items-center gap-2">
            <Bed className="h-4 w-4" />
            Nombre de chambres <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.bedrooms?.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, bedrooms: parseInt(value) })
            }
          >
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Studio (0)</SelectItem>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "chambre" : "chambres"}
                </SelectItem>
              ))}
              <SelectItem value="11">10+ chambres</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Living Rooms */}
        <div className="space-y-2">
          <Label htmlFor="livingRooms">Nombre de salons</Label>
          <Select
            value={formData.livingRooms?.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, livingRooms: parseInt(value) })
            }
          >
            <SelectTrigger id="livingRooms">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num <= 1 ? "salon" : "salons"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div className="space-y-2">
          <Label htmlFor="bathrooms" className="flex items-center gap-2">
            <Bath className="h-4 w-4" />
            Nombre de salles de bain <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.bathrooms?.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, bathrooms: parseInt(value) })
            }
          >
            <SelectTrigger id="bathrooms">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Toilets */}
        <div className="space-y-2">
          <Label htmlFor="toilets">Nombre de toilettes</Label>
          <Select
            value={formData.toilets?.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, toilets: parseInt(value) })
            }
          >
            <SelectTrigger id="toilets">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Kitchens */}
        <div className="space-y-2">
          <Label htmlFor="kitchens">Nombre de cuisines</Label>
          <Select
            value={formData.kitchens?.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, kitchens: parseInt(value) })
            }
          >
            <SelectTrigger id="kitchens">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Living Area */}
        <div className="space-y-2">
          <Label htmlFor="area" className="flex items-center gap-2">
            <Maximize className="h-4 w-4" />
            Surface habitable (m²) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="area"
            type="number"
            placeholder="Ex: 120"
            value={formData.area || ""}
            onChange={(e) =>
              setFormData({ ...formData, area: parseInt(e.target.value) })
            }
          />
        </div>

        {/* Land Area */}
        <div className="space-y-2">
          <Label htmlFor="landArea">Surface du terrain (m²)</Label>
          <Input
            id="landArea"
            type="number"
            placeholder="Ex: 500"
            value={formData.landArea || ""}
            onChange={(e) =>
              setFormData({ ...formData, landArea: parseInt(e.target.value) })
            }
          />
          <p className="text-xs text-muted-foreground">
            Si applicable (maison avec jardin, terrain, etc.)
          </p>
        </div>

        {/* Floors */}
        <div className="space-y-2">
          <Label htmlFor="floors" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Nombre d'étages
          </Label>
          <Select
            value={formData.floors?.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, floors: parseInt(value) })
            }
          >
            <SelectTrigger id="floors">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Plain-pied (0)</SelectItem>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "étage" : "étages"}
                </SelectItem>
              ))}
              <SelectItem value="6">5+ étages</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property State */}
        <div className="space-y-2">
          <Label htmlFor="state" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            État du bien <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.state}
            onValueChange={(value) => setFormData({ ...formData, state: value })}
          >
            <SelectTrigger id="state">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {propertyStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Construction Year */}
        <div className="space-y-2">
          <Label htmlFor="year" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Année de construction
          </Label>
          <Input
            id="year"
            type="number"
            placeholder="Ex: 2020"
            min="1900"
            max={new Date().getFullYear()}
            value={formData.year || ""}
            onChange={(e) =>
              setFormData({ ...formData, year: parseInt(e.target.value) })
            }
          />
        </div>

        {/* Title Type */}
        <div className="space-y-2">
          <Label htmlFor="titleType">Type de titre foncier</Label>
          <Select
            value={formData.titleType}
            onValueChange={(value) =>
              setFormData({ ...formData, titleType: value })
            }
          >
            <SelectTrigger id="titleType">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {titleTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <strong>💡 Important :</strong> Soyez précis dans vos informations. Les acheteurs/locataires apprécient d'avoir tous les détails avant de vous contacter.
        </p>
      </div>
    </div>
  );
};
