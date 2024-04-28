import fs from 'fs';

interface CalibrationPoint {
    projectId: string;
    // Define other properties as needed
}

const calibrationPoint: CalibrationPoint[] = JSON.parse(
    fs.readFileSync('../assets/jsons/calibrationpoints', 'utf8')
);

const getCalibrationPointsByID = async (projectID: string): Promise<CalibrationPoint[] | void> => {
    try {
        const filteredPoints = calibrationPoint.filter(point => point.projectId === projectID);
        return filteredPoints;
    } catch (err) {
        console.error(err);
    }
};

export { getCalibrationPointsByID };
