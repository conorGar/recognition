const { User, Project } = require('./models')

const main = async () => {
  try {
    await User.destroy({
      where: {}
    })

    await Project.destroy({
      where: {}
    })
    const James = await User.create({
      name: 'James Kim',
      username: 'jkim3360',
      linkedin: 'http://linkedin.com/jkim3360',
      email: 'jamesdaehokim@gmail.com'
    })
    const David = await User.create({
      name: 'David Grosh',
      username: 'dgrosh123',
      linkedin: 'http://linkedin.com/dgrosh123',
      email: 'jamesdaehokim@gmail.com'
    })
    const project1 = await Project.create({
      name: 'Project 1',
      projectImgUrl: 'http://www.projectimg.com'
    })

    // remember this stupid ass thing
    await project1.setUsers(James)
    await David.addProject(project1)
  } catch (error) {
    throw error
  } finally {
    process.exit()
  }
}

main()
