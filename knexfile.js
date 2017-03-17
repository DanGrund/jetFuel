module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/jetfuel',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:'postgres://localhost/jetfuel_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: `postgres://cisgdxexbfscqj:b98d7bd1c7efd2e2b7bf37fbaaab0d656d16e59aef8ba154e8a79187c30f31a2@ec2-50-19-116-106.compute-1.amazonaws.com:5432/d7kp18oscj49kk` + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }
};
