// pages/api/chronopostService.ts

import axios from 'axios';

// This URL should be replaced with the actual Chronopost Quick Cost API endpoint
const QUICK_COST_URL = 'https://ws.chronopost.fr/quickcost-cxf/QuickcostServiceWS';

export const calculateShippingCost = async (params: any) => {
  try {
    const { data } = await axios.post(QUICK_COST_URL, params, {
      headers: { 'Content-Type': 'application/json' },
    });
    return data;
  } catch (error) {
    console.error('Failed to calculate shipping cost', error);
    throw new Error('Failed to calculate shipping cost');
  }
};
