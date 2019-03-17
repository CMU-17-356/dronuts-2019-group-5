// a temporary component to test drone stuff

import * as React from 'react';
import { getAirbase, getDrone, sendDrone } from './helpers';
import { getAirbaseResponse, getDroneInfoResponse, IDrone } from '../models/drone';

export interface DroneControllerProps {

}

export interface DroneControllerState {
  ready: boolean;
  droneIds: string[];
  drones: {
    [key: string]: IDrone;
  };
  droneInFlight?: number;
}

export class DroneController extends React.Component<DroneControllerProps, DroneControllerState> {
  constructor(props: DroneControllerProps) {
    super(props);
    this.state = {
      ready: false,
      droneIds: [],
      drones: {},
      droneInFlight: undefined,
    };
  }

  async componentDidMount() {
    let response = await getAirbase();
    const airbase = getAirbaseResponse.validate(response);
    if (airbase.error) {
      console.log(airbase.error);
      return;
    }

    let drones: {[key: string]: IDrone} = {};
    for (let droneId of airbase.value.drones) {
      response = await getDrone(droneId);
      let drone = getDroneInfoResponse.validate(response);
      if (drone.error) {
        console.log(response);
        console.log(drone.error);
        continue;
      }

      drones[droneId] = drone.value;
    }

    this.setState((prevState) => ({
        ...prevState,
        ready: true,
        droneIds: airbase.value.drones,
        drones: drones,
        droneInFlight: this.startPolling(),
      })
    );
  }

  startPolling() {
    const poller = window.setInterval(this.checkDronesStatus.bind(this), 3000);
    console.log("Starting poller with ", poller);
    return poller;
  }

  async checkDronesStatus() {
    console.log("Logging on ", this.state.droneInFlight);
    let inFlight = false;

    let drones: {[key: string]: IDrone} = {};
    for (let droneId of this.state.droneIds) {
      let response = await getDrone(droneId);
      let drone = getDroneInfoResponse.validate(response);
      if (drone.error) {
        console.log(response);
        console.log(drone.error);
        continue;
      }

      drones[droneId] = drone.value;
      if (!inFlight &&
          drone.value.current_delivery &&
          drone.value.current_delivery.status == "in_route") {
        console.log("Still in flight: " + droneId);
        inFlight = true;
      }
    }

    if (!inFlight) {
      // no drones actively flying
      console.log("Stopping ", this.state.droneInFlight)
      window.clearInterval(this.state.droneInFlight);
      this.setState((prevState) => ({
        ...prevState,
        droneInFlight: undefined,
      }))
    }

    this.setState((prevState) => ({
        ...prevState,
        drones: drones,
      })
    );
  }

  render() {
    return (
      <div>This is a drone controller. <br />
      The drones I control are {this.state.droneIds.join(", ")}.
      {this.state.droneIds.map(this.renderDrone.bind(this))}
      </div>
    );
  }

  sendDrone(droneId: string) {
    // todo: read these from the state of the form
    const lat = 40.44394444;
    const lng = -79.94445;
    return async () => {
      const result = await sendDrone(droneId, lat, lng);
      if (!result.ok) {
        console.log(result);
      }
      this.setState((prevState) => ({
        ...prevState,
        droneInFlight: this.startPolling(),
      }));
      console.log(`Sent drone ${droneId}!`);
    };
  }

  renderDrone(droneId: string) {
    return (
      <div key={droneId}>
        {JSON.stringify(this.state.drones[droneId], null, 2)}
        <button onClick={this.sendDrone(droneId)}>Send me away!</button>
      </div>
    );
  }
}

export default DroneController;
