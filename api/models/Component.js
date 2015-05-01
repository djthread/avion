/**
 * Component - An actual instance of one on a page
 *
 * @module      :: Model
 * @description :: A Component
 * @docs		    :: http://sailsjs.org/#!documentation/models
 */

var typeRegex = /^[a-z0-9-]+$/;

module.exports = {

  schema: true,

  typeRegex: typeRegex,

  attributes: {

    pageId:   'integer',

    areaNum:  'integer',

    type: {
      type:  'string',
      regex: typeRegex,
    },

    position: 'integer',

  },

};
