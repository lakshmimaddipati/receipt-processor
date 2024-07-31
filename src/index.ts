import "reflect-metadata";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const receiptRouter = require('./routes/receiptRoutes');
app.use(express.json());

app.use('/receipts', receiptRouter);

app.listen(PORT, () => {
console.log(`Receipt point calculation server operational on port ${PORT}`);
});
   