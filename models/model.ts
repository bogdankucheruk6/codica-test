import { DataTypes } from 'sequelize';
import sequelize from '../db';

const Bank = sequelize.define('banks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    balance: {type: DataTypes.INTEGER, defaultValue: 0},
});

const CategoryTransaction = sequelize.define('category_transactions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
});

const Transaction = sequelize.define('transactions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
});

const TransactionAndCategoryTransaction = sequelize.define('transactions_and_category_transactions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
});

Bank.hasMany(Transaction);
Transaction.belongsTo(Bank);

Transaction.belongsToMany(CategoryTransaction, { through: TransactionAndCategoryTransaction });
CategoryTransaction.belongsToMany(Transaction, { through: TransactionAndCategoryTransaction });

export {
    Bank,
    CategoryTransaction,
    Transaction,
    TransactionAndCategoryTransaction
}