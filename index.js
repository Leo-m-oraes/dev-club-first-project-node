const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')

const port = 3000


const app = express()
app.use(express.json())
/* 

   - Query params  => meusite.com/users?nome=rodolfo&age=28 // FILTROS
   - Route params  => /users/2      // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO 
   - Request body  => {"name" : "Rodolfo" , "age":}

   - GET          => Buscar informações no back-end
   - POST         => Criar informações no back-end
   - PUT / PATCH  => Alterar/Atualizar informações no back-end
   - DELETE       => Deletar informações no back-end


   -find //filtrar informações do array e me retorna a informação
   -findIndex / vai me retornar o local do meu array que esta minha informção, posição


   - Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição
*/
// const name = request.query.name
// const age = request.query.age

// console.log(name, age)
// const { name, age } = request.query // tambem podemos fazer assim //Destructuring assignment
// return response.json({ name, age })

// app.get( '/users/:id' , (request, response)=> {

//     const {id} = request.params // uma forma de fazer 
//     console.log(id)
//     return response.json({id})

// })


const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = index
    next()
}

app.get('/users', (request, response) => {

    return response.json(users)

})
app.post('/users', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }

    users.push(user)
    return response.status(201).json(user)

})
app.put('/users/:id', checkUserId, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser)

})
app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()


})




app.listen(port, () => {
    console.log(`🚀 Server started on port ${port} `)
})