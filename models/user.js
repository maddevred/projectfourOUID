'use strict';
const bcrypt = require('bcrypt'); // making a hash password for the user
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  user.addHook('beforeCreate', function(pendingUser) {
    // bcrypt hash a password for us
    let hash = bcrypt.hashSync(pendingUser.password, 12);
    // set password to equal the hash
    pendingUser.password = hash;
    console.log(pendingUser);
  });
  
  user.prototype.validPassword = function(passwordTyped) {
    let correctPassword = bcrypt.compareSync(passwordTyped, this.password);
    console.log('Inside of validPassword', correctPassword);
    // return true or false based on correct password or not
    return correctPassword;
  }
  
  // remove the password before it gets serialized 
  user.prototype.toJSON = function() {
    console.log('Inside of the toJSON method');
    let userData = this.get();
    delete userData.password;
    console.log(userData);
    return userData;
  }

  return user;
};
