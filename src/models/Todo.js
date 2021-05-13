// Modules
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Path to users.json
const p = path.join(path.dirname(require.main.filename), 'data', 'todos.json');

module.exports = class Todo {
  constructor(data) {
    const { task, deadline, location } = data;
    this.task = task;
    this.deadline = deadline;
    this.location = location;
    this.guid = uuid.v4();
  }

  getGuid() {
    return this.guid;
  }

  // We push a new user to users array and save
  save() {
    // We read the file everytime we need to modify it
    fs.readFile(p, (err, data) => {
      let todos = [];
      if (!err) {
        todos = JSON.parse(data);
      }
      todos.push(this);
      // Write the file
      fs.writeFile(p, JSON.stringify(todos), (err) => console.log(err));
    })
  }

  // We update data with the given one
  static update(todos) {
    fs.writeFile(p, JSON.stringify(todos), (err) => console.log(err));
  }

  // get and parse the data (async)
  static getAll(cb) {
    fs.readFile(p, (err, data) => {
      let todos = [];
      if (!err) {
        todos = JSON.parse(data);
      }
      // callback function when the data is ready
      cb(todos);
    });
  }
};
