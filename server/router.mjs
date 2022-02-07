import express from "express";
import { Spacecraft, Astronaut } from "./repository.mjs";
import { getRecords, patchRecord, postRecord, deleteRecords,
getRecord, putRecord, deleteRecord} from './service.mjs';

const router= express.Router();

router.route('/spacecrafts')
    .get((request, response)=> getRecords(Spacecraft, request, response))
    .post((request, response)=> postRecord(Spacecraft, request, response))
    .delete((request, response)=> deleteRecords(Spacecraft, request, response));

router.route('/spacecrafts/:id')
    .get((request, response)=> getRecord(Spacecraft, request, response))
    .patch((request, response)=> patchRecord(Spacecraft, request, response))
    .put((request, response)=> putRecord(Spacecraft, request, response))
    .delete((request, response)=> deleteRecord(Spacecraft, request, response));
    

router.route('/astronauts')
    .get((request, response)=> getRecords(Astronaut, request, response))
    .post((request, response)=> postRecord(Astronaut, request, response))
    .delete((request, response)=> deleteRecords(Astronaut, request, response));

router.route('/astronauts/:id')
    .get((request, response)=> getRecord(Astronaut, request, response))
    .put((request, response)=> putRecord(Astronaut, request, response))
    .patch((request, response)=> patchRecord(Astronaut, request, response))
    .delete((request, response)=> deleteRecord(Astronaut, request, response));

	
export default router;
