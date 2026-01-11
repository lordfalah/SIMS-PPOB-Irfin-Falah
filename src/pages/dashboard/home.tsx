import { Card } from "@/components/ui/card";
import {
  PromoSkeleton,
  ServicesSkeleton,
} from "@/components/dashboard/home/skeleton-dashboard";
import DashboardHeader from "@/components/dashboard/home/dashboard-header";
import { Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DataErrorState } from "@/components/ui/data-error-state";
import {
  useGetBannersQuery,
  useGetServicesQuery,
} from "@/features/api/info-api";
import Autoplay from "embla-carousel-autoplay";

export default function DashboardHome() {
  const {
    data: banners,
    isLoading: loadingBanner,
    isError: errorBanner,
    refetch: refetchBanner,
  } = useGetBannersQuery();

  const {
    data: services,
    isLoading: loadingService,
    isError: errorService,
    refetch: refetchService,
  } = useGetServicesQuery();

  return (
    <div className="space-y-10 pb-20">
      <DashboardHeader />

      {/* --- Section Services --- */}
      {loadingService ? (
        <ServicesSkeleton />
      ) : errorService || !services ? (
        <DataErrorState
          title="Layanan tidak tersedia"
          onRetry={refetchService}
        />
      ) : (
        <section className="container flex flex-wrap justify-baseline gap-x-6 gap-y-5">
          {services.map((service, idx) => (
            <Link
              to={`/dashboard/${service.service_code}`}
              key={idx}
              className="group flex flex-col items-center gap-y-2"
            >
              <img
                src={service.service_icon}
                alt={service.service_name}
                className="size-14 rounded-md transition-transform group-hover:scale-110"
              />
              <p className="text-center text-sm text-black/70">
                {service.service_name}
              </p>
            </Link>
          ))}
        </section>
      )}

      {/* --- Section Banner --- */}
      {loadingBanner ? (
        <PromoSkeleton />
      ) : errorBanner || !banners ? (
        <DataErrorState title="Promo gagal dimuat" onRetry={refetchBanner} />
      ) : (
        <section className="container space-y-4">
          <h3 className="font-semibold">Temukan promo menarik</h3>
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            opts={{ align: "start" }}
            className="w-full"
          >
            <CarouselContent>
              {banners.map((banner, idx) => (
                <CarouselItem
                  key={idx}
                  className="basis-full cursor-grab active:cursor-grabbing sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Card className="relative h-36 overflow-hidden border-none">
                    <img
                      src={banner.banner_image}
                      alt={banner.banner_name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      )}
    </div>
  );
}
