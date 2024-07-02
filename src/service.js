import axios from "axios";
import { config } from "../config";

export class Service {
    async getPoints() {
        let points = await axios.get(config.server_endpoint + '/points');
        return points.data;
    }

    async addPoint(point) {
        return await axios.post(config.server_endpoint + '/points', { ...point });
    }

    async savePoint(point) {
        return await axios.put(config.server_endpoint + '/points/' + point.id, { ...point });
    }

    async deletePoint(point) {
        return await axios.delete(config.server_endpoint + '/points/' + point.id);
    }
}