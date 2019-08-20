const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')

// connection to the database
const db = new Sequelize({
  database: 'icrud_db',
  dialect: 'postgres'
})

// define models
const User = db.define('user', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
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
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

const Project = db.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'Flatiron District',
    allowNull: false
  },
  link: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  skills: Sequelize.STRING
})

User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(process.env.SALT_ROUNDS)
  )
  user.password = hashedPassword
})
// define relationships

User.belongsToMany(Project, {
  through: 'project_user_xref'
})

Project.belongsToMany(User, {
  through: 'project_user_xref'
})

module.exports = {
  db,
  User,
  Project
}
