
import express from 'express';
import { AddEvent,GetAllEvents,getEventById ,updateEventById,deleteEventById,deleteAllEvents, getFilteredMemberCriteria,generateSingleQRCode   } from '../controllers/EventController';
import {  eventCreateValidatorRules,eventIdValidatorRules} from '../validators/EventValidator';
import { ValidateRequest} from '../middlewares/validatorRequest';

const router=express.Router();

router.post("/", eventCreateValidatorRules,ValidateRequest, AddEvent)
router.get("/",GetAllEvents)
router.get("/:id", getEventById );
router.patch("/:id",eventIdValidatorRules,ValidateRequest, updateEventById);
router.delete("/:id", deleteEventById);
router.delete("/",deleteAllEvents )

router.get(
  "/:eventId/filter-member",
  getFilteredMemberCriteria
);



export const eventRoute = router;