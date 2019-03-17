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

export function getDrone(id: string) {
  const getDroneUrl = `http://drones.17-356.isri.cmu.edu/api/drones/${id}`;
  return getUrl(getDroneUrl);
}

export function getAirbase() {
  const airbaseName = 'group5';
  const getAirbaseUrl = `http://drones.17-356.isri.cmu.edu/api/airbases/${airbaseName}`;
  return getUrl(getAirbaseUrl);
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
