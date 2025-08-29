import MultiStepIncidentForm from "@/components/incident/createform";

export default function NewIncidentPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create New Incident
        </h1>
        <p className="text-sm text-gray-500">
          Fill out the details below to report a new incident. You can add
          information in multiple steps.
        </p>
      </div>

      {/* Card wrapper for form */}
      <div className="bg-white shadow-md rounded-2xl p-6 border">
        <MultiStepIncidentForm />
      </div>
    </div>
  );
}
