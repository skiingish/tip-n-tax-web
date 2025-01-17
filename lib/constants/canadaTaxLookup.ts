import { Provinces } from "@/types/types";

const taxRateCaLookup = (state: Provinces) => {
    const taxRates: Record<Provinces, number> = {
      Alberta: 5,
      'British Columbia': 12,
      Manitoba: 12,
      'New Brunswick': 15,
      'Newfoundland and Labrador': 15,
      'Northwest Territories': 5,
      'Nova Scotia': 15,
      Nunavut: 5,
      Ontario: 13,
      'Prince Edward Island': 15,
      Quebec: 14.975,
      Saskatchewan: 11,
      Yukon: 5,
    };
  
    return taxRates[state] || 10;
  };
  
  export default taxRateCaLookup;
  