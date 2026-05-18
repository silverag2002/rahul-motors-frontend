import axios from "axios";
import { API_BASE_URL } from "@/lib/constants";

export interface PublicImage {
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface PublicCategory {
  id: number;
  documentId?: string;
  name: string;
}

export interface PublicProduct {
  id: number;
  name: string;
  brand?: string | null;
  car_name?: string | null;
  part_no?: string | null;
  description?: string | null;
  images?: PublicImage[] | null;
  categories?: PublicCategory[] | null;
}

export interface PublicProductsMeta {
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

const api = axios.create({ baseURL: API_BASE_URL });

export const publicApi = {
  async listCategories(): Promise<PublicCategory[]> {
    const res = await api.get("/public/categories");
    return res.data?.data ?? [];
  },

  async listProducts(params: {
    name?: string;
    brand?: string;
    categoryId?: number;
    car_name?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ data: PublicProduct[]; meta: PublicProductsMeta }> {
    const res = await api.get("/public/products", {
      params: {
        ...params,
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 24,
      },
    });
    return { data: res.data?.data ?? [], meta: res.data?.meta };
  },

  imageUrl(p: PublicProduct): string | null {
    const img = p.images?.[0];
    if (!img) return null;
    return img.formats?.medium?.url || img.formats?.small?.url || img.url || null;
  },

  async submitInquiry(payload: {
    name: string;
    phone?: string;
    email?: string;
    part?: string;
    message?: string;
    productName?: string;
    brand?: string;
    partNo?: string;
    carName?: string;
  }): Promise<{ ok: true }> {
    const res = await api.post("/public/inquiry", payload);
    return res.data?.data ?? { ok: true };
  },
};
