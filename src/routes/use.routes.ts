import { Router, request, response } from "express";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../modules/user/repositories/UserRepository";

const userRoutes = Router();
const userRepository = new UserRepository();

userRoutes.post('/sign-up', (request, response) => {
    userRepository.create(request, response)
})

userRoutes.post('/sign-in', (request, response) => {
    userRepository.login(request, response)
})
export { userRoutes };