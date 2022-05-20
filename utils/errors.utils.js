// erreur de création

module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  console.log("err : " + err);
  if (err == "pseudo")
    errors.pseudo = "Pseudo incorrect ou déjà utilisé";

  if (err == "email") errors.email = 'Email incorrect';

  if (err == "password")
    errors.password = 'Le mot de passe doit faire plus de 6 carractère';

  return errors;
};


// erreur de connexion

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: '' }
  
  if(err == "err") errors.email = "Couple email/password non trouvé";

  return errors;
}


module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: "" };

  if (err.message.includes('invalid file'))
    errors.format = "Mauvais format d'image";

  if (err.message.includes('max size'))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors
} 