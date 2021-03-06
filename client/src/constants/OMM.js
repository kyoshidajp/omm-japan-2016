const MAP_KEY = 'AIzaSyDGaEAjurBciJPMrX7Hz5Cgdr2TsYYZqfs';
export const GOOGLE_MAP_API_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_KEY}`;

export const CENTER_POINT = {
  lat: 36.572807,
  lng: 137.861446,
};

export const START_POINT = {
  LABEL: 'start',
  DAY1: {
    lat: 36.600857,
    lng: 137.835387,
  },
  DAY2: {
    lat: 36.560606,
    lng: 137.872176,
  },
};

export const FINISH_POINT = {
  LABEL: 'finish',
  DAY1: {
    lat: 36.560606,
    lng: 137.872176,
  },
  DAY2: {
    lat: 36.598034,
    lng: 137.824866,
  },
};

export const SEARCH_TARGETS = {
  BIB: 'BIB',
  PLAYER: 'PLAYER',
};

export const SEARCH_PLACE_HOLDER = {
  BIB: 'Type a bib',
  PLAYER: 'Type a player name',
};

export const DAYS = {
  DAY1: { code: 1, value: 'DAY1' },
  DAY2: { code: 2, value: 'DAY2' },
};

export const MAP_TARGET_OPTION = {
  STROKE_OPACITY: 1.5,
  STROKE_WEIGHT: 13,
  Z_INDEX: 2,
};

export const MAP_UN_TARGET_OPTION = {
  STROKE_OPACITY: 1.0,
  STROKE_WEIGHT: 7,
  Z_INDEX: 1,
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const SORT_FIELDS = {
  RANK: 'rank',
};

export const SEARCH_LIMIT_PER_PAGE = 10;
