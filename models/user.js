'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); 

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A first name is required'
        },
        notEmpty: {
          msg: 'Please provide a first name'
        }
      }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A last name is required'
          },
          notEmpty: {
            msg: 'Please provide a last name'
          }
        }
      },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The email address you entered already exists' //change to a more vague message
      },
      validate: {
        notNull: {
          msg: 'An email is required'
        },
        notEmpty: {
          msg: 'Please provide an email'
        }
      }
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false,
      set(val) {
        const hashedPassword = bcrypt.hashSync(val, 10);
        this.setDataValue('password', hashedPassword);
      },
      validate: {
        notNull: {
          msg: 'A password is required'
        },
        notEmpty: {
          msg: 'Please provide a password'
        },
        // len: {
        //   args: [8, 20],
        //   msg: 'The password should be between 8 and 20 characters in length'
        // }
      },
    },
  }, 
  { 
    // timestamps: false,
    sequelize });

  User.associate = (models) => {
    // TODO Add associations.
    User.hasMany(models.Course, { 
      // as: 'director',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please login in to create a course'
          }
        }
     } 
    });
  };

  return User;
};