const userDetail = require('../model/details');

exports.addUserDetails = (req, res, next)=>{
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  userDetail.create({
    amount: amount,
    description: description,
    category: category
  })
  .then(result => {
    // console.log(result);
    console.log('Created Product');
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
  });
}

exports.getUserDetails = (req, res, next)=> {
  userDetail.findAll()
  .then(products => {
    res.setHeader('Content-Type', 'text/html');
    res.send(JSON.stringify(products)); 
  })
  .catch(err => {
    console.log(err);
  });
}

exports.deleteUserDetail = (req, res, next) => {
  const prodId = req.params.productId;
  userDetail.findAll({where: {id: prodId}})
    .then(user => {
      return user[0].destroy();
    })
    .then(result => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
  
}

