import { calibrationpoint } from '../assets/jsons/calibrationpoints';

interface CalibrationPoint {
    projectId: string;
    // Define other properties as needed
}



const getCalibrationPointsByID = async (projectID: string): Promise<CalibrationPoint[] | void> => {
    try {
        const filteredPoints = calibrationpoint.filter(point => point.projectId === projectID);
        return filteredPoints;
    } catch (err) {
        console.error(err);
    }
};

export { getCalibrationPointsByID };
