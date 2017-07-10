'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import Promise from 'bluebird';

const Schema = mongoose.Schema;

const characterSchema = Schema({
  username: {type: String, required: true},
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
  }
});
