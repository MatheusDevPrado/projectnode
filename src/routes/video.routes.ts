import { Router, request, response } from "express"; 
import { VideoRepository } from "../repositories/VideoRepository";

const videoRoutes = Router();
const videoRepository = new VideoRepository();

videoRoutes.post('/create-video', (request, response) => {
    videoRepository.create(request, response)
})

export { videoRoutes };