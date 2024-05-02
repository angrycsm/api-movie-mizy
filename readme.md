<p align="center">
    <img src="https://drive.google.com/uc?id=1GTQ5g2pOOy_f_mQX7qHH6T9xW3yOKnoG" alt="Descrição da Imagem" style="width: 150px; height: auto;">
</p>

<h1 align="center"> MIZY</h1>
<p align="center"> API for a movie website, containing, creation of movie categories, creation of movies in a category and users. 💜</p>

<p align='center'>
<img src="https://img.shields.io/static/v1?label=API&message=Mizy&color=7159c1&style=for-the-badge&logo=prisma"/>

[![TypeScript](https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)
[![Zod](https://img.shields.io/badge/--10b981?logo=zod&logoColor=ffffff)]()
</p>

<p align="center">
 <a href="#goal">Goal</a> •
 <a href="#features">Features</a>
 <a href="#technologys">Technologys</a> • 
 <a href="#requirements">Requirements</a> • 
 <a href="#lecenca">Licença</a>
</p>

## Goal
The purpose of the API is for a movie website, where the user can register and watch movies, enjoy movies, save movies, but the user will not be able to create movie categories, much less movies in a category, so who will be responsible for administration will be the superior user who will create categories, and films within these categories. 

## Features
### Crud Mizy API
#### Users
- [x] Create User
- [x] Get User
- [x] Update User
- [ ] Delete User
#### Movie Category
- [x] Create Movie Category
- [x] Get Movies Categorys
- [ ] Update Movie Cateogory
- [ ] Delete Movie Category
#### Movie In Category
- [x] Create Movie In Category
- [x] Get Movies In Category
- [x] Get Single Movie In Category
- [ ] Update Movie In Category 
- [ ] Delete Movie In Category

## Technologys 
The following tools were used to build the project:

- [Node.js](https://nodejs.org/en/)
- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Prisma](https://www.prisma.io/)

## Requirements

Before starting, you will need to have the following tools installed on your machine:
 [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
 Furthermore, it's good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/)

### Running the Back End (server)

```bash
# Clone this repository
$ git clone <https://github.com/angrycsm/api-movie-mizy>

# Access the project folder in terminal/cmd
$ cd api-movie-mizy 

# Install dependencies
$ npm install

# Run the application in development mode
$ npm run dev

# The server will start on port:3333 - access <http://localhost:3333>
