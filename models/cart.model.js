import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './user.model.js';
import Product from './product.model.js';

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  priceAtAdd: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

Cart.belongsTo(User);
Cart.belongsTo(Product);
User.hasMany(Cart);
Product.hasMany(Cart);

export default Cart;