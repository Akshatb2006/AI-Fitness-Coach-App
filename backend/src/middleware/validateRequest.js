const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }
  next();
};

module.exports = {
  userData: [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('age').isInt({ min: 10, max: 100 }).withMessage('Valid age required'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Valid gender required'),
    body('height').isFloat({ min: 50, max: 300 }).withMessage('Valid height required'),
    body('weight').isFloat({ min: 20, max: 500 }).withMessage('Valid weight required'),
    body('fitnessGoal').isIn(['weight_loss', 'muscle_gain', 'maintenance', 'endurance'])
      .withMessage('Valid fitness goal required'),
    body('fitnessLevel').isIn(['beginner', 'intermediate', 'advanced'])
      .withMessage('Valid fitness level required'),
    body('workoutLocation').isIn(['home', 'gym', 'outdoor'])
      .withMessage('Valid workout location required'),
    body('dietaryPreference').isIn(['veg', 'non_veg', 'vegan', 'keto'])
      .withMessage('Valid dietary preference required'),
    handleValidationErrors
  ]
};