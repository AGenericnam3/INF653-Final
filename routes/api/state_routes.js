const express = require('express');
const router = express.Router();
const stateController = require('./controllers/stateController');

// Routes for API requests
router.route('/')
    .get(stateController.getAllStates)
    .post(stateController.createNewState)

router.route('/:code')
    .get(stateController.getState);

router.route('/:code/funfact')
    .get(stateController.getFunfact)
    .post(stateController.postFunfact)
    .patch(stateController.patchFunfact)
    .delete(stateController.deleteFunfact)

router.route('/:code/nickname')
    .get(stateController.getNickName)

router.route('/:code/capital')
    .get(stateController.getCapital)

router.route('/:code/population')
    .get(stateController.getPopulation)

router.route('/:code/admission')
    .get(stateController.getAdmission)

function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}

module.exports = router;