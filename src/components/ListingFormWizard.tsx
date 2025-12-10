import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { ListingStep1 } from "./listing-steps/ListingStep1";
import { ListingStep2 } from "./listing-steps/ListingStep2";
import { ListingStep3 } from "./listing-steps/ListingStep3";

const steps = [
  { id: 1, title: "Type & Transaction", component: ListingStep1 },
  { id: 2, title: "Localisation", component: ListingStep2 },
  { id: 3, title: "Caractéristiques", component: ListingStep3 },
  { id: 4, title: "Équipements" },
  { id: 5, title: "Prix" },
  { id: 6, title: "Photos" },
  { id: 7, title: "Description" },
  { id: 8, title: "Contact" },
  { id: 9, title: "Options Premium" },
  { id: 10, title: "Récapitulatif" },
];

export const ListingFormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ListingStep1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <ListingStep2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <ListingStep3 formData={formData} setFormData={setFormData} />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Cette étape est en cours de développement.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Étape {currentStep} sur {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% complété
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Steps Navigation */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-2">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              disabled={step.id > currentStep}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                step.id === currentStep
                  ? "bg-primary text-primary-foreground"
                  : step.id < currentStep
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                  step.id === currentStep
                    ? "border-primary-foreground"
                    : step.id < currentStep
                    ? "border-secondary-foreground bg-secondary-foreground"
                    : "border-muted-foreground"
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="h-4 w-4 text-secondary" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span className="hidden sm:inline">{step.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-6 md:p-8 mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {steps[currentStep - 1].title}
          </h2>
          <p className="text-muted-foreground">
            Remplissez les informations ci-dessous pour continuer.
          </p>
        </div>

        {renderStepContent()}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Précédent
        </Button>

        {currentStep === steps.length ? (
          <Button size="lg" className="gap-2">
            <Check className="h-4 w-4" />
            Publier l'annonce
          </Button>
        ) : (
          <Button size="lg" onClick={handleNext}>
            Suivant
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Besoin d'aide ?{" "}
          <a href="/contact" className="text-primary hover:underline">
            Contactez-nous
          </a>
        </p>
      </div>
    </div>
  );
};
