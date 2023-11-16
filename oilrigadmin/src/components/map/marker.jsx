import { Icon } from "leaflet";

export const marker = new Icon({
    iconUrl: "./marker-icon.png",
    iconSize: [25, 41], // size of the icon
    shadowSize: [41, 41], // size of the shadow
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    shadowAnchor: [14, 41], // the same for the shadow
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});
