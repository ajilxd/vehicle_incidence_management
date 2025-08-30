"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IncidentStep1Schema,
  IncidentStep1Values,
} from "@/lib/validations/incident";
import { IncidentSeverity, IncidentType } from "@prisma/client";

export function IncidentStep1({
  onNext,
}: {
  onNext: (data: IncidentStep1Values) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncidentStep1Values>({
    resolver: zodResolver(IncidentStep1Schema) as any,
    defaultValues: {
      severity: IncidentSeverity.LOW,
      type: IncidentType.MAINTENANCE_ISSUE,
    },
  });

  const submit = handleSubmit((data) => onNext(data));

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label>Title</label>
        <input {...register("title")} className="border p-2 w-full" />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label>Type</label>
        <select {...register("type")} className="border p-2 w-full">
          {Object.values(IncidentType).map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Severity</label>
        <select {...register("severity")} className="border p-2 w-full">
          {Object.values(IncidentSeverity).map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea {...register("description")} className="border p-2 w-full" />
        {errors.description && (
          <p className="text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label>Occurred At</label>
        <input
          type="date"
          {...register("occurredAt")}
          className="border p-2 w-full"
        />
        {errors.occurredAt && (
          <p className="text-red-600">{errors.occurredAt.message}</p>
        )}
      </div>

      <div>
        <label>Estimated Cost</label>
        <input
          type="number"
          {...register("estimatedCost")}
          className="border p-2 w-full"
        />
        {errors.estimatedCost && (
          <p className="text-red-600">{errors.estimatedCost.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </form>
  );
}
