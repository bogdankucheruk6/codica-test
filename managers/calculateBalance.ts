import { PROFITABLE, CONSUMABLE} from '../constants';
import { Bank } from '../models/model';

export = async (amount: number, type: string, bankId: number): Promise<void> => {
    let {balance}: any = await Bank.findOne({
        where: {
            id: bankId
        },
    });

    if (type === PROFITABLE) {
        balance += amount;
    } else if (type === CONSUMABLE) {
        balance -= amount;
    }

    await Bank.update({
        balance
    }, {
        where: {
            id: bankId,
        }
    });
};
