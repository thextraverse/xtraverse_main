const { log } = console;
let nftData = {};

export default function teamAdd(req, res) {
  if (req.method === "POST") {
    nftData = req.body;
    res.json(nftData);
  }

  if (req.method === "GET") {
    res.json(nftData);
  }

  return res.status(500).json({
    msg: "this needs to be post request",
  });
}
