"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IncidentStep2Schema,
  IncidentStep2Values,
} from "@/lib/validations/incident";
import CarTable from "@/components/car/table";
import { useState } from "react";

export function IncidentStep2({
  onNext,
  onBack,
  loading,
}: {
  onNext: (data: IncidentStep2Values) => void;
  onBack: () => void;
  loading: boolean;
}) {
  const [carId, setCarId] = useState(0);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [fileCount, setFileCount] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IncidentStep2Values>({
    resolver: zodResolver(IncidentStep2Schema),
  });

  // Handle file input manually
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFileCount(files.length);
      setValue("images", e.target.files, { shouldValidate: true });
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const updateCarId = (id: number) => {
    setCarId(id);
    setValue("carId", id, { shouldValidate: true });
  };

  const submit = handleSubmit((data) => {
    const files = data.images ? Array.from(data.images) : [];
    onNext({ ...data, images: files, carId });
  });

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label>Vehicle ID</label>
        <CarTable selectedCarId={carId} setCarId={updateCarId} />
        {errors.carId && <p className="text-red-600">{errors.carId.message}</p>}
      </div>

      <div>
        <div className="mb-2">
          <label>Upload Images</label>
        </div>
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
          className="hidden"
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded inline-block"
        >
          Select Files
        </label>
        {fileCount > 0 && (
          <span className="ml-2 text-sm text-gray-600">
            {fileCount} file{fileCount > 1 ? "s" : ""} selected
          </span>
        )}
        {errors.images && (
          <p className="text-red-600">{errors.images.message as string}</p>
        )}

        {previewUrls.length > 0 && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {previewUrls.map((url, idx) => (
              <div
                key={idx}
                className="relative border rounded-lg overflow-hidden"
              >
                <img
                  src={url}
                  alt={`preview-${idx}`}
                  className="object-cover w-full h-32"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
