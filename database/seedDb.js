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
      email: 'dgrosh123@gmail.com'
    })
    const Justin = await User.create({
      name: 'Justin Lendle',
      username: 'jlendle246',
      linkedin: 'http://linkedin.com/jlendle246',
      email: 'jlendle246@gmail.com'
    })
    const project1 = await Project.create({
      name: 'Project 1',
      projectImgUrl: 'http://www.projectimg.com'
    })
    const project2 = await Project.create({
      name: 'Project 2',
      projectImgUrl: 'http://www.project2img.com'
    })
    const project3 = await Project.create({
      name: 'Project 3',
      projectImgUrl: 'http://www.project3img.com'
    })

    // remember this stupid ass thing
    await project1.setUsers(James)
    await David.addProject(project1)
    await Justin.addProject(project1)
    await project2.setUsers(James)
    await David.addProject(project2)
    await Justin.addProject(project2)
    await project3.setUsers(James)
    await David.addProject(project3)
    await Justin.addProject(project3)




  } catch (error) {
    throw error
  } finally {
    process.exit()
  }
}

main()
