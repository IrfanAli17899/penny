const envVarPlugin = {
  name: 'env-var-plugin',
  setup(build) {
    const options = build.initialOptions;

    const envVars = {};

    envVars['API_BASE_URL'] = process.env.NODE_ENV;

    options.define['process.env'] = JSON.stringify(envVars);
  },
};

module.exports = envVarPlugin;