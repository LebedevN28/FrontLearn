const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress.controller');

router.get('/', progressController.getAllProgress);
router.get('/:id', progressController.getProgressById);
router.post('/', progressController.createProgress);
router.put('/:id', progressController.updateProgress);
router.delete('/:id', progressController.deleteProgress);

module.exports = router;
