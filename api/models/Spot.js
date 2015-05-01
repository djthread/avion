/**
 * Spot - A key/val existing within a component
 *
 * @module      :: Model
 * @description :: A Spot
 * @docs		    :: http://sailsjs.org/#!documentation/models
 */

var typeRegex = /^[a-z0-9-]+$/,
    nameRegex = /^[A-Z0-9_]+$/;

module.exports = {

  schema: true,

  typeRegex: typeRegex,

  attributes: {

    componentId: 'integer',

    type: {
      type:  'string',
      regex: typeRegex
    },

    name: {
      type: 'string',
      regex: nameRegex
    },

    value: 'string'

  },

};
