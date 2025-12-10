import { Home, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg bg-primary p-2">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">ImmoCAM</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              La première plateforme immobilière du Cameroun. Trouvez la maison de vos rêves parmi des milliers d'annonces vérifiées.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Liens utiles</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/catalogue" className="text-muted-foreground hover:text-primary transition-colors">
                  Catalogue
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Déposer une annonce
                </a>
              </li>
              <li>
                <a href="/guides" className="text-muted-foreground hover:text-primary transition-colors">
                  Guides & Conseils
                </a>
              </li>
              <li>
                <a href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Villes populaires */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Villes populaires</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/catalogue?ville=yaounde" className="text-muted-foreground hover:text-primary transition-colors">
                  Yaoundé
                </a>
              </li>
              <li>
                <a href="/catalogue?ville=douala" className="text-muted-foreground hover:text-primary transition-colors">
                  Douala
                </a>
              </li>
              <li>
                <a href="/catalogue?ville=bafoussam" className="text-muted-foreground hover:text-primary transition-colors">
                  Bafoussam
                </a>
              </li>
              <li>
                <a href="/catalogue?ville=bamenda" className="text-muted-foreground hover:text-primary transition-colors">
                  Bamenda
                </a>
              </li>
              <li>
                <a href="/catalogue?ville=buea" className="text-muted-foreground hover:text-primary transition-colors">
                  Buea
                </a>
              </li>
              <li>
                <a href="/catalogue?ville=ebolowa" className="text-muted-foreground hover:text-primary transition-colors">
                  Ebolowa
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@immocam.cm" className="hover:text-primary transition-colors">
                  contact@immocam.cm
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+237699000000" className="hover:text-primary transition-colors">
                  +237 693 37 87 12
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-[#25D366]">WhatsApp:</span>
                <a href="https://wa.me/237699000000" className="hover:text-primary transition-colors">
                  +237 693 37 87 12
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 ImmoCAMkfg. Tous droits réservés.</p>
          <div className="flex gap-4">
            <a href="/mentions-legales" className="hover:text-primary transition-colors">
              Mentions légales
            </a>
            <a href="/confidentialite" className="hover:text-primary transition-colors">
              Confidentialité
            </a>
            <a href="/cgv" className="hover:text-primary transition-colors">
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
