/**
 * Site
 *
 * @module      :: Model
 * @description :: A site
 * @docs		    :: http://sailsjs.org/#!documentation/models
 */

var codeRegex        = /^[a-zA-Z0-9]{2}$/,
    metaJsonUrlRegex = /^https?:\/\//;

module.exports = {

  schema: true,

  codeRegex:        codeRegex,
  metaJsonUrlRegex: metaJsonUrlRegex,

  attributes: {
    code: {
      type: 'string',
      regex: codeRegex,
      unique: true
    },

    name: 'string',

    metaJsonUrl: {
      type: 'string',
      regex: metaJsonUrlRegex
    }
  },

};
