const Student = require('../model/student');

exports.create = async (req, res, next) => {
  try {
    const name = req.body.name;
    const school = req.body.school;
    const phone = req.body.phone;
    const address = req.body.address;
    const place = req.body.place;
    const courseName = req.body.courseName;
    const college = req.body.college;

    const student = await new Student({
      name: name,
      school: school,
      phone: phone,
      address: address,
      place: place,
      courseName: courseName,
      college: college,
    });
    const createdStudent = await student.save();
    if (!createdStudent) {
      const error = new Error('Student Not Created');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Student Created', student });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const students = await Student.find();
    if (!students) {
      const error = new Error('Students Not Found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: 'Students Fecthed', students });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
