import mongoose from "mongoose";
import { logger } from "../../external";
import { Stock } from "../models";

export const generateStockQueries = (StockModel: mongoose.Model<Stock>) => {
  logger.info("Generating Queries for Stock Collection");

  if (!StockModel) throw new Error("Database not connected properly");

  return Object.freeze({
    find: async (params: Record<string, unknown> = {}) => {
      return (await StockModel?.find(params)) || [];
    },
    findById: async (id: string) => {
      return (await StockModel?.findById(id)) || null;
    },
    insert: async (stock: Stock) => {
      const newStock = new StockModel(stock);
      await newStock.save();
    },
    insertMany: async (stocks: Stock[]) => {
      await StockModel.insertMany(stocks);
    },
    update: async (stock: Stock) => {
      await StockModel.updateOne({ _id: stock._id }, { $set: stock });
    },
    updateMany: async (stocks: Stock[]) => {
      const bulkOps = stocks.map((stock) => {
        return {
          updateOne: {
            filter: {
              _id: stock._id,
            },
            update: {
              stats: stock.stats,
            },
          },
        };
      });

      await StockModel.bulkWrite(bulkOps);
    },
  });
};
