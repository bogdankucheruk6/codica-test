import e, { NextFunction, Request, Response } from 'express';
import { CategoryTransaction, TransactionAndCategoryTransaction } from '../models/model';

type ReqBodyCreateCategory = {
    name: string,
    transactionId: number
}

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, transactionId}: ReqBodyCreateCategory = req.body;
        const result: any = await CategoryTransaction.create({name});

        await TransactionAndCategoryTransaction.create({categoryTransactionId: result.id, transactionId});

        return res.json(result);
    } catch (err: any) {
        next(err);
    };
};

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const category: any  = await CategoryTransaction.findOne({
            where: {
                id
            }
        });

        if (!category.transaction.length) {
            await CategoryTransaction.destroy({
                where: {
                    id
                }
            });
        } else {
            return res.json({msg: 'There are transactions in the category, deletion is not possible'});
        }
        
        return res.json({msg: `Category has been deleted`});
    } catch (err: any) {
        next(err);
    };
};

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: any = await CategoryTransaction.findAll({
            include: ['transactions']
        });

        result.forEach((transaction: any) => {
            transaction.dataValues.transactions.forEach((item: any) => {
                delete item.dataValues.transactions_and_category_transactions;
            });
        });

        return res.json(result);
    } catch (err: any) {
        next(err);
    };
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const result: any = await CategoryTransaction.findOne({
            where: {
                id
            },
            include: ['transactions']
        });

        result.dataValues.transactions.forEach((item: any) => {
            delete item.dataValues.transactions_and_category_transactions;
        });

        return res.json(result);
    } catch (err: any) {
        next(err);
    };
};

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const {name}: {name: string} = req.body;
        await CategoryTransaction.update({
            name
        },
        {
            where: {
                id
            }
        });
        
        return res.json({msg: `Category has been updated on ${name}`});
    } catch (err: any) {
        next(err);
    };
};

export = {
    createCategory,
    deleteCategory,
    getCategories,
    getCategory,
    updateCategory
};