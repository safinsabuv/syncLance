import express from 'express';
import {createProject, fetchProjects,singleProjectFetch, updateProject,deleteProject} from '../controllers/projectsController.js';
const router = express.Router();

router.route('/').get(fetchProjects).post(createProject);
router.route('/:id').get(singleProjectFetch).put(updateProject).delete(deleteProject);

export default router;


