const express = require('express');
const userControllers = require('../controllers/User');
const courseControllers = require('../controllers/Course');

const router = express.Router();


router.get('/', userControllers.getMain);

// auth
router.get('/auth', userControllers.getAuth);
router.post('/auth', userControllers.postAuth);

// reg
router.get('/reg', userControllers.getReg);
router.post('/reg', userControllers.postReg);

//course
router.get('/create', courseControllers.getCreate);
router.post('/create', courseControllers.postCreate);
router.get('/update/:id', courseControllers.getUpdate);
router.post('/update/:id', courseControllers.putUpdate);
router.get('/courses', courseControllers.getCourses);
router.get('/course/:id', courseControllers.getCourse);


module.exports = router;