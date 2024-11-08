interface PricingData {
   MONTHLY: {
     programId: string
     name: string;
     price: number;
   };
   YEARLY: {
     programId : string
     name: string;
     discountPercentage: number;
     discountAmount: number;
     discountedPrice: number;
     originalPrice: number;
   };
 }
 interface PricingMONTHLY {
    programId : string
    name: string;
    price: number;
 }
 interface PricingYEARLY {
    programId : string
    name: string;
    discountPercentage: number;
    discountAmount: number;
    discountedPrice: number;
    originalPrice: number;
 }
 