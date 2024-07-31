import { ReceiptRecord, ReceiptDataObject } from "../../data/dataObject";


export function calculateRetailerPoints(retailer:string): number {
  return retailer.replace(/[^a-zA-Z0-9]/g, "").length;
}

export function calculateRoundTotalPoints(total:number): number {
  return (Number.isInteger(total) || total % 1 === 0) ? 50 : 0;
}

export function calculateMultipleOfQuarterPoints(total:number): number {
  return total % 0.25 === 0 ? 25 : 0;
}

export function calculateItemCountPoints(items: ReceiptRecord[]): number {
  return Math.floor(items.length / 2) * 5;
}

export function calculateDescriptionLengthPoints(items: ReceiptRecord[]): number {
  return items.reduce((acc, item) => {
    return acc + (item.shortDescription.trim().length % 3 === 0 ? Math.ceil(item.price * 0.2) : 0);
  }, 0);
}

export function calculateOddDayPoints(purchaseDate:string): number {  
  const day = new Date(purchaseDate).getUTCDate();
  return day % 2 !== 0 ? 6 : 0;
}

export function calculateTimeOfPurchasePoints(purchaseTime:string): number {
  const [hours, minutes] = purchaseTime.split(":").map(Number);
  return (hours === 14 || (hours === 15 && minutes < 60)) ? 10 : 0;
}

export function pointsCalculation(receipt: ReceiptDataObject): number {
  let points = 0;
  points += calculateRetailerPoints(receipt.retailer);
  points += calculateRoundTotalPoints(receipt.total);
  points += calculateMultipleOfQuarterPoints(receipt.total);
  points += calculateItemCountPoints(receipt.items);
  points += calculateDescriptionLengthPoints(receipt.items);
  points += calculateOddDayPoints(receipt.purchaseDate);
  points += calculateTimeOfPurchasePoints(receipt.purchaseTime);
  return points;
}
