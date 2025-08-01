// src/app/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { productsApi } from '@/lib/products';
import { Product, ProductFormData } from '@/types/products';
import ProductForm from '@/components/products/ProductForm';
import MasterLayout from '@/components/MasterLayout';
import Swal from 'sweetalert2'; // Import SweetAlert

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const showSuccessAlert = (title: string, text: string) => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productsApi.getAll();
      setProducts(response.data.products);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: ProductFormData) => {
    try {
      await productsApi.create(data);
      showSuccessAlert('Success!', 'Product created successfully');
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create product',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleUpdate = async (data: ProductFormData) => {
    if (!editingProduct) return;
    
    try {
      await productsApi.update(editingProduct.id, data);
      showSuccessAlert('Success!', 'Product updated successfully');
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update product',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await productsApi.delete(id);
        showSuccessAlert('Deleted!', 'Product has been deleted.');
        fetchProducts();
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete product',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  return (
    <MasterLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>

        {showForm && (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 className="text-lg font-medium mb-4">
      {editingProduct ? 'Edit Product' : 'Add New Product'}
    </h3>
    <ProductForm
      initialData={editingProduct ? {
        name: editingProduct.name,
        price: editingProduct.price,
        description: editingProduct.description || '',
      } : undefined}
      onSubmit={editingProduct ? handleUpdate : handleCreate}
      onCancel={() => {
        setShowForm(false);
        setEditingProduct(null);
      }}
    />
  </div>
)}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="px-6 py-4 text-center text-sm text-gray-500">
                No products found
              </div>
            )}
          </div>
        )}
      </div>
    </MasterLayout>
  );
}