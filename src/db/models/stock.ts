import mongoose from "mongoose";

export interface StockStats extends mongoose.Document {
  open: string;
  close: string;
  high: string;
  low: string;
  date: Date;
}

export interface Stock extends mongoose.Document {
  name: string;
  code: string;
  stats: StockStats;
}

const StockStatsSchema = new mongoose.Schema<StockStats>({
  open: {
    type: String,
    required: true,
  },
  close: {
    type: String,
    required: true,
  },
  high: {
    type: String,
    required: true,
  },
  low: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const StockSchema = new mongoose.Schema<Stock>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    stats: StockStatsSchema,
  },
  { timestamps: true }
);

const Stock = mongoose.model<Stock>("stock", StockSchema);

export default Stock;
