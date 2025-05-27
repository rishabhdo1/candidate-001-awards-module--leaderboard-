export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Your existing logic
  const influencers = [
    { id: "INF_001", submissions: 10, votes: 50, referrals: 5 },
    { id: "INF_002", submissions: 5, votes: 30, referrals: 10 },
    { id: "INF_003", submissions: 8, votes: 25, referrals: 2 }
  ];

  const { period } = req.query;

  if (!period || period !== 'monthly') {
    return res.status(400).json({ error: "Only 'monthly' period is supported." });
  }

  const leaderboard = influencers.map(i => ({
    influencerId: i.id,
    points: i.submissions * 2 + i.votes * 1 + i.referrals * 3
  })).sort((a, b) => b.points - a.points);

  return res.status(200).json(leaderboard);
}
