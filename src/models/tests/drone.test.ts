import {
  getAirbaseRequest,
  getAirbaseResponse,
  getDroneInfoRequest,
  getDroneInfoResponse,
  sendDroneRequest,
  sendDroneResponse,
} from '../drone';
import clone from 'clone';


/*
 * Airbase
 */
test('getAirbaseRequest allows a correct airbase request', () => {
  const request = '1';
  expect(getAirbaseRequest.validate(request).error).toBeNull();
});

test('getAirbaseRequest rejects an empty airbase request', () => {
  const request = '';

  const result = getAirbaseRequest.validate(request);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
});

const correctAirbase = {
  // from the Swagger explorer
  "id": "string",
  "location": {
    "lat": 0,
    "lng": 0
  },
  "drones": [
    0
  ]
}

test('getAirbaseResponse allows a correct airbase object', () => {
  const airbase = clone(correctAirbase);
  expect(getAirbaseResponse.validate(airbase).error).toBeNull();
})

/*
 * getDroneInfo
 */
test('getDroneInfoRequest allows a correct drone request', () => {
  const request = '1';
  expect(getDroneInfoRequest.validate(request).error).toBeNull();
});

test('getDroneInfoRequest rejects an empty drone request', () => {
  const request = '';

  const result = getDroneInfoRequest.validate(request);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
});

const correctDrone = {
  // from the Swagger explorer
  "id": 0,
  "drone_name": "string",
  "location": {
    "lat": 0,
    "lng": 0
  },
  "current_delivery": {
    "delivery_id": "string",
    "destination": {
      "lat": 0,
      "lng": 0
    },
    "status": "in_route",
    "route": {
      "time_start": "2019-02-12T22:11:46.051Z",
      "time_arrive": "2019-02-12T22:11:46.051Z",
      "time_return": "2019-02-12T22:11:46.051Z"
    }
  },
  "battery": {
    "capacity": 0,
    "charge": 0
  }
}

test('getDroneInfoResponse allows a correct drone object', () => {
  const drone = clone(correctDrone);
  expect(getDroneInfoResponse.validate(drone).error).toBeNull();
})

test('getDroneInfoResponse rejects non-enum in drone delivery status', () => {
  const drone = clone(correctDrone);
  drone.current_delivery.status = 'gone forever';

  const result = getDroneInfoResponse.validate(drone);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})

/*
 * sendDrone
 */
const correctSendDroneRequest = {
  id: '1',
  lat: 0,
  lng: 0,
};

test('sendDroneRequest allows a correct request object', () => {
  const request = clone(correctSendDroneRequest);
  expect(sendDroneRequest.validate(request).error).toBeNull();
})

test('sendDroneResponse allows a correct response object', () => {
  const response = null;
  expect(sendDroneResponse.validate(response).error).toBeNull();
})

test('sendDroneResponse rejects a non-null response object', () => {
  const response = true;

  const result = sendDroneResponse.validate(response);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})
