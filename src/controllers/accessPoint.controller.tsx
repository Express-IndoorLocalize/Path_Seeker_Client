
import { accessPoints } from '../assets/jsons/accesspoints';

const getAccessPointsByID = (projectID: string): any[] => {
    const nullArray : any = []
    try {
        const filteredPoints = accessPoints.filter(point => point.projectId === projectID);
        return filteredPoints;
    } catch (err) {
        console.error(err);
    }
    return nullArray;
};

export { getAccessPointsByID };
