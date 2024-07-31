import {
  pointsCalculation,
  calculateRetailerPoints,
  calculateRoundTotalPoints,
  calculateMultipleOfQuarterPoints,
  calculateItemCountPoints,
  calculateDescriptionLengthPoints,
  calculateOddDayPoints,
  calculateTimeOfPurchasePoints,
} from "../../../services/utils/pointsCalculation";

describe("pointsCalculation helper functions", () => {
  it("should calculate points for alphanumeric characters in retailer name", () => {
    const retailer = "Target123!";
    expect(calculateRetailerPoints(retailer)).toBe(9);
  });

  it("should add 50 points if the total is a round dollar amount with no cents", () => {
    const total = 50.0;
    expect(calculateRoundTotalPoints(total)).toBe(50);
  });

  it("should add 25 points if the total is a multiple of 0.25", () => {
    const total = 50.25;
    expect(calculateMultipleOfQuarterPoints(total)).toBe(25);
  });

  it("should add 5 points for every two items on the receipt", () => {
    let items = [
      { shortDescription: "Item1", price: 1.0 },
      { shortDescription: "Item2", price: 2.0 },
      { shortDescription: "Item3", price: 3.0 },
      { shortDescription: "Item4", price: 4.0 },
    ];
    expect(calculateItemCountPoints(items)).toBe(10);
  });

  it("should add points if the item description length is a multiple of 3", () => {
    let items = [
      { shortDescription: "abc", price: 10.0 },
      { shortDescription: "defghi", price: 20.0 },
    ];
    expect(calculateDescriptionLengthPoints(items)).toBe(6); // 2 items * 10.00 * 0.2 (2) and 20.00 * 0.2 (4) = 6
  });

  it("should add 6 points if the day in the purchase date is odd", () => {
    const purchaseDate = "2022-03-15"; // 15th is an odd day
    expect(calculateOddDayPoints(purchaseDate)).toBe(6);
  });

  it("should add 10 points if the time of purchase is after 2:00pm and before 4:00pm", () => {
    const purchaseTime = "14:30";
    expect(calculateTimeOfPurchasePoints(purchaseTime)).toBe(10);
  });
});

describe("pointsCalculation", () => {
  it("should correctly calculate complex cases with multiple rules", () => {
    let receipt = {
      retailer: "Test123!",
      total: 25.0,
      purchaseDate: "2022-03-15",
      purchaseTime: "14:30",
      items: [
        { shortDescription: "abc", price: 1.0 },
        { shortDescription: "defghi", price: 2.0 },
        { shortDescription: "jklmno", price: 3.0 },
        { shortDescription: "pqrstu", price: 4.0 },
      ],
    };
    const expectedPoints =
      7 + // retailer points
      50 + // round dollar total points
      25 + // multiple of 0.25 total points
      10 + // 4 items, 10 points (5 for every two)
      1 + // item "abc" 1* 0.2 price points
      1 + // item "defghi" 2* 0.2 price points
      1 + // item "jklmno" 3*0.2 price points
      1 + // item "pqrstu" 4*0.2 price points
      6 + // odd day points
      10; // time points
    expect(pointsCalculation(receipt)).toBe(expectedPoints);
  });
});
