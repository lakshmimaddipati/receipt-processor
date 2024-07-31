import express from "express";

const controller = require("../controllers/receiptController")

const router = express.Router();

router.post("/process", controller.postReceiptRecord);

router.get("/:id/points", controller.getReceiptRecord);

module.exports = router