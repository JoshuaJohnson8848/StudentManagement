const Admin = require('../model/admin');
const JWT = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const existingAdmin = await Admin.findOne({
      email: email,
      password: password,
    });
    if (!existingAdmin) {
      const error = new Error('Incorrect Email or Password');
      error.status = 404;
      throw error;
    }
    loadedAdmin = existingAdmin;
    const token = await JWT.sign(
      {
        email: loadedAdmin.email,
        _id: loadedAdmin._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      message: 'LoggedIn Succesfully',
      token: token,
      adminId: loadedAdmin._id.toString(),
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
