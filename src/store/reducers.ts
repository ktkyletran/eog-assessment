import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as heartReducer } from '../Features/HeartBeat/reducer';
import { reducer as metricReducer } from '../Features/Metrics/reducer';
import { reducer as subReducer } from '../Features/Subscription/reducer';
import { reducer as mesReducer } from '../Features/Measurements/reducer';

export default {
  weather: weatherReducer,
  heartBeat: heartReducer,
  metrics: metricReducer,
  subscription: subReducer,
  measurements: mesReducer,
};
