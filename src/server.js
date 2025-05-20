import dotenv from 'dotenv';
dotenv.config();
import {app} from './app.js'

const port = 5002

app.listen(port,()=>{
    console.log('Server running on port ' + port); 
})

    