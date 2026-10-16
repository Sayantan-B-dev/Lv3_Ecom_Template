export interface BrandConfig {
  name: string;
  tagline: string;
  logoText: string;
  logoMark: string;
  supportEmail: string;
  currency: string;
  locale: string;
}

export const brand: BrandConfig = {
  name: "Meridian",
  tagline: "Everyday essentials, thoughtfully curated",
  logoText: "Meridian",
  logoMark: "M",
  supportEmail: "hello@meridian.example",
  currency: "USD",
  locale: "en-US",
};

export function formatPrice(value: number, currency: string = brand.currency): string {
  return new Intl.NumberFormat(brand.locale, {
    style: "currency",
    currency,
  }).format(value);
}
