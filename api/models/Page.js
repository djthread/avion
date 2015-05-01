/**
 * Page
 *
 * @module      :: Model
 * @description :: A page
 * @docs		    :: http://sailsjs.org/#!documentation/models
 */

var pathRegex = /^\/[a-z0-9\/\.,_-]+$/;

module.exports = {

  schema: true,

  pathRegex: pathRegex,

  attributes: {

    siteId: 'integer',

    path: {
      type:  'string',
      regex: pathRegex  // @TODO should be unique with sitecode
    },

    siteDefined: {
      type:    'boolean',
      default: false
    },

    layout: {
      type: 'string',
    }

  },

};
