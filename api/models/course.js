'use strict'
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A title is required'
        },
        notEmpty: {
          msg: 'Please Provide a title'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A description is required'
        },
        notEmpty: {
          msg: 'Please Provide a description'
        }
      }
    },
    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    materialsNeeded: {
      type: DataTypes.STRING,
      allowNull: true
    }
    // UserId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "user",
    //     key: "id"
    //   }
    // }
  }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, { 
      foreignKey: {
        fieldName: 'userId', 
        allowNull: false,
        validate: {
          notNull: {
            msg: 'An instructor is required'
          },
          notEmpty: {
            msg: 'Please Provide an instructor'
          }
        }
      },
    });
  };

  return Course
};