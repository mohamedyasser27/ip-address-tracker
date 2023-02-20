import markerpng from "../assets/marker-icon.png";
import shadowpng from "../assets/marker-shadow.png";

const markerIcon = L.icon({
  iconUrl: markerpng,
  shadowUrl: shadowpng,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  shadowAnchor: [12, 36],
});
export default markerIcon;
