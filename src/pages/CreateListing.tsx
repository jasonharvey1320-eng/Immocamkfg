import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ListingFormWizard } from "@/components/ListingFormWizard";

export default function CreateListing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">
                Accueil
              </a>
              <span>/</span>
              <span className="text-foreground">Déposer une annonce</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Déposer une annonce
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vendez ou louez votre bien en quelques minutes. C'est simple, rapide et gratuit !
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <ListingFormWizard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
