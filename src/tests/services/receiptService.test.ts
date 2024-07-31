import "reflect-metadata";

import { ReceiptService } from "../../services/receiptService";
import { pointsCalculation } from "../../services/utils/pointsCalculation";
import { ReceiptDataObject } from "../../data/dataObject";

describe("ReceiptService functionality", () => {
  let receiptService: ReceiptService = new ReceiptService();
  let data1: ReceiptDataObject = {
    retailer: "Target",
    purchaseDate: "2022-01-01",
    purchaseTime: "13:01",
    items: [
      {
        shortDescription: "Mountain Dew 12PK",
        price: 6.49,
      },
      {
        shortDescription: "Emils Cheese Pizza",
        price: 12.25,
      },
      {
        shortDescription: "Knorr Creamy Chicken",
        price: 1.26,
      },
      {
        shortDescription: "Doritos Nacho Cheese",
        price: 3.35,
      },
      {
        shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ",
        price: 12.0,
      },
    ],
    total: 35.35,
  };

  let data2:ReceiptDataObject = {
    retailer: "M&M Corner Market",
    purchaseDate: "2022-03-20",
    purchaseTime: "14:33",
    items: [
      {
        shortDescription: "Gatorade",
        price: 2.25,
      },
      {
        shortDescription: "Gatorade",
        price: 2.25,
      },
      {
        shortDescription: "Gatorade",
        price: 2.25,
      },
      {
        shortDescription: "Gatorade",
        price: 2.25,
      },
    ],
    total: 9.00,
  };

  it("should calculate points exactly based on rules", () => {
    expect(pointsCalculation(data1)).toBe(28);
    expect(pointsCalculation(data2)).toBe(109);
  });

  it("should generate a uuid and return it to calculate points correctly", () => {
    const id = receiptService.generateReceiptID(data2);
    expect(typeof id).toBe("string");
    expect(receiptService.findbyReceiptID(id)).toEqual(109);
  });
});
