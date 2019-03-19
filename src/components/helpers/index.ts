import { getAirbaseResponse, getDroneInfoResponse, IDrone } from '../../models/drone';

export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}

export async function getUrl(url: string) {
  let promise = fetch(url);
  let response = await promise;
  let result = await response.json();
  return result;
}

export async function createTransaction(totalPrice: number) {
  const createTransactionUrl = 'http://credit.17-356.isri.cmu.edu/api/transactions'
  let promise = fetch(createTransactionUrl, {
    method: 'POST',
    body: `companyId=5&amount=${(totalPrice / 100).toFixed(2)}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  let response = await promise;
  let result = await response.json();
  return result;
}

export function getDonuts() {
  const getDonutUrl = '/api/donuts';
  return getUrl(getDonutUrl);
}

export function getOrders(time: number) {
  const getOrdersUrl = '/api/orders?time=' + time;
  return getUrl(getOrdersUrl);
}

export async function createOrder(orderObject: any) {
  const createTransactionUrl = '/api/orders'
  let promise = fetch(createTransactionUrl, {
    method: 'POST',
    body: JSON.stringify(orderObject),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let response = await promise;
  if (!response.ok) {
    console.log(response);
  }
  let result = await response.json();
  return result;
}

export function getDrone(id: string) {
  const getDroneUrl = `http://drones.17-356.isri.cmu.edu/api/drones/${id}`;
  return getUrl(getDroneUrl);
}

export function getAirbase() {
  const airbaseName = 'group5';
  const getAirbaseUrl = `http://drones.17-356.isri.cmu.edu/api/airbases/${airbaseName}`;
  return getUrl(getAirbaseUrl);
}

export async function getValidDroneId() {
  let response = await getAirbase();
  const airbase = getAirbaseResponse.validate(response);
  if (airbase.error) {
    console.log(airbase.error);
    return;
  }

  for (let droneId of airbase.value.drones) {
    response = await getDrone(droneId);
    let d = getDroneInfoResponse.validate(response);
    if (d.error) {
      continue;
    }

    let drone = d.value as IDrone;

    if (drone.current_delivery === null ||
        drone.current_delivery.status !== 'in_route') {
          return drone.id;
    }
  }

  return null;
}

export async function sendDrone(droneId: string, lat: number, lng: number) {
  const sendDroneUrl = `http://drones.17-356.isri.cmu.edu/api/drones/${droneId}/send`;
  let promise = fetch(sendDroneUrl, {
    method: 'PUT',
    body: `lat=${lat}&lon=${lng}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  let response = await promise;
  return response;
}
