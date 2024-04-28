
import { accessPoints } from '../assets/jsons/accesspoints';

interface AccessPoint {
    projectId: string;
    // Define other properties as needed
}



const getAccessPointsByID = (projectID: string): AccessPoint[] | void => {
    try {
        const filteredPoints = accessPoints.filter(point => point.projectId === projectID);
        return filteredPoints;
    } catch (err) {
        console.error(err);
    }
};

export { getAccessPointsByID };
