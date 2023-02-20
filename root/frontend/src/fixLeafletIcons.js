import L from "leaflet";
export function fixLeafletIcons() {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/node_modules/leaflet/dist/images/layers-2x.png",
    iconUrl: "/node_modules/leaflet/dist/images/marker-icon.png",
    shadowUrl: "/node_modules/leaflet/dist/images/marker-shadow.png",
  });
}
