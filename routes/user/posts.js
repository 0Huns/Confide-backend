const { getDB } = require('../../db');

const posts = async (req, res) => {
  try {
    const db = await getDB();
    const posts = await db.collection('post').aggregate([{ $sample: { size: 3 } }]).toArray();

    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).send({
        ok: false,
        message: 'No posts found',
      });
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send({
      ok: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = posts;
