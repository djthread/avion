/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // Load in some secret keys from .env
  require('dotenv').load();
  if (!process.env.SESSION_SECRET || !process.env.CRYPTO_KEY) {
    console.error("Crypto tokens were not found. Please generate them with\n\n" +
      "    gulp generateEnv\n");
    process.exit(1);
  }

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
