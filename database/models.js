const { Sequelize } = require('sequelize')

// connection to the database
const db = new Sequelize({
  database: 'icrud_db',
  dialect: 'postgres'
})

// define models
const User = db.define('user', {
  name: {
    type: Sequelize.TEXT
  },
  username: {
    type: Sequelize.TEXT,
    allowNull: false,
    isUnique: true
  },
  linkedin: {
    type: Sequelize.TEXT,
    allowNull: false,
    isUnique: true
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    isUnique: true
  }
})

const Project = db.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  projectImgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'Flatiron District',
    allowNull: false
  }
})

// define relationships

User.belongsToMany(Project, {
  through: 'project_user_xref',
})

Project.belongsToMany(User, {
  through: 'project_user_xref',
})

module.exports = {
  db,
  User,
  Project
}
