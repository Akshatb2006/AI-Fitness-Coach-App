const express = require('express');
const router = express.Router();

const planController = require('../controllers/planController');
const imageController = require('../controllers/imageController');
const speechController = require('../controllers/speechController');
const exportController = require('../controllers/exportController');
const validateRequest = require('../middleware/validateRequest');

router.post('/generate-plan', validateRequest.userData, planController.generateFullPlan);
router.post('/generate-workout', validateRequest.userData, planController.generateWorkout);
router.post('/generate-diet', validateRequest.userData, planController.generateDiet);
router.post('/generate-tips', validateRequest.userData, planController.generateTips);
router.post('/generate-quote', planController.generateQuote);

router.post('/generate-image', imageController.generateImage);

router.post('/text-to-speech', speechController.textToSpeech);
router.get('/voices', speechController.getVoices);

router.post('/export-pdf', exportController.exportPDF);

module.exports = router;