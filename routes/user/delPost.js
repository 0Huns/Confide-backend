const { getDB } = require('../../db');
const { ObjectId } = require('mongodb');

const delPost = async (req, res) => {
  const postId = req.params;
  const objectId = new ObjectId(postId);
  const db = await getDB();
  const post = await db.collection('post').findOne({_id : objectId });

  if (post) {
    try{
      await db.collection('post').deleteOne({
        _id: objectId
      });

      return res.status(200).send({
        ok: true,
        message: 'Post delete successfully',
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
    message: 'Post not exist',
  });
};

module.exports = delPost;