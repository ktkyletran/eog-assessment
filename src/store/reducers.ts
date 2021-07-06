import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as heartReducer } from '../Features/HeartBeat/reducer';

export default {
  weather: weatherReducer,
  heartBeat: heartReducer,
};
