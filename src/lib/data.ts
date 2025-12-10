// Données centralisées pour les villes et propriétés
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";
import property7 from "@/assets/property-7.jpg";
import property8 from "@/assets/property-8.jpg";
import YaoundeImg from "@/assets/Yaoundé.webp";
import YaoundeImg2 from "@/assets/Yaoundé 2.jpg";
import YaoundeImg3 from "@/assets/Yaoundé3.jpg";
import DoualaImg from "@/assets/Douala.jpg";
import DoualaImg2 from "@/assets/Douala2.jpg";
import DoualaImg3 from "@/assets/Douala3.jpg";
import BafoussamImg from "@/assets/Bafoussam.jpg";
import BafoussamImg2 from "@/assets/Bafoussam2.jpg";
import BamendaImg from "@/assets/Bamenda.jpg";
import GarouaImg from "@/assets/Garoua.jpg";
import MarouaImg from "@/assets/Maroua.jpg";
import MarouaImg2 from "@/assets/Maroua2.jpg";
import MarouaImg3 from "@/assets/Maroua3.jpg";
import NgaoundereImg from "@/assets/Ngaoundéré.jpg";
import BertouaImg from "@/assets/Bertoua.jpg";
import BertouaImg2 from "@/assets/Bertoua2.jpg";
import BertouaImg4 from "@/assets/Bertoua4.jpg";
import BueaImg from "@/assets/Buea2.jpg";
import EbolowaImg from "@/assets/Ebolowa.jpg";

export interface City {
  name: string;
  slug: string;
  region: string;
  count: number;
  image: string;
}

export interface Property {
  id: string;
  image: string;
  title: string;
  price: number;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "Vente" | "Location";
  propertyType?: "appartement" | "maison" | "terrain" | "commercial" | "immeuble" | "chambre";
  isNew?: boolean;
  isFeatured?: boolean;
  isUrgent?: boolean;
  negotiable?: boolean;
  hasTitleDeed?: boolean;
}

export const cities: City[] = [
  { name: "Yaoundé", slug: "yaounde", region: "Centre", count: 1243, image: YaoundeImg },
  { name: "Douala", slug: "douala", region: "Littoral", count: 2156, image: DoualaImg },
  { name: "Bafoussam", slug: "bafoussam", region: "Ouest", count: 428, image: BafoussamImg },
  { name: "Bamenda", slug: "bamenda", region: "Nord-Ouest", count: 367, image: BamendaImg },
  { name: "Garoua", slug: "garoua", region: "Nord", count: 289, image: GarouaImg },
  { name: "Maroua", slug: "maroua", region: "Extrême-Nord", count: 245, image: MarouaImg },
  { name: "Ngaoundéré", slug: "ngaoundere", region: "Adamaoua", count: 312, image: NgaoundereImg },
  { name: "Bertoua", slug: "bertoua", region: "Est", count: 198, image: BertouaImg },
  { name: "Buea", slug: "buea", region: "Sud-Ouest", count: 156, image: BueaImg },
  { name: "Ebolowa", slug: "ebolowa", region: "Sud", count: 134, image: EbolowaImg },
];

export const allProperties: Property[] = [
  // Yaoundé
  {
    id: "1",
    image: property2,
    title: "Villa Moderne avec Piscine - Bastos",
    price: 150000000,
    location: "Bastos, Yaoundé",
    city: "Yaoundé",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    type: "Vente",
    propertyType: "maison",
    isFeatured: true,
    hasTitleDeed: true,
    negotiable: true,
  },
  {
    id: "3",
    image: property3,
    title: "Duplex Contemporain - Odza",
    price: 85000000,
    location: "Odza, Yaoundé",
    city: "Yaoundé",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    type: "Vente",
    propertyType: "maison",
    hasTitleDeed: true,
  },
  {
    id: "5",
    image: property4,
    title: "Appartement Moderne Meublé",
    price: 25000000,
    location: "Mvan, Yaoundé",
    city: "Yaoundé",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    type: "Vente",
    propertyType: "appartement",
    isNew: true,
  },
  {
    id: "7",
    image: property7,
    title: "Studio Étudiant Tout Confort",
    price: 15000000,
    location: "Ngoa-Ekellé, Yaoundé",
    city: "Yaoundé",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    type: "Vente",
    propertyType: "appartement",
    isNew: true,
  },
  // Douala
  {
    id: "2",
    image: property1,
    title: "Appartement Standing - Bonanjo",
    price: 35000000,
    location: "Bonanjo, Douala",
    city: "Douala",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: "Vente",
    propertyType: "appartement",
    isNew: true,
    hasTitleDeed: true,
  },
  {
    id: "4",
    image: property5,
    title: "Villa de Luxe Sécurisée",
    price: 200000000,
    location: "Bonapriso, Douala",
    city: "Douala",
    bedrooms: 6,
    bathrooms: 5,
    area: 450,
    type: "Vente",
    propertyType: "maison",
    isFeatured: true,
    hasTitleDeed: true,
  },
  {
    id: "6",
    image: property6,
    title: "Bureau Commercial Centre Ville",
    price: 45000000,
    location: "Centre-Ville, Douala",
    city: "Douala",
    bedrooms: 0,
    bathrooms: 2,
    area: 150,
    type: "Vente",
    propertyType: "commercial",
  },
  {
    id: "8",
    image: property8,
    title: "Terrain Résidentiel Titré",
    price: 20000000,
    location: "Logpom, Douala",
    city: "Douala",
    bedrooms: 0,
    bathrooms: 0,
    area: 600,
    type: "Vente",
    propertyType: "terrain",
    hasTitleDeed: true,
  },
  // Bafoussam
  {
    id: "9",
    image: BafoussamImg2,
    title: "Maison Moderne avec Jardin - Bafoussam",
    price: 45000000,
    location: "Centre, Bafoussam",
    city: "Bafoussam",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    type: "Vente",
    propertyType: "maison",
    hasTitleDeed: true,
  },
  {
    id: "10",
    image: property1,
    title: "Appartement F3 - Bafoussam",
    price: 18000000,
    location: "Quartier résidentiel, Bafoussam",
    city: "Bafoussam",
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    type: "Vente",
    propertyType: "appartement",
  },
  // Bamenda
  {
    id: "11",
    image: BamendaImg,
    title: "Villa avec Vue Panoramique - Bamenda",
    price: 55000000,
    location: "Up Station, Bamenda",
    city: "Bamenda",
    bedrooms: 5,
    bathrooms: 4,
    area: 280,
    type: "Vente",
    propertyType: "maison",
    isFeatured: true,
    hasTitleDeed: true,
  },
  // Garoua
  {
    id: "12",
    image: GarouaImg,
    title: "Maison Traditionnelle Rénovée - Garoua",
    price: 32000000,
    location: "Centre-ville, Garoua",
    city: "Garoua",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    type: "Vente",
    propertyType: "maison",
    negotiable: true,
  },
  // Maroua
  {
    id: "13",
    image: MarouaImg2,
    title: "Appartement Moderne - Maroua",
    price: 22000000,
    location: "Quartier moderne, Maroua",
    city: "Maroua",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: "Vente",
    propertyType: "appartement",
    isNew: true,
  },
  // Ngaoundéré
  {
    id: "14",
    image: NgaoundereImg,
    title: "Maison Basse avec Cour - Ngaoundéré",
    price: 28000000,
    location: "Quartier résidentiel, Ngaoundéré",
    city: "Ngaoundéré",
    bedrooms: 4,
    bathrooms: 2,
    area: 160,
    type: "Vente",
    propertyType: "maison",
  },
  // Bertoua
  {
    id: "15",
    image: BertouaImg2,
    title: "Villa avec Terrasse - Bertoua",
    price: 38000000,
    location: "Centre, Bertoua",
    city: "Bertoua",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    type: "Vente",
    propertyType: "maison",
    hasTitleDeed: true,
  },
  // Buea
  {
    id: "16",
    image: BueaImg,
    title: "Maison Moderne avec Jardin - Buea",
    price: 48000000,
    location: "Muea, Buea",
    city: "Buea",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    type: "Vente",
    propertyType: "maison",
    isFeatured: true,
    hasTitleDeed: true,
  },
  {
    id: "17",
    image: property2,
    title: "Appartement F2 - Buea",
    price: 15000000,
    location: "Clinic Road, Buea",
    city: "Buea",
    bedrooms: 2,
    bathrooms: 2,
    area: 90,
    type: "Vente",
    propertyType: "appartement",
    isNew: true,
  },
  // Ebolowa
  {
    id: "18",
    image: EbolowaImg,
    title: "Villa avec Piscine - Ebolowa",
    price: 42000000,
    location: "Centre-ville, Ebolowa",
    city: "Ebolowa",
    bedrooms: 5,
    bathrooms: 4,
    area: 250,
    type: "Vente",
    propertyType: "maison",
    isFeatured: true,
    hasTitleDeed: true,
  },
  {
    id: "19",
    image: property3,
    title: "Terrain Commercial - Ebolowa",
    price: 12000000,
    location: "Zone commerciale, Ebolowa",
    city: "Ebolowa",
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    type: "Vente",
    propertyType: "terrain",
    negotiable: true,
  },
];

export function getPropertiesByCity(citySlug?: string): Property[] {
  if (!citySlug || citySlug === "all") {
    return allProperties;
  }
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) {
    return allProperties;
  }
  return allProperties.filter((p) => p.city.toLowerCase() === city.name.toLowerCase());
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

