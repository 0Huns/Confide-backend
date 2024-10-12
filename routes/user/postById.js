const { getDB } = require('../../db');
const { ObjectId } = require('mongodb');

const postById = async (req, res) => {
  const postId = req.params;
  const objectId = new ObjectId(postId);
  const db = await getDB();
  const post = await db.collection('post').findOne({_id : objectId });

  if (post) {
    res.status(200).json(post);
    return;
  }
  res.status(401).send({
    ok: false,
    message: 'post not exist',
  });
};

module.exports = postById;