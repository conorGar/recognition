const { User, Project } = require('./models')

const main = async () => {
  try {
    // empty both tables
    await User.destroy({ where: {} })
    await Project.destroy({ where: {} })

    //user seed
    const James = await User.create({
      name: 'James Kim',
      username: 'jkim3360',
      linkedin: 'http://linkedin.com/jkim3360',
      email: 'jamesdaehokim@gmail.com',
      password: 'password',
      imgUrl: 'https://pbs.twimg.com/profile_images/75637614/images_400x400.jpg'
    })
    const David = await User.create({
      name: 'David Grosh',
      username: 'dgrosh123',
      linkedin: 'http://linkedin.com/dgrosh123',
      email: 'dgrosh123@gmail.com',
      password: 'password',
      imgUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/4294d211263263.560f4cf7b4a0f.jpg'
    })
    const Justin = await User.create({
      name: 'Justin Lendle',
      username: 'jlendle246',
      linkedin: 'http://linkedin.com/jlendle246',
      email: 'jlendle246@gmail.com',
      password: 'password',
      imgUrl: 'https://image.shutterstock.com/image-vector/default-avatar-profile-icon-grey-260nw-518740741.jpg'
    })
    const Connor = await User.create({
      name: 'Connor Garity',
      username: 'cg999',
      linkedin: 'http://linkedin.com/cg999',
      email: 'cgarity@gmail.com',
      password: 'password',
      imgUrl: 'https://image.shutterstock.com/image-vector/profile-photo-vector-placeholder-pic-260nw-535853263.jpg'
    })

    //project seed
    const project1 = await Project.create({
      name: 'Project 1',
      imgUrl: 'http://www.illuminationworksllc.com/wp-content/uploads/2017/04/ProjectManagement-1.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi fugiat quam, sapiente molestiae, veritatis sed a eveniet odio enim assumenda unde harum facere aut soluta laborum ex officia cupiditate exercitationem!',
      skills: 'HTML, CSS',
      link: 'http://google.com'
    })
    const project2 = await Project.create({
      name: 'Project 2',
      imgUrl: 'http://www.illuminationworksllc.com/wp-content/uploads/2017/04/ProjectManagement-1.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi fugiat quam, sapiente molestiae, veritatis sed a eveniet odio enim assumenda unde harum facere aut soluta laborum ex officia cupiditate exercitationem!',
      skills: 'Node.js, Crud',
      link: 'http://google.com'
    })
    const project3 = await Project.create({
      name: 'Project 3',
      imgUrl: 'http://www.illuminationworksllc.com/wp-content/uploads/2017/04/ProjectManagement-1.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi fugiat quam, sapiente molestiae, veritatis sed a eveniet odio enim assumenda unde harum facere aut soluta laborum ex officia cupiditate exercitationem!',
      skills: 'React, JS',
      link: 'http://google.com'
    })
    const project4 = await Project.create({
      name: 'Project 4',
      imgUrl: 'http://www.illuminationworksllc.com/wp-content/uploads/2017/04/ProjectManagement-1.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi fugiat quam, sapiente molestiae, veritatis sed a eveniet odio enim assumenda unde harum facere aut soluta laborum ex officia cupiditate exercitationem!',
      skills: 'Crud',
      link: 'http://google.com'
    })

    await project1.setUsers(James)
    await David.addProject(project1)
    await Justin.addProject(project1)
    await project2.setUsers(James)
    await David.addProject(project2)
    await Justin.addProject(project2)
    await project3.setUsers(James)
    await David.addProject(project3)
    await project4.setUsers(Connor)

  } catch (error) {
    throw error
  } finally {
    process.exit()
  }
}

main()
