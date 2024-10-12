const { getDB } = require('../../db');
const { ObjectId } = require('mongodb');

const comment = async (req, res) => {
  const postId = req.body.postId;
  const objectId = new ObjectId(postId);
  const newComment = req.body.comment;
  const db = await getDB();
  const postCheck = await db.collection('post').findOne({_id : objectId });

  if (postCheck) {
    try{
      await db.collection('post').updateOne(
        {_id: objectId},
        {$push: {comments: newComment}},
      );

      return res.status(200).send({
        ok: true,
        message: 'Comment created successfully',
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

module.exports = comment;