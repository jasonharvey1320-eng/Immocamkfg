import { Button } from "@/components/ui/button";
import { Home, PlusCircle, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">
        Accueil
      </a>
      <a href="/catalogue" className="text-foreground hover:text-primary transition-colors font-medium">
        Catalogue
      </a>
      <a href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
        Contact
      </a>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2">
              <Home className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ImmoCAM
              </h1>
              <p className="text-xs text-muted-foreground">Votre bien au Cameroun</p>
            </div>
          </a>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLinks />
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.location.href = "/contact"}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Déposer
            </Button>

            {/* Menu Mobile */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
                    onClick={() => window.location.href = "/contact"}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Déposer une annonce
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
