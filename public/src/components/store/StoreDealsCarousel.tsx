import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-orange.jpg";

const slides = [
  {
    id: "deals",
    title: "Stylish decor deals for your space",
    desc: "Save on art, home & office decorations, and furniture.",
    cta: { label: "Shop Decorations", href: "/category/decorations" },
    bg: hero,
  },
  {
    id: "most-ordered",
    title: "Most ordered this week",
    desc: "Trending wall art and lounge chairs loved by customers.",
    cta: { label: "View Trending", href: "#trending" },
    bg: "/placeholder.svg",
  },
  {
    id: "black-friday",
    title: "Black Friday offers",
    desc: "Limited-time discounts on select furniture and decor.",
    cta: { label: "Get Offers", href: "#newsletter" },
    bg: "/placeholder.svg",
  },
  {
    id: "christmas",
    title: "Christmas decoration specials",
    desc: "Festive pieces to transform your home and office.",
    cta: { label: "Shop Arts", href: "/category/arts" },
    bg: "/placeholder.svg",
  },
];

const AutoPlay = ({ interval = 4000 }: { interval?: number }) => {
  // Lightweight autoplay using Embla API via DOM buttons
  const timer = useRef<number | null>(null);
  useEffect(() => {
    const nextBtn = document.querySelector<HTMLButtonElement>(
      "[data-store-carousel] .embla__button--next"
    );
    timer.current = window.setInterval(() => {
      nextBtn?.click();
    }, interval);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [interval]);
  return null;
};

const StoreDealsCarousel = () => {
  return (
    <div data-store-carousel>
      <Carousel opts={{ loop: true }}>
        <AutoPlay />
        <CarouselContent>
          {slides.map((s) => (
            <CarouselItem key={s.id}>
              <div className="relative w-full h-[360px] md:h-[420px] rounded-lg overflow-hidden">
                <img
                  src={s.bg}
                  alt={`${s.title} – RangoDeco deals banner`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 to-background/10" />
                <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex items-center">
                  <div className="max-w-xl animate-enter">
                    <h1 className="text-3xl md:text-5xl font-semibold leading-tight">{s.title}</h1>
                    <p className="mt-3 text-muted-foreground">{s.desc}</p>
                    <div className="mt-6 flex gap-3">
                      {s.cta.href.startsWith("#") ? (
                        <a href={s.cta.href}><Button size="lg">{s.cta.label}</Button></a>
                      ) : (
                        <Link to={s.cta.href}><Button size="lg">{s.cta.label}</Button></Link>
                      )}
                      <a href="#newsletter"><Button variant="secondary" size="lg">Subscribe</Button></a>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="embla__button--prev" />
        <CarouselNext className="embla__button--next" />
      </Carousel>
    </div>
  );
};

export default StoreDealsCarousel;
