'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';

const Schema = mongoose.Schema;

const characterSchema = Schema({
  username: {type: String, required: true, lowercase: true, unique: true},
  description: [{type: String, required: true}],
  password: {type: String, required: true},
  inventory: Schema.Types.Mixed,
  hp: {type: Number, required: true},
  maxHP: {type: Number, required: true},
  mp: {type: Number, required: true},
  maxMP: {type: Number, required: true},
  sp: {type: Number, required: true},
  maxSP: {type: Number, required: true},
  level: {type: Number, required: true},
  atk: {type: Number, required: true},
  def: {type: Number, required: true},
  mat: {type: Number, required: true},
  mdf: {type: Number, required: true},
  currentRoom: {type: String, required: true},
  combat: {
    active: {type: Boolean, required: true},
    targets: []
  },
  equipment: Schema.Types.Mixed,
  effects: Schema.Types.Mixed
});

characterSchema.methods.hashPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      this.password = hash;
      return resolve(this);
    });
  });
};

characterSchema.methods.validatePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err) return reject(err);
      if (!valid) return reject('Wrong password');
      return resolve(this);
    });
  });
};

export const Character = mongoose.model('character', characterSchema);
