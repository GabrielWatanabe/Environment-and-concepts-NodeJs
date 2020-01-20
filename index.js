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