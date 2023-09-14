import { create } from "zustand";
import { persist } from "zustand/middleware";

export const categoryAndProductStore = create((set) => ({
  generalCategory: [
    /* { price: 8 }, { price: 9 } */
  ],
  generalProduct: [
    /*   { urlCloudinary: "product1" },
    { urlCloudinary: "product2" }, */
  ],
  count: 8,
  getProducts: (value) =>
    set((state) => ({
      generalProduct: value,
    })),
  getCategory: (value) =>
    set((state) => ({
      generalCategory: value,
    })),
  getSuma: (value) =>
    set((state) => ({
      count: state.count + value,
    })),
}));

export const generalColorStore = create((set) => ({
  NavbarAndFotterColor: { color1: "#fff", color2: "#000" },
  dashboardPageColor: { color1: "#fff", color2: "#000" },
  productPageColor: { color1: "#fff", color2: "#000" },
  galleryColor: { color1: "#fff", color2: "#000" },
  cartColor: { color1: "#E8BCB9", color2: "#F39F5A" },
  lettersColor: { color1: "#E8BCB9", color2: "#F39F5A" },

  getNavbarAndFotterColor: (value) =>
    set((state) => ({
      NavbarAndFotterColor: value,
    })),
  getDashboardPageColor: (value) =>
    set((state) => ({
      dashboardPageColor: value,
    })),
  getProductPageColor: (value) =>
    set((state) => ({
      productPageColor: value,
    })),
  getGalleryColor: (value) =>
    set((state) => ({
      galleryColor: value,
    })),
  getCartColor: (value) =>
    set((state) => ({
      cartColor: value,
    })),
  getLettersColor: (value) =>
    set((state) => ({
      lettersColor: value,
    })),
}));
