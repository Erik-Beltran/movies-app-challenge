import {CastElement} from '../types/cast';

const mapCastFromApi = (actor: CastElement) => {
  return {
    ...actor,
    profile_path: actor.profile_path
      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
      : 'https://i.stack.imgur.com/l60Hf.png',
  };
};

export default mapCastFromApi;
