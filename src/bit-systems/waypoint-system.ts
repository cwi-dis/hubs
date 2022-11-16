import { defineQuery, hasComponent } from "bitecs";
import { HubsWorld } from "../app";
import { SceneRoot, Waypoint } from "../bit-components";
import { findAncestorWithComponent } from "../utils/bit-utils";

export enum WaypointFlags {
  canBeSpawnPoint = 1 << 0,
  canBeOccupied = 1 << 1,
  canBeClicked = 1 << 2,
  willDisableMotion = 1 << 3,
  willDisableTeleporting = 1 << 4,
  willMaintainInitialOrientation = 1 << 5,
  snapToNavMesh = 1 << 6
}

const waypointQuery = defineQuery([Waypoint]);
export function moveToSpawnPoint(world: HubsWorld) {
  const spawnPoints = waypointQuery(world).filter(eid => {
    return Waypoint.flags[eid] & WaypointFlags.canBeSpawnPoint && findAncestorWithComponent(world, SceneRoot, eid);
  });
  console.log("Moving to a spawn point...");
  console.log(spawnPoints);
}
