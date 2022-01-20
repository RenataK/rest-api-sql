'use strict';
const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt'); //install first

// title (String)
// description (Text)
// estimatedTime (String)
// materialsNeeded (String)
// userId (created in the model associations with the foreignKey property, and equals the id from the Users table)


module.exports = (sequelize) => {
  class Courses extends Model {}
  Courses.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A title is required'
        },
        notEmpty: {
          msg: 'Please provide a title'
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
            msg: 'Please provide a description'
          }
        }
      },
      estimatedTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Estimated time is required'
        },
        notEmpty: {
          msg: 'Please provide an estimated time'
        }
      }
    },
    materialsNeeded: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Materials needed is required'
        },
        notEmpty: {
          msg: 'Please provide the materials needed'
        },
      }
    },
    // userId (created in the model associations with the foreignKey property, and equals the id from the Users table)
  }, { sequelize });

  Courses.associate = (models) => {
    // TODO Add associations.
    Courses.belongsTo(models.Users, { 
      // as: 'director',
      foreignKey: {
        fieldName: 'courseId',
        allowNull: false,
      } 
    });
  };

  return Courses;
};