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

let categoriesRequest: Promise<PublicCategory[]> | null = null;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 16_000);
  try {
    const response = await fetch(`/api${path}`, { ...init, signal: controller.signal });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = payload?.error?.message || `Request failed with status ${response.status}`;
      throw new Error(message);
    }
    return payload;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("The parts service took too long to respond.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export const publicApi = {
  async listCategories(): Promise<PublicCategory[]> {
    if (!categoriesRequest) {
      categoriesRequest = request<{ data?: PublicCategory[] }>("/public/categories")
        .then((payload) => payload.data ?? [])
        .catch((error) => {
          categoriesRequest = null;
          throw error;
        });
    }
    return categoriesRequest;
  },

  async listProducts(params: {
    name?: string;
    brand?: string;
    categoryId?: number;
    car_name?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ data: PublicProduct[]; meta: PublicProductsMeta }> {
    const query = new URLSearchParams();
    Object.entries({ ...params, page: params.page ?? 1, pageSize: params.pageSize ?? 24 }).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
    });
    const payload = await request<{ data?: PublicProduct[]; meta?: PublicProductsMeta }>(`/public/products?${query}`);
    return { data: payload.data ?? [], meta: payload.meta as PublicProductsMeta };
  },

  imageUrl(p: PublicProduct): string | null {
    const img = p.images?.[0];
    if (!img) return null;
    return img.formats?.small?.url || img.formats?.thumbnail?.url || img.formats?.medium?.url || img.url || null;
  },

  imageSrcSet(p: PublicProduct): string | null {
    const img = p.images?.[0];
    if (!img?.formats) return null;
    const sources = [
      img.formats.thumbnail?.url && `${img.formats.thumbnail.url} 240w`,
      img.formats.small?.url && `${img.formats.small.url} 500w`,
      img.formats.medium?.url && `${img.formats.medium.url} 750w`,
      img.formats.large?.url && `${img.formats.large.url} 1000w`,
    ].filter(Boolean);
    return sources.length ? sources.join(", ") : null;
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
    const response = await request<{ data?: { ok: true } }>("/public/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.data ?? { ok: true };
  },
};
