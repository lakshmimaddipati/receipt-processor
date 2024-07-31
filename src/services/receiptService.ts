import { ReceiptDataObject } from "../data/dataObject";
import { pointsCalculation } from "./utils/pointsCalculation";

const { v4: uuidv4 } = require('uuid');


type ReceiptID = string;
type ReceiptPoints = number;
let receiptrecords = new Map(); //global variable


export class ReceiptService { 
  
   /**
   *
   * @returns generates uuid and sets in receiptrecords Map datastructure
   */
  generateReceiptID(receipt: ReceiptDataObject): ReceiptID {
    const id: string = uuidv4();
    const points = pointsCalculation(receipt);    
    receiptrecords.set(id, points);      
    return id;
  }

  /**
   *
   * @param id takes ID 
   * @returns returns record if exists or undefined
   */
  findbyReceiptID(id: ReceiptID): ReceiptPoints | undefined {    
    return receiptrecords.get(id);
  }
}
