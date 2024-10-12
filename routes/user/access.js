const access = async (req, res) => {
  res.status(200).send({
    ok: true,
    message: 'Access OK'
  });
};

module.exports = access;