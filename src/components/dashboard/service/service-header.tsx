import { Skeleton } from "@/components/ui/skeleton";
import type { Service } from "@/types/service.type";

interface ServiceHeaderProps {
  isLoading: boolean;
  service: Service | undefined;
}

export const ServiceHeader = ({ isLoading, service }: ServiceHeaderProps) => (
  <div className="space-y-4">
    <p className="text-md font-medium text-black/75">Pembayaran</p>
    {isLoading || !service ? (
      <div className="flex items-center gap-x-3.5">
        <Skeleton className="size-8" />
        <Skeleton className="h-4 w-40" />
      </div>
    ) : (
      <div className="flex items-center gap-x-3.5">
        <img
          src={service.service_icon}
          alt={service.service_name}
          className="size-8"
        />
        <h2 className="text-lg font-bold">{service.service_name}</h2>
      </div>
    )}
  </div>
);
