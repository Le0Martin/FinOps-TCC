import api from "./api";

interface GetSkuParams {
  query?: string;
  page?: number;
  per_page?: number;
}

export interface Sku {
  id: string;
  company: string;
  name: string;
  location: string;
  update_date: Date;
  description: string;
  link: string;
  classtype: string;
  dedicated: boolean;
  baremetal: boolean;
  cpu: number;
  ram: {
    value: number;
    unit: string;
  };
  disk: {
    value: number;
    unit: string;
  };
  gpu: number;
  internal_network_speed: {
    value: number;
    unit: string;
  };
  external_network_speed: {
    value: number;
    unit: string;
  };
  price: Price;
  cloudStoreOnly?: boolean;
}

export interface Price {
  product: number;
  value: number;
  unit: string;
  currency: string;
  date: Date;
}
interface GetResponse {
  data: {
    skus: Sku[];
    total: number;
  };
  code: number;
  message: string;
}

interface GetByIdResponse {
  data: Sku;
  code: number;
  message: string;
}

interface GetQueriesResponseRaw {
  data: GetQueriesResponse;
  code: number;
  message: string;
}

export interface GetQueriesResponse {
  _id: null;
  min_ram: 0;
  max_ram: 11776;
  min_cpu: 0.25;
  max_cpu: 448;
  min_disk: 0;
  max_disk: 89407;
  min_gpu: 0;
  max_gpu: 8;
  min_external_network_speed: 0;
  max_external_network_speed: 59605;
}

export const getSkus = async ({ query, page, per_page }: GetSkuParams) => {
  const response = await api.get<GetResponse>("/sku/", {
    params: {
      query,
      page,
      per_page,
    },
  });

  return response.data;
};

export const getSku = async (id: string) => {
  const response = await api.get<GetByIdResponse>(`/sku/${id}`);
  return response.data;
};

export const getQueries = async () => {
  const response = await api.get<GetQueriesResponseRaw>("/sku/query");
  return response.data;
};
