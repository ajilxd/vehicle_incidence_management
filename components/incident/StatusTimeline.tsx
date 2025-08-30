import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IncidentStatus } from "@prisma/client";

type TimelineItem = {
  date: Date;
  status: IncidentStatus;
};

type TimelineProps = {
  data: TimelineItem[];
};

export const StatusTimeline: React.FC<TimelineProps> = ({ data }) => {
  return (
    <div className="flex flex-col space-y-4">
      {data.map((item, index) => (
        <Card key={index} className="relative">
          <div className="font-semibold px-6">Status timeline</div>
          <CardContent className="flex items-center gap-4">
            {/* Dot + line */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full z-10"></div>
              {index !== data.length - 1 && (
                <div className="w-px flex-1 bg-gray-200"></div>
              )}
            </div>

            {/* Status + Date */}
            <div className="flex flex-col">
              <Badge variant="outline" className="mb-1">
                {item.status || "N/A"}
              </Badge>
              <p className="text-sm text-gray-500">
                {new Date(item.date).toDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
