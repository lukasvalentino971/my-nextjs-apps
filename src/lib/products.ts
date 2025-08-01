// lib/products.ts
import { api } from './api';
import { Product, ProductFormData, ProductsResponse, ProductResponse } from '@/types/products';

export const productsApi = {
    getAll: async (): Promise<ProductsResponse> => {
        const response = await api.get<ProductsResponse>('/products');
        // Transform price strings to numbers if needed
        const products = response.data.data.products.map(product => ({
          ...product,
          price: typeof product.price === 'string' ? parseFloat(product.price) : product.price
        }));
        return { ...response.data, data: { products } };
      },

  getById: async (id: number): Promise<ProductResponse> => {
    const response = await api.get<ProductResponse>(`/products/${id}`);
    return response.data;
  },

  create: async (productData: ProductFormData): Promise<ProductResponse> => {
    const response = await api.post<ProductResponse>('/products', productData);
    return response.data;
  },

  update: async (id: number, productData: ProductFormData): Promise<ProductResponse> => {
    const response = await api.put<ProductResponse>(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id: number): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('You are not authorized to delete this product');
      }
      throw error;
    }
  },

};