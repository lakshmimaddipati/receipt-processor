import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ReceiptDataObject } from "../data/dataObject";
import { ReceiptService } from "../services/receiptService";

const receiptService = new ReceiptService();

export const postReceiptRecord = async (req: Request, res: Response) => {
  const receiptObject = plainToInstance(ReceiptDataObject, req.body);
  const errors = await validate(receiptObject);
  if (errors.length) {
    return res.status(400).send("Invalid Receipt");
  }
  const id = receiptService.generateReceiptID(receiptObject);
  return res.json({ id });
};

const getReceiptRecord = (req: Request, res: Response) => {
  const { id } = req.params;
  const points = receiptService.findbyReceiptID(id);
  if (!points) {
    res.status(404).send("Receipt not found");
  } else {
    res.json({ points });
  }
};

module.exports = {
  postReceiptRecord,
  getReceiptRecord,
};
