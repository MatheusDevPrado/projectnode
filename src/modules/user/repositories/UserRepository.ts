import { sign } from 'jsonwebtoken';
import { pool } from '../../../mysql';
import {v4 as uuidv4} from 'uuid';
import {hash, compare} from 'bcrypt';
import { Request, Response } from 'express';


class UserRepository{
create(request:Request, response:Response){
   const {name, email, password} = request.body;
   pool.getConnection((err: any, connection: any) => {
        hash(password, 10, (err, hash) => {
            if(err){
                return response.status(400).json(err);
            }
            connection.query(
            'INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)',
            [uuidv4(), name, email, password], 
            (error: any, result: any, fileds:  any) => {
            connection.release();
                if (error) {
                    return response.status(400).json(error);
                }
                response.status(200).json({message: 'Usuário criado com sucesso!'});
            } 
          )         
       })
   })
}
login(request:Request, response:Response){
    const {name, email, password} = request.body;
    pool.getConnection((err: any, connection: any) => {
        
        connection.query(
        'SELECT * FROM users WHERE email= ?',
        [ email], 
        (error: any, result: any, fileds:  any) => {
            connection.release();
                if (error) {
                    return response.status(400).json({error: "error na sua autenticação"});
                }
                
                compare(password, result[0].password,(err, results) => {
                    if(err){
                        return response.status(400).json({error: "error na sua autenticação"});
                    }
                    if(result){
                        const token = sign({
                            id: result[0].user_id,
                            email: result[0].email
                        }, 'segredo', {expiresIn: "1d"})
                    
                    return response.status(200).json({token: token, message: 'Autenticado com sucesso!' }); 
                    }
                }) 
            }  
        )
    })         
}
}
 
export { UserRepository };