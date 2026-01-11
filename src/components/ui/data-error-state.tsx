import { AlertCircle, RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface DataErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function DataErrorState({
  title = "Gagal Memuat Data",
  description = "Terjadi kesalahan saat mengambil data dari server. Silakan coba lagi.",
  onRetry,
}: DataErrorStateProps) {
  return (
    <div className="container py-10">
      <Empty className="from-muted/20 to-background rounded-xl border border-dashed bg-gradient-to-b from-10% py-10">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle className="text-red-500" />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
        {onRetry && (
          <EmptyContent>
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="gap-2"
            >
              <RefreshCcwIcon className="size-4" />
              Coba Lagi
            </Button>
          </EmptyContent>
        )}
      </Empty>
    </div>
  );
}
