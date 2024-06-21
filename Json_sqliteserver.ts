import { Database } from "bun:sqlite";
const db = new Database("dbTest.sqlite", { create: true });
const query = db.query(`CREATE TABLE IF NOT EXISTS Test(
   Sno INTEGER PRIMARY KEY   AUTOINCREMENT ,
   Name CHAR(30),
   Age INTEGER
);`).run();


const server = Bun.serve({
    port: 3000,
async    fetch(request) {
      const url = new URL(request.url)
      //console.log(url)
      if (url.pathname === '/') {   
      
       return new Response("Welcome to Bun JS "+url);}

      if (url.pathname== '/read'){
        {
          //Completed
          const incomingData = await request.json();
          const userDataWithId = {
           
            ...incomingData
            
          };

          const queryInstert= db.prepare(`SELECT Sno , Age , Name  FROM Test WHERE Sno=$Id;`);
          const results = queryInstert.values({ $Id:incomingData.id });
          return new Response(JSON.stringify({ status: 'SUCCESS', message: 'User Displayed ', data: results }))
        }
        }
      
      if (url.pathname === '/delete')

        {
          {
          
            const incomingData = await request.json();
            const userDataWithId = {
             
              ...incomingData
              
            };
  
            const queryInstert= db.prepare(`DELETE FROM Test WHERE Sno=$Id;`);
            const results = queryInstert.all({ $Id:incomingData.id });
            return new Response(JSON.stringify({ status: 'SUCCESS', message: 'User Deleted', data: results}))
          }
        }
      
      if (url.pathname === '/create')
         {
          
          const incomingData = await request.json();
          const userDataWithId = {
            
            ...incomingData
            
          };

          // Create user in database
          const queryInstert= db.prepare(`INSERT INTO Test (Name , age ) VALUES($Name,$Age) ;`);
          const results = queryInstert.all({ $Name:incomingData.name ,$Age:incomingData.age });
          
          return new Response(JSON.stringify({ status: 'SUCCESS', message: 'User created successfully', data: userDataWithId}))
          }  

      if (url.pathname === '/update')
        {
          
          const incomingData = await request.json();
          const userDataWithId = {
           
            ...incomingData
            
          };

          const queryInstert= db.prepare(`UPDATE Test SET Name = $Name, Age = $Age WHERE Sno=$Id;`);
          const results = queryInstert.all({ $Name:incomingData.name ,$Age:incomingData.age , $Id:incomingData.id });
          return new Response(JSON.stringify({ status: 'SUCCESS', message: 'User Updated', data: userDataWithId}))
        }

      
      return new Response('Server is working')
    }
  });


console.log(`Listening on localhost:${server.port}`);
