'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import Promise from 'bluebird';

const Schema = mongoose.Schema;

const characterSchema = Schema({
  username: {type: String, required: true, lowercase: true, unique: true},
  description: [{type: String, required: true}],
  inventory: [{type: Object, required: true}],
  hp: {type: Number, required: true},
  maxHP: {type: Number, required: true},
  mp: {type: Number, required: true},
  maxMP: {type: Number, required: true},
  level: {type: Number, required: true},
  atk: {type: Number, required: true},
  def: {type: Number, required: true},
  mat: {type: Number, required: true},
  mdf: {type: Number, required: true},
  currentRoom: {type: String, required: true},
  combat: {
    active: {type: Boolean, required: true},
    targets: [{type: Schema.Types.Mixed, required: true}]
  },
  equipment: {
    head: Schema.Types.Mixed,
    shoulders: Schema.Types.Mixed,
    'main hand': Schema.Types.Mixed,
    'off hand': Schema.Types.Mixed,
    chest: Schema.Types.Mixed,
    legs: Schema.Types.Mixed,
    feet: Schema.Types.Mixed
  }
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
      if (!valid) return reject(createError(401, 'Wrong password'));
      return resolve(this);
    });
  });
};

export const Character = mongoose.model('character', characterSchema);
