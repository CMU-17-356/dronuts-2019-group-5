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

// export async function postUpdateStatus(id: string) {
//   const id 
//   const updateStatusUrl = '/api/orders/:orderID', ;

// }

// export async function updateStatus(id: string) {
//     console.log(this);
//     console.log('boo');
//     return () => { console.log(id); }
//     // const updateStatusURL = 'api/orders/:orderID';
//     // let promise = fetch(updateStatusURL, {
//     //    method: 'POST',
//     //    body: `companyId=5&amount=${(totalPrice / 100).toFixed(2)}`,
//     //   headers: {
//     //     "Content-Type": "application/x-www-form-urlencoded",
//     //   },
//     // });
// }



export function getDonuts() {
  const getDonutUrl = '/api/donuts';
  return getUrl(getDonutUrl);
}

export function getOrders(time: number) {
  const getOrdersUrl = '/api/orders?time=' + time;
  return getUrl(getOrdersUrl);
}
