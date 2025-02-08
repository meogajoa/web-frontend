import { Team } from '~/types/game';

export function isTeam(image: string | Team): image is Team {
  return Object.values(Team).includes(image as Team);
}
