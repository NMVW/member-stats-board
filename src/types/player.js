export default function Player (player) {
  if (typeof player.winnings !== 'number') return [false, 'check winnings'];
  if (typeof player.name !== 'string') return [false, 'check name'];
  if (typeof player.country !== 'string') return [false, 'check country'];
  if (typeof player.profilePic !== 'string') return [false, 'check profilePic'];
  return [true];
}