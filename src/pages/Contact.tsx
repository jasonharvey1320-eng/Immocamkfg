import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, Home, Building2, ShoppingBag, Building } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom est trop long"),
  email: z.string().trim().email("Email invalide").max(255, "Email trop long"),
  phone: z.string().trim().min(9, "Numéro invalide").max(20, "Numéro trop long"),
  subject: z.string().trim().min(5, "Le sujet doit contenir au moins 5 caractères").max(200, "Sujet trop long"),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000, "Message trop long"),
});

const listingSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom est trop long"),
  email: z.string().trim().email("Email invalide").max(255, "Email trop long"),
  phone: z.string().trim().min(9, "Numéro invalide").max(20, "Numéro trop long"),
  propertyType: z.string().min(1, "Veuillez sélectionner un type de bien"),
  transactionType: z.string().min(1, "Veuillez sélectionner un type de transaction"),
  city: z.string().min(1, "Veuillez sélectionner une ville"),
  price: z.string().trim().min(1, "Veuillez indiquer le prix"),
  area: z.string().trim().min(1, "Veuillez indiquer la surface"),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  address: z.string().trim().min(5, "Veuillez indiquer l'adresse").max(200, "Adresse trop longue"),
  description: z.string().trim().min(20, "La description doit contenir au moins 20 caractères").max(2000, "Description trop longue"),
});

type ContactFormData = z.infer<typeof contactSchema>;
type ListingFormData = z.infer<typeof listingSchema>;

export default function Contact() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const {
    register: registerListing,
    handleSubmit: handleSubmitListing,
    reset: resetListing,
    formState: { errors: errorsListing, isSubmitting: isSubmittingListing },
    watch,
    setValue,
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const onSubmitListing = async (data: ListingFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Demande de dépôt d'annonce envoyée !",
        description: "Nous vous contacterons rapidement pour finaliser la publication de votre annonce.",
      });
      resetListing();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
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
              <a href="/" className="hover:text-primary transition-colors">Accueil</a>
              <span>/</span>
              <span className="text-foreground">Contact</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contactez-nous
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Une question ? Un projet immobilier ? Notre équipe est à votre écoute pour vous accompagner.
            </p>
            <div className="max-w-3xl mx-auto p-6 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-foreground font-semibold mb-2">
                💡 Pour déposer une annonce immobilière
              </p>
              <p className="text-muted-foreground">
                Veuillez remplir le formulaire ci-dessous ou nous contacter directement par téléphone ou WhatsApp. 
                Notre équipe vous guidera dans le processus de publication de votre annonce.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
                    <a href="tel:+237699000000" className="text-muted-foreground hover:text-primary transition-colors">
                      +237 693 37 87 12
                    </a>
                    <br />
                    <a href="tel:+237677000000" className="text-muted-foreground hover:text-primary transition-colors">
                      +237 6 77 00 00 00
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-[#25D366]/10 p-3">
                    <MessageCircle className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                    <a 
                      href="https://wa.me/237699000000" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +237 693 37 87 12
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Réponse rapide
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Email</h3>
                    <a href="mailto:contact@immocam.cm" className="text-muted-foreground hover:text-primary transition-colors break-all">
                      contact@immocam.cm
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Réponse sous 24h
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Nos Bureaux</h3>
                    <p className="text-muted-foreground">
                      <strong>Yaoundé:</strong> Bastos, Avenue Kennedy
                    </p>
                    <p className="text-muted-foreground mt-2">
                      <strong>Douala:</strong> Akwa, Boulevard de la Liberté
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Horaires</h3>
                    <p className="text-muted-foreground">
                      <strong>Lun - Ven:</strong> 8h - 18h
                    </p>
                    <p className="text-muted-foreground mt-1">
                      <strong>Samedi:</strong> 9h - 14h
                    </p>
                    <p className="text-muted-foreground mt-1">
                      <strong>Dimanche:</strong> Fermé
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <Tabs defaultValue="contact" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="contact">Contact Général</TabsTrigger>
                    <TabsTrigger value="listing">
                      <Home className="h-4 w-4 mr-2" />
                      Déposer une Annonce
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="contact" className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Envoyez-nous un message
                      </h2>
                      <p className="text-muted-foreground">
                        Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                      </p>
                    </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Nom complet <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ex: Jean Dupont"
                        {...register("name")}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="exemple@email.com"
                        {...register("email")}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Téléphone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+237 6XX XX XX XX"
                      {...register("phone")}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Sujet <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Ex: Demande d'information sur un bien"
                      {...register("subject")}
                      className={errors.subject ? "border-destructive" : ""}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Décrivez votre demande en détail..."
                      rows={6}
                      {...register("message")}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
                  </TabsContent>

                  <TabsContent value="listing" className="space-y-6">
                    <div>
                      <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                        <Home className="h-3 w-3 mr-1" />
                        Formulaire de dépôt d'annonce
                      </Badge>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Déposer une annonce immobilière
                      </h2>
                      <p className="text-muted-foreground">
                        Remplissez ce formulaire avec les détails de votre bien. Notre équipe vous contactera pour finaliser la publication.
                      </p>
                    </div>

                    <form onSubmit={handleSubmitListing(onSubmitListing)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="listing-name">
                            Nom complet <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="listing-name"
                            placeholder="Ex: Jean Dupont"
                            {...registerListing("name")}
                            className={errorsListing.name ? "border-destructive" : ""}
                          />
                          {errorsListing.name && (
                            <p className="text-sm text-destructive">{errorsListing.name.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="listing-email">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="listing-email"
                            type="email"
                            placeholder="exemple@email.com"
                            {...registerListing("email")}
                            className={errorsListing.email ? "border-destructive" : ""}
                          />
                          {errorsListing.email && (
                            <p className="text-sm text-destructive">{errorsListing.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="listing-phone">
                          Téléphone <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="listing-phone"
                          type="tel"
                          placeholder="+237 6XX XX XX XX"
                          {...registerListing("phone")}
                          className={errorsListing.phone ? "border-destructive" : ""}
                        />
                        {errorsListing.phone && (
                          <p className="text-sm text-destructive">{errorsListing.phone.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="property-type">
                            Type de bien <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={watch("propertyType")}
                            onValueChange={(value) => setValue("propertyType", value)}
                          >
                            <SelectTrigger id="property-type" className={errorsListing.propertyType ? "border-destructive" : ""}>
                              <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="appartement">
                                <div className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4" />
                                  Appartement
                                </div>
                              </SelectItem>
                              <SelectItem value="maison">
                                <div className="flex items-center gap-2">
                                  <Home className="h-4 w-4" />
                                  Maison/Villa
                                </div>
                              </SelectItem>
                              <SelectItem value="terrain">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  Terrain
                                </div>
                              </SelectItem>
                              <SelectItem value="commercial">
                                <div className="flex items-center gap-2">
                                  <ShoppingBag className="h-4 w-4" />
                                  Local Commercial
                                </div>
                              </SelectItem>
                              <SelectItem value="immeuble">
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4" />
                                  Immeuble
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {errorsListing.propertyType && (
                            <p className="text-sm text-destructive">{errorsListing.propertyType.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="transaction-type">
                            Type de transaction <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={watch("transactionType")}
                            onValueChange={(value) => setValue("transactionType", value)}
                          >
                            <SelectTrigger id="transaction-type" className={errorsListing.transactionType ? "border-destructive" : ""}>
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vente">Vente</SelectItem>
                              <SelectItem value="location">Location</SelectItem>
                              <SelectItem value="location-vente">Location-Vente</SelectItem>
                            </SelectContent>
                          </Select>
                          {errorsListing.transactionType && (
                            <p className="text-sm text-destructive">{errorsListing.transactionType.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="listing-city">
                          Ville <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={watch("city")}
                          onValueChange={(value) => setValue("city", value)}
                        >
                          <SelectTrigger id="listing-city" className={errorsListing.city ? "border-destructive" : ""}>
                            <SelectValue placeholder="Sélectionnez une ville" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yaounde">Yaoundé</SelectItem>
                            <SelectItem value="douala">Douala</SelectItem>
                            <SelectItem value="bafoussam">Bafoussam</SelectItem>
                            <SelectItem value="bamenda">Bamenda</SelectItem>
                            <SelectItem value="garoua">Garoua</SelectItem>
                            <SelectItem value="maroua">Maroua</SelectItem>
                            <SelectItem value="ngaoundere">Ngaoundéré</SelectItem>
                            <SelectItem value="bertoua">Bertoua</SelectItem>
                            <SelectItem value="buea">Buea</SelectItem>
                            <SelectItem value="ebolowa">Ebolowa</SelectItem>
                          </SelectContent>
                        </Select>
                        {errorsListing.city && (
                          <p className="text-sm text-destructive">{errorsListing.city.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="listing-address">
                          Adresse complète <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="listing-address"
                          placeholder="Ex: Bastos, Rue Kennedy, Yaoundé"
                          {...registerListing("address")}
                          className={errorsListing.address ? "border-destructive" : ""}
                        />
                        {errorsListing.address && (
                          <p className="text-sm text-destructive">{errorsListing.address.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="listing-price">
                            Prix (FCFA) <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="listing-price"
                            placeholder="Ex: 50000000"
                            {...registerListing("price")}
                            className={errorsListing.price ? "border-destructive" : ""}
                          />
                          {errorsListing.price && (
                            <p className="text-sm text-destructive">{errorsListing.price.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="listing-area">
                            Surface (m²) <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="listing-area"
                            placeholder="Ex: 120"
                            {...registerListing("area")}
                            className={errorsListing.area ? "border-destructive" : ""}
                          />
                          {errorsListing.area && (
                            <p className="text-sm text-destructive">{errorsListing.area.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="listing-bedrooms">Chambres</Label>
                          <Input
                            id="listing-bedrooms"
                            placeholder="Ex: 3"
                            {...registerListing("bedrooms")}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="listing-bathrooms">Salles de bain</Label>
                          <Input
                            id="listing-bathrooms"
                            placeholder="Ex: 2"
                            {...registerListing("bathrooms")}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="listing-description">
                          Description détaillée <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="listing-description"
                          placeholder="Décrivez votre bien en détail (caractéristiques, équipements, quartier, etc.)..."
                          rows={6}
                          {...registerListing("description")}
                          className={errorsListing.description ? "border-destructive" : ""}
                        />
                        {errorsListing.description && (
                          <p className="text-sm text-destructive">{errorsListing.description.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmittingListing}
                      >
                        {isSubmittingListing ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Envoyer la demande de dépôt d'annonce
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
