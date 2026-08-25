import React from 'react';
import { useShop } from '../context/ShopContext';

export const Toast = () => {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="custom-toast">
      <i className={`bi ${toast.type === 'danger' ? 'bi-exclamation-triangle-fill text-danger' : toast.type === 'info' ? 'bi-info-circle-fill text-info' : 'bi-check-circle-fill text-success'}`}></i>
      <span>{toast.message}</span>
    </div>
  );
};
