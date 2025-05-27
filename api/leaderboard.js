const influencers = [
  { id: "INF_001", submissions: 10, votes: 50, referrals: 5 },
  { id: "INF_002", submissions: 5, votes: 30, referrals: 10 },
  { id: "INF_003", submissions: 8, votes: 25, referrals: 2 }
];

router.get('/', (req, res) => {
  const { period } = req.query;

  if (!period || period !== 'monthly') {
    return res.status(400).json({ error: "Only 'monthly' period is supported." });
  }

  const leaderboard = influencers.map(i => ({
    influencerId: i.id,
    points: i.submissions * 2 + i.votes * 1 + i.referrals * 3
  })).sort((a, b) => b.points - a.points);

 res.status(200).json(leaderboard);
  console.log(`Leaderboard fetched for period: ${period}`);
  console.log('Leaderboard data:', leaderboard);
});
