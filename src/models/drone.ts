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
  drones: Joi.array().items(Joi.number()).required(), // array of drone IDs
});

export const Delivery = Joi.object().keys({
  delivery_id: Joi.string(),
  destination: GeoPoint.required(),
  status: Joi.string().valid('in_route', 'insufficient_charge', 'failed_to_land', 'success'),
  route: Joi.object().keys({
    time_start: Joi.date().iso().allow(null),
    time_arrive: Joi.date().iso().allow(null),
    time_return: Joi.date().iso().allow(null),
  }),
});

export const Drone = Joi.object().keys({
  id: Joi.number().required(),
  drone_name: Joi.string().required(),
  location: GeoPoint,
  current_delivery: Delivery.allow(null),
  battery: Joi.object().keys({
    capacity: Joi.number(),
    charge: Joi.number(),
  })
});

// Todo: automagically generate TS interfaces from Joi
export interface IGeoPoint {
  lat: number;
  lng: number;
}

export interface IDelivery{
  delivery_id: string;
  destination: IGeoPoint;
  status: string;
  route: {
    time_start: string;
    time_arrive: string;
    time_return: string;
  };
}

export interface IDrone {
  id: number;
  drone_name: string;
  location: IGeoPoint;
  current_delivery: IDelivery;
  battery?: {
    capacity: number;
    charge: number;
  }
}

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
