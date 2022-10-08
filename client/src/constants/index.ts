import * as env from 'env-var';

export const SERVER_IMAGES_URL = env.get('REACT_APP_SERVER_URL').asString() + '/images/';