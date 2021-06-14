const fs = require('fs')

// user: {id, username, created_at, fullname, email, tags, curator}

var all_tags = ['Front-end', 'Back-end', 'Fullstack', 'Gamedev', 'Data scientist', 'DevOps', 'Team lead'] // tags for users

function createUsers(quantity=100) {
  let users = [] // main array of users 
  let date = new Date()
  for (let i = 0; i < quantity; i++) {
    let tags = []
    for (let t = 0; t < Math.floor(Math.random() * all_tags.length) + 1; t++) {
      let rand_idx = Math.floor(Math.random() * all_tags.length)
      tags.push(all_tags[rand_idx])
    } // random choise from all_tags

    tags = Array.from(new Set(tags)) // exclude identical elements

    let user = {
      id: i,
      username: `user_${i}`,
      edited_at: date.getTime() - (i * 8640 * 10000), // 
      created_at: date.getTime() - (i * 8640 * 10000), 
      fullname: "John Smith",
      email: "jmith@gmail.com",
      tags,
      curator: null // default value
    }

    users.push(user) // add user to array
  }

  fs.writeFile("src/data/users.json", JSON.stringify(users, null, 2), err => {
    if (err) {
      throw new Error(err)
    }
  }) // save data
  return users
}

let u = createUsers()
console.log(u)