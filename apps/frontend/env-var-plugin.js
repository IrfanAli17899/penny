const envVarPlugin = {
  name: 'env-var-plugin',
  setup(build) {
    const options = build.initialOptions;

    const envVars = {};

    envVars['API_BASE_URL'] = process.env.API_BASE_URL

    options.define['process.env'] = JSON.stringify(envVars);
  },
};

module.exports = envVarPlugin;