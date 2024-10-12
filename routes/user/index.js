const express = require('express');
const router = express.Router();

const accessVerify = require('../../utils/accessVerify');
const profile = require('./profile');
const posts = require('./posts');
const access = require('./access');
const newPost = require('./newPost');
const delPost = require('./delPost');
const postById = require('./postById');
const comment = require('./comment');

router.get('/profile', accessVerify, profile);
router.get('/posts', accessVerify, posts);
router.get('/postById/:id', accessVerify, postById);
router.post('/newPost', accessVerify, newPost);
router.get('/access', accessVerify, access);
router.delete('/delpost/:id', accessVerify, delPost);
router.post('/comment', accessVerify, comment);

module.exports = router;