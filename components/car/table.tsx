"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Pagination from "../pagination";
import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { useCars } from "@/lib/queries/hooks";

export default function CarTable({
  selectedCarId,
  setCarId,
}: {
  selectedCarId: number;
  setCarId: (id: number) => void;
}) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const handlePageChange = useCallback((p: number) => setPage(p), []);
  console.log("search", search);
  const { data: response } = useCars({
    page: "" + page,
    limit: "" + 4,
    query: search === "all" ? "" : search,
  });
  const cars = response?.data || [];
  const meta = response?.meta || { totalPages: 1 };
  return (
    <div className="max-h-1/3">
      <Input
        placeholder="Search vehicle..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      <Table>
        <TableCaption>{cars.length === 0 && "No vehicles found"}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>License Plate</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((v) => (
            <TableRow
              key={v.id}
              className={cn(
                "cursor-pointer hover:bg-muted/50",
                selectedCarId === v.id && "bg-blue-50"
              )}
            >
              <TableCell>{v.make}</TableCell>
              <TableCell>{v.model}</TableCell>
              <TableCell>{v.licensePlate}</TableCell>
              <TableCell>
                <Button
                  type="button"
                  size="sm"
                  variant={selectedCarId === v.id ? "default" : "secondary"}
                  onClick={() => setCarId(v.id)}
                >
                  {selectedCarId === v.id ? "Selected" : "Select"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={page}
        totalPages={meta.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
