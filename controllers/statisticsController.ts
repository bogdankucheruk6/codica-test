import { Op } from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import { CategoryTransaction } from '../models/model';
import { PROFITABLE, CONSUMABLE} from '../constants';
import operator from '../helpers/operator';
import { ParsedUrlQuery } from 'querystring';

const getStatistics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {categoryIds, fromPeriod, toPeriod}: any = req.query;

        // format 2023-10-09 || YYYY-mm-dd
        const data: any = await CategoryTransaction.findAll({
            where: {
                id: categoryIds,
                createdAt: {[Op.between] : [fromPeriod, toPeriod]}
            },
            include: ['transactions']
        });

        const result: any = {};
        data.forEach((category: any) => {
            let key: string = '';
            let value: number = 0;

            key = category.name;
            category.transactions.forEach((transaction: any) => {
                if (transaction.type === PROFITABLE) {
                    value += transaction.amount;
                } else if (transaction.type === CONSUMABLE) {
                    value -= transaction.amount;
                }
            });
            
            result[key] = `${operator(value)}` + value;
        });
        
        return res.json(result);
    } catch (err: any) {
        next(err);
    };
};

export default {
    getStatistics
}