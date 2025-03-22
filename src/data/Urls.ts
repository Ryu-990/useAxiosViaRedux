// src/data/Urls.ts
export const protocol = "http";
export const hostname = "localhost";
export const port = 3500;
export const urls = {
  products: `${protocol}://${hostname}:${port}/products`,
  suppliers: `${protocol}://${hostname}:${port}/suppliers`
};