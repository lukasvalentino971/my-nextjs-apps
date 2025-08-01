// types/products.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string | null;
    userId: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface ProductFormData {
    id?: number; // optional for create
    name: string;
    price: number;
    description: string;
    userId?: number; // optional as it might be set by backend
  }
  
  export interface ProductsResponse {
    success: boolean;
    data: {
      products: Product[];
    };
  }
  
  export interface ProductResponse {
    success: boolean;
    data: {
      product: Product;
    };
  }