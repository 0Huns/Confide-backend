const { getDB } = require('../../db');

const newPost = async (req, res) => {
  const userId = req.id;
  const title = req.body.title;
  const content = req.body.content;
  const db = await getDB();
  const userCheck = await db.collection('users').findOne({_id : userId });

  if (userCheck) {
    try{
      await db.collection('post').insertOne({
        userId: userId,
        title: title,
        content: content,
      });

      return res.status(200).send({
        ok: true,
        message: 'Post created successfully',
      });
    }catch(err){
      res.status(500).send({
        ok: false,
        message: 'Internal server error',
      });
    }
  }
  res.status(401).send({
    ok: false,
    message: 'User not exist',
  });
};

module.exports = newPost;