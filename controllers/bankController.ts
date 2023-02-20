import { NextFunction, Request, Response } from 'express';
import {Bank} from '../models/model';

const getBanks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: any = await Bank.findAll({
            include: ['transactions']
        });

        return res.json(result);
    } catch (err: any) {
        next(err);
    };
};

const getBank = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const result: any = await Bank.findOne({
            where: {
                id
            },
            include: ['transactions']
        });

        return res.json(result);
    } catch (err: any) {
        next(err);
    };
};

type ReqBodyCreateBank = {
    name: string,
    balance: number
}

const createBank = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, balance}: ReqBodyCreateBank = req.body;
        const result: any = await Bank.create({name, balance});

        return res.json(result);
    } catch (err: any) {
        err.message = 'Bank name not specified';
        next(err);
    };
};

const deleteBank = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const bank: any = await Bank.findOne({
            where: {
                id
            },
            include: ['transactions']
        });
        let result: any;

        if (!bank.transactions.length) {
            result = await Bank.destroy({
                where: {
                    id
                }
            });
        } else {
            return res.json({msg: 'There are transactions in the bank, deletion is not possible'});
        }

        if (!result) {
            return res.json({msg: 'Bank does not exist'});
        };

        return res.json({msg: 'Bank has been deleted'});
    } catch (err: any) {
        err.message = 'Failed to delete bank';
        next(err);
    };
};

const updateBank = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const {balance}: {balance: number} = req.body;
    
        const result: any = await Bank.update({
            balance
        },
        {
            where: {
                id
            }
        });

        if (!result[0]) {
            return res.json({msg: 'Bank does not exist'})
        }
    
        return res.json({msg: `Balance has been updated on ${balance}`});
    } catch (err: any) {
        err.message = 'Failed to update balance';
        next(err);
    };
};

export default {
    getBanks,
    getBank,
    createBank,
    deleteBank,
    updateBank,
}