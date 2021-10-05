const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };

  // const sendAlert= (status, color, element) => {
  //   $(".bootstrap-growl").remove();
  //   $.bootstrapGrowl(status, {
  //     ele: element,
  //     type: color,
  //     align: 'center',
  //     delay: 2000,
  //   });
  // }

  module.exports=withAuth;