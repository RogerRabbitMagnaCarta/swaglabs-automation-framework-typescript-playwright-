// cucumber.js
module.exports = {
    default: {
      requireModule: ['ts-node/register'],      // compile TS on the fly
      require: [
        'test/support/**/*.ts',                // hooks + world
        'test/db/**/*.ts',                     // your DB helpers
        'steps/**/*.ts'                        // your step definitions
      ],
      paths: [
        'features/**/*.feature'                // your feature files
      ],
      publishQuiet: true,
      format: ['progress']
    }
  };
  