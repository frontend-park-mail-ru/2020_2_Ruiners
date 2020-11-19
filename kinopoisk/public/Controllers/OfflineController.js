import OfflinePage from "../Views/OfflinePage/OfflinePage.js";
import {application} from "../config.js";

export default function Offline() {
    const page = new OfflinePage(application);
    page.render();
}