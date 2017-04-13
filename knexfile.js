module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://joe:hahafom@localhost/tv_shows_test',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://joe:hahafom@localhost/tv_shows',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },
  production: {
    client: 'pg',
    connection: 'postgres://rleeylgykrefqz:bbd20ea33038ea0af8327fe13bb81d432049f0ebbe411e0bd43532477d29af90@ec2-54-235-181-120.compute-1.amazonaws.com:5432/d4dfff1jra8ofq?ssl=true',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }
};
