import { NextFunction, Request, Response } from 'express';
import { Transaction, TransactionAndCategoryTransaction, Bank } from '../models/model';
import { CONSUMABLE} from '../constants';
import calculateBalance from '../managers/calculateBalance';

type ReqBodyTransaction = {
    amount: number,
    type: string, 
    bankId: number,
    categoryTransactionId: number
}

const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {amount, type, bankId, categoryTransactionId}: ReqBodyTransaction = req.body;
        const result: any = await Transaction.create({amount, type, bankId});

        await calculateBalance(amount, type, bankId);

        if (categoryTransactionId) {
            await TransactionAndCategoryTransaction.create({categoryTransactionId, transactionId: result.id});
        }

        return res.json(result);
    } catch (err: any) {
        next(err);
    };
};

const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        let page: any = req.query.page;
        let limit: any = req.query.limit;

        page = page || 1;
        limit = limit || 3;

        let offset: number = page * limit - limit;
        const result: any = await Transaction.findAndCountAll({
            where: {
                bankId: id
            },
            limit,
            offset,
            include: ['bank', 'category_transactions']
        });

        console.log(result)

        result.rows.forEach((category: any) => {
            category.dataValues.category_transactions.forEach((item: any) => {
            delete item.dataValues.transactions_and_category_transactions;
            });
        });

        return res.json(result);
    } catch (err: any) {
        next(err);
    };
};

const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const {amount, bankId}: any = await Transaction.findOne({
            where: {
                id
            }
        });

        const result = await Transaction.destroy({
            where: {
                id
            }
        });
        
        await calculateBalance(amount, CONSUMABLE, bankId);
        
        return res.json({msg: 'Transaction has been deleted'});
    } catch (err: any) {
        next(err);
    };
};

export default {
    createTransaction,
    getTransactions,
    deleteTransaction
}