# brainhub-test

## How to run - Server
 - Ask for env file and replace it with proper configuration.
 - Install node version manager
 - move terminal cursor to root/app
 - app ~ `nvm use`
 - app ~ `npm i` 
 - app ~ `npm run dev`
 - You can explore the graphql console on http://localhost:4000/graphql

## How to run - WebApp
 - install node version manager
 - move terminal cursor to root/web-app
 - wab-app ~ `nvm use`
 - web-app ~ `npm i` 
 - web-app ~ `npm run start`
 - You can explore the app at http://localhost:3000
 - Use the user and password `{ user: "test@email.com" , password: "ssseeeecrreeet" }`

## Considerations

- Missing tanspilation to javascript to generate files that would be uploaded to the server. 
- Missing ci package.json scripts mostly dev commands to get the server running a tsc transpilation is required for that. 
- First time using apollo server without neo4j. 
- First time using redux toolkit. 
- Using material ui next version as a chance to research current state of the library.
- Missing lerna or some kind of package manager for monorepos. 
- Missing more tests for front end and backend, currently just testing the reducers, should test the queries with a mock apollo client on the server. 
- Add some kind of snapshot testing to the react app

## Server

### What is:

Its an apollo server running on express. 

Bascially a prof of concept of the use of code generation by using  "graphql-codegen --config codegen.yml" the idea is that the development is driven by the typedefs so you can generate the neded types automatically. 

I choose not to use mongose i regret it 

#### The code is divided on 
- Typedefs : what is the schema
- DataSources: where the actual data is stored. 
- Resolvers: how we conect the schema queries to the datasources. 

## Client

### What is:

React CRA-17  using react hooks, redux/toolkit, apollo client. 

Apollo makes managing the state with redux an overkill, as apollo manages an inmemory cache that allow us to just query again everytime its needed. 

As a demo i used `redux` to store the session info. 
At web-app/src/redux using redux/toolkit slices, usually i would just used a context provider and the apollo cache to store the token. 

#### Components. 

Components that dont make mutations dont use the container view pattern, i just added the queries on the component itself. 
That way when requirements change, i can edit the query and the component on the same file. 

For components that create mutations i use a more standard container-view approach as mutations usually have an added logic to them. 
And its nice to be able to notice when a component creates a mutation.  

