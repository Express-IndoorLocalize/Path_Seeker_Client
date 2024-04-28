import fs from 'fs';

interface AccessPoint {
    projectId: string;
    // Define other properties as needed
}

const accessPoint: AccessPoint[] = JSON.parse(
    fs.readFileSync('../assets/jsons/accesspoints', 'utf8')
);

const getAccessPointsByID = (projectID: string): AccessPoint[] | void => {
    try {
        const filteredPoints = accessPoint.filter(point => point.projectId === projectID);
        return filteredPoints;
    } catch (err) {
        console.error(err);
    }
};

export { getAccessPointsByID };
