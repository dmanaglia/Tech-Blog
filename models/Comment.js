const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {
  parseDate(){
    const yyyy = this.updatedAt.getFullYear();
    const mm = this.updatedAt.getMonth() + 1;
    const dd = this.updatedAt.getDate();
    return `${mm}/${dd}/${yyyy}`;
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    user_id: {
      type: DataTypes.INTEGER,
      references: {
      model: 'user',
      key: 'id',
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
      model: 'post',
      key: 'id',
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;