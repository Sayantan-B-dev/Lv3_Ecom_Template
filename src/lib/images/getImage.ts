import type { Category, Product } from "@/lib/types";

const DUMMY_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHi0zhX9CEBQ1WGGNneYn9jeLPOnlicrTX4CHVZdzUg&s=10";

export interface ImageSource {
  src: string;
  alt: string;
}

export function getProductImage(product: Pick<Product, "name">): ImageSource {
  return { src: DUMMY_IMAGE_URL, alt: `${product.name} photo` };
}

export function getCategoryImage(category: Pick<Category, "name">): ImageSource {
  return { src: DUMMY_IMAGE_URL, alt: `${category.name} photo` };
}
