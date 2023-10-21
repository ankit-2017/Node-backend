const express = require("express")
const router = express.Router()
const { verifyJwtToken } = require("../Utiliy/Middleware")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const { Register, Login, VerifyToken } = require("../Controllers/Api/v1/Authentication")
const { getMedia, getVideos, getModels } = require("../Controllers/Api/v1/Dashboard")

router.post("/user-signup", Register)
router.post("/login", Login)
router.get("/get-media", getMedia)
router.get('/get-videos', getVideos)
router.get('/get-models', getModels)
// router.get("/user-profile", verifyJwtToken, Profile)
router.get("/verify-token", verifyJwtToken, VerifyToken)

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


module.exports = router