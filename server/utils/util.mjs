/**
 * Function to check if a user can access a route
 * @param {*} req Request object
 * @param {*} res Result
 * @param {*} next Next function
 * @return {status} Status 401 if the user isn't authenticated
 */
function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401); // unauthorized
  }
  next();
}

export default isAuthenticated;
