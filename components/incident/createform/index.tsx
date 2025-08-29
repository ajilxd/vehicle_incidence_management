"use client";

import { useState } from "react";
import { IncidentStep1 } from "./IncidentStep1";
import { IncidentStep2 } from "./IncidentStep2";
import { useCreateIncident } from "@/lib/queries/mutations/incident";
import { toast } from "sonner";

export default function MultiStepIncidentForm() {
  const [step, setStep] = useState(1);
  const [collectedData, setCollectedData] = useState<any>({});
  const createIncident = useCreateIncident();
  const [loading, setLoading] = useState(false);
  console.log("step", step);
  const next = (data: any) => {
    setCollectedData((prev: any) => ({ ...prev, ...data }));
    setStep((s) => s + 1);
    setLoading(true);
  };

  const back = () => setStep((s) => s - 1);

  const finalSubmit = async (data: any) => {
    const allData = { ...collectedData, ...data };
    const formData = new FormData();
    Object.entries(allData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value as any);
      }
    });
    formData.append("reportedById", 1);

    await toast.promise(createIncident.mutateAsync(formData), {
      loading: "Creating incident...",
      success: "Incident created successfully",
      error: "Error creating incident",
    });
    setCollectedData({});
    setTimeout(() => {
      setStep(1);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded">
      {step === 1 && <IncidentStep1 onNext={next} />}
      {step === 2 && (
        <IncidentStep2 onNext={finalSubmit} onBack={back} loading={loading} />
      )}
    </div>
  );
}
