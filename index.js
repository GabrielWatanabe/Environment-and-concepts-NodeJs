const express = require('express');
const server = express();

server.use(express.json())

const project = [
  {
    "id": "0",
    "title": "Novo Projeto",
    "tasks": []
  }
];

// server.use((req, res, next) => {
//   console.log(`Método: ${req.method}; URL: ${req.url}`);

//   next();

//   console.log("finish")
// })

// function checkUserExists(req, res, next)
//  {
//    if (!req.body.name) {
//      return res.status(400).json({error: 'User name is required'})
//    }

//    return next()
//  }

//  function checkUserInArray(req, res, next) {
//    const user = users[req.params.index];

//    if (!user) {
//      return res.status(400).json({error: 'User does not exists'});
//    }
//    req.user = user;
//    return next();
//  }
// //request body = { "name": "Gabriel"}
// server.get('/users',checkUserInArray, (req, res) => {
//   return res.json(users)
// });

// server.get('/users/:index', checkUserInArray,(req, res) => {
//   return res.json(req.user)
// });

// server.post('/users', checkUserExists, (req, res ) => {
//   const { name } = req.body;

//   users.push(name);

//   return res.json(users);
// })

// server.put('/users/:index',checkUserInArray, checkUserExists, (req, res) => {
//   const {index} = req.params;
//   const {name} = req.body;

//   users[index] = name;

//   return res.json(users)
// })

// server.delete('/users/:index',checkUserInArray, (req, res) => {
//   const {index} = req.params;
//   users.splice(index, 1);

//   return res.json(users)
// })
function checkInArray(req, res, next) {
  const eachProject = project[req.params.index];

  if (!eachProject) {
         return res.status(400).json({error: 'Project does not exists'});
  }
       req.project = eachProject;
       return next();
}

function checkProjectExists(req, res, next) {
  if (!req.body.title) {
   return res.status(400).json({error: 'Project name is required'})
  }
  return next()
}

server.post('/projects', (req, res) => {
  const name = req.body;
  project.push(name);

  return res.json(project)
})

server.get('/projects', (req, res) => {
  return res.json(project)
})

server.put('/projects/:index',checkInArray, (req, res) => {

  const {index} = req.params;
  const {title} = req.body;Z

  project.map(function(num) {
     if (num.id == index) {
       num.title = title
     }
  })

  return res.json(num)
})

server.delete('/projects/:index',checkInArray, (req, res) => {
  const {index} = req.params;

  project.splice(index, 1);

  return res.json(project)
})

server.post('/projects/:id/tasks', (req,res) => {
  const {title} = req.body;
  const {id} = req.params;

  project.map(function(num) {
    if (num.id == id) {
      num.title.push(title)
    }
 })

 return res.json(num)
})

server.listen(3000);