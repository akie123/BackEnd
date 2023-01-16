const app = require('./app');
const connectDatabase = require('./config/database');

connectDatabase();


const server = app.listen(3000,()=>{
    console.log('server started on port 3000');
})