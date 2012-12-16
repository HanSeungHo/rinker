var User, users;

User = require('../lib/auth').User;

exports.getUsers = function(req, res) {
  switch (req.query.action) {
    case 'login':
      return login(req, res);
    default:
      return users(req, res);
  }
};

exports.login = function(req, res) {
  return res.render('login', {
    title: 'login',
    return_to: req.header('Referrer'),
    message: req.flash('info')
  });
};

users = function(req, res) {
  var userlist;
  userlist = User.findAll();
  return res.render('admin/userlist', {
    title: 'User List',
    userlist: userlist
  });
};

exports.postLogin = function(req, res) {
  return User.login({
    id: req.body.id,
    password: req.body.password
  }, function(err, user) {
    if (user) {
      return req.session.regenerate(function() {
        req.session.user = User.findUserById(req.body.id);
        req.session.success = req.session.user.name + ' logined.';
        console.log(req.session.success);
        if (req.body.return_to && req.body.return_to !== req.header('Referrer')) {
          return res.redirect(req.body.return_to);
        } else {
          return res.redirect('/');
        }
      });
    } else {
      req.flash('info', "가입되지 않은 아이디 입니다.");
      return res.redirect('/login');
    }
  });
  console.log(req.session.user);
};

exports.logout = function(req, res) {
  var name;
  if (req.session.user) {
    name = req.session.user.name;
    delete req.session.user;
    delete req.session.success;
    delete req.session.level;
    console.log(name + ' logout.');
  }
  return res.redirect(req.header('Referrer'));
};

exports.getNew = function(req, res) {
  return res.render('admin/adduser', {
    title: 'new user'
  });
};

exports.postNew = function(req, res) {
  var userInfo;
  User.add({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  userInfo = User.findUserById(req.body.id);
  return res.render('admin/user', {
    title: '사용자가 등록되었습니다.',
    content: "사용자 정보",
    userInfo: userInfo
  });
};

exports.getId = function(req, res) {
  var userInfo;
  userInfo = User.findUserById(req.params.id);
  return res.render('admin/edituser', {
    title: 'User information',
    content: "사용자 정보",
    user: userInfo
  });
};

exports.postId = function(req, res) {
  var isValid, targetUser, userInfo;
  targetUser = User.findUserById(req.params.id);
  isValid = User.changePassword(req.body.previousPassword, req.body.newPassword, targetUser);
  if (isValid) {
    targetUser.email = req.body.email;
  }
  if (isValid) {
    User.save(targetUser);
  }
  userInfo = User.findUserById(req.params.id);
  return res.render('admin/user', {
    title: '사용자 정보가 변경되었습니다.',
    content: "사용자 정보",
    userInfo: userInfo
  });
};

exports.postDropuser = function(req, res) {
  var userInfo;
  userInfo = User.findUserById(req.body.id);
  if (userInfo) {
    User.remove({
      id: req.body.id
    });
  }
  return res.redirect('/users');
};
