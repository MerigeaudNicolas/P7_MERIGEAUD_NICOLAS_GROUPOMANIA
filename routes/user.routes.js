// création constante router d'express

const router = require ('express').Router();

//création de la route authController

const authController = require('../controllers/auth.controller');

// création de la route userController

const userController = require('../controllers/user.controller');

// création de la route uploadController

const uploadController = require('../controllers/upload.controller');

// appel de multer pour les images

const multer = require("multer");
const upload = multer();

// Authentification

router.post("/register" , authController.signUp); // s'enregistrer
router.post("/login" , authController.signIn); // Connexion
router.get("/logout" , authController.logout); // Deconnexion

// user database
router.get('/' , userController.getAllUsers);
router.get('/:id' , userController.userInfo)
router.put('/:id' , userController.updateUser);
router.delete('/:id' , userController.deleteUser);
router.patch('/follow/:id' , userController.follow);
router.patch('/unfollow/:id' , userController.unfollow);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);


module.exports = router; 