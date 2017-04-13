var knex = require('./knex.js');

function Shows() {
  return knex('shows');
}

// *** queries *** //

function getAll() {
  return Shows().select();
}

function getSingle(showID) {
  return Shows().where('id', parseInt(showID)).first();
}

module.exports = {
  getAll: getAll,
  getSingle: getSingle
};
