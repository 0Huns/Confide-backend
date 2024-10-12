const { getDB } = require('../../db');

const profile = async (req, res) => {
  const userId = req.id;
  const db = await getDB();
  const userCheck = await db.collection('users').findOne({_id : userId });
  const userPost = await db.collection('post').find({userId : userId}).toArray();

  if (userCheck) {
    if(userPost.length > 0){
      res.status(200).json(userPost);
      return;
    }else{
      res.status(200).send({
        ok: true,
        message: 'user post is not exist'
      });
      return;
    }
  }
  res.status(404).send({
    ok: false,
    message: 'user not exist',
  });
};

module.exports = profile;