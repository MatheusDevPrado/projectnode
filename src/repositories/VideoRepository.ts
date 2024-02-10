import { sign } from 'jsonwebtoken';
import { pool } from '../mysql';
import {v4 as uuidv4} from 'uuid';
import {hash, compare} from 'bcrypt';
import { Request, Response } from 'express';


class VideoRepository{
    create(request:Request, response:Response){
        const {user_id, title, description} = request.body;
        pool.getConnection((err: any, connection: any) => {
                
                connection.query(
                'INSERT INTO videos (video_id, user_id, title, description) VALUES (?,?,?,?)',
                [uuidv4(),user_id ,title, description], 
                (error: any, result: any, fileds:  any) => {
                connection.release();
                if (error) {
                    return response.status(400).json(error);
                }
                response.status(200).json({message: 'Usuário criado com sucesso!'});
                } 
            )         
        })
    }
}

export { VideoRepository }