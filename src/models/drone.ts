import * as Joi from 'joi'

/*
 * Definitions from the Drone API swagger.json
 */
export const GeoPoint = Joi.object().keys({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});

export const Airbase = Joi.object().keys({
  id: Joi.string().required(),
  location: GeoPoint.required(),
  drones: Joi.array().items(Joi.string()).required(), // array of drone IDs
});

export const Delivery = Joi.object().keys({
  delivery_id: Joi.string().required(),
  destination: GeoPoint.required(),
  status: Joi.string().valid('in route', 'insufficient charge', 'failed to land', 'success'),
  route: Joi.object().keys({
    time_start: Joi.date().iso(),
    time_arrive: Joi.date().iso(),
    time_return: Joi.date().iso(),
  }),
});

export const Drone = Joi.object().keys({
  id: Joi.number().required(),
  drone_name: Joi.string().required(),
  location: GeoPoint,
  current_delivery: Delivery,
  battery: Joi.object().keys({
    capacity: Joi.number(),
    charge: Joi.number(),
  })
});

/*
 * Definitions in terms of Dronuts use of them
 */
export const getAirbaseRequest = Joi.string();
export const getAirbaseResponse = Airbase;

export const getDroneInfoRequest = Joi.string();
export const getDroneInfoResponse = Drone;

export const sendDroneRequest = Joi.object().keys({
  id: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});
export const sendDroneResponse = Joi.any().valid(null); // Should be a 204 No Content on success
