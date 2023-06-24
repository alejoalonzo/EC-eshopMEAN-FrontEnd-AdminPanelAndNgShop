import { OrderStatus, OrderStatusMap } from './orders-list/orders-list.component'

export const ORDER_STATUS: OrderStatusMap = {
  
    0: {
      label: 'Pending',
      color: 'primary',
    },
    1: {
      label: 'Processed',
      color: 'warning',
    },
    2: {
      label: 'Shipped',
      color: 'warning',
    },
    3: {
      label: 'Delivered',
      color: 'success',
    },
    4: {
      label: 'Failed',
      color: 'danger',
    },
  };