import { getAccessPointsByID } from '../controllers/accessPoint.controller';
import { getCalibrationPointsByID } from '../controllers/calibrationPoint.controllers';
import { rssNotReceived } from './constants';
import KNN_Model from 'ml-knn';

interface Signal {
    bssid: string;
    rss: number;
}

interface AccessPoint {
    bssid: string;
    // Add other properties as needed
}

interface CalibrationPoint {
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
        floor: number;
    };
    radioMap: Map<string, number>; // Assuming radioMap is a Map with BSSID as key and RSS as value
    // Add other properties as needed
}

interface LocationDistance {
    calibrationPointId: string;
    calibrationPointName: string;
    calibrationPointPosition: {
        x: number;
        y: number;
        floor: number;
    };
    distance: number;
}

interface Position {
    x: number;
    y: number;
    floor: number;
}

const calculatePosition = async (req: { projectId: string; received_signals: Signal[] }): Promise<Position | void> => {
    try {
        const projectId = req.projectId;
        const received_signals = req.received_signals;

        const accessPointList: any = getAccessPointsByID(projectId);
        const initiallyReceivedRSSValues: Map<string, number> = signalsToMap(received_signals);

        const receivedDatabaseRSSValues: Map<string, number> = new Map();
        let notReceivedCount = 0;

        accessPointList.forEach((accessPoint:any) => {
            if (!initiallyReceivedRSSValues.has(accessPoint.bssid)) {
                notReceivedCount++;
                receivedDatabaseRSSValues.set(accessPoint.bssid, rssNotReceived);
            } else {
                receivedDatabaseRSSValues.set(accessPoint.bssid, initiallyReceivedRSSValues.get(accessPoint.bssid)!);
            }
        });

        if (notReceivedCount === accessPointList.length) {
            console.error('No access point in database matches the received signals');
            return;
        } else {
            // const fingerPrint = await WKNN_algorithm(
            //     receivedDatabaseRSSValues,
            //     projectId
            // )
            const predictions = await ml_knn(receivedDatabaseRSSValues, projectId);
            const fingerPrint: Position = {
                x: predictions[0][0],
                y: predictions[0][1],
                floor: predictions[0][2],
            };
            console.log(fingerPrint);
            return fingerPrint;
        }
    } catch (err) {
        console.error(err);
        return;
    }
};

const signalsToMap = (receivedSignals: Signal[]): Map<string, number> => {
    const rssValueMap = new Map<string, number>();
    receivedSignals.forEach((signal) => {
        rssValueMap.set(signal.bssid, signal.rss);
    });
    return rssValueMap;
};

const calculateEuclideanDistance = (
    radioMap: Map<string, number>,
    receivedRSSValues: Map<string, number>
): number => {
    let finalDistance = 0;
    let tempValueOne: number;
    let tempValueTwo: number;
    let tempDistance: number;

    if (radioMap.size !== receivedRSSValues.size) {
        return Number.NEGATIVE_INFINITY;
    }

    try {
        radioMap.forEach((rss, bssid) => {
            tempValueOne = rss === rssNotReceived ? 0.0 : rss;
            tempValueTwo = receivedRSSValues.get(bssid)! === rssNotReceived ? 0.0 : receivedRSSValues.get(bssid)!;

            tempDistance = tempValueOne - tempValueTwo;
            tempDistance *= tempDistance;
            finalDistance += tempDistance;
        });
    } catch (e) {
        return Number.NEGATIVE_INFINITY;
    }
    return finalDistance * finalDistance;
};

const getFloorByValue = (floorVotingMap: Map<number, number>): number => {
    let floorWithHighestVote = Number.NEGATIVE_INFINITY;
    floorVotingMap.forEach((voteCount, floor) => {
        let tempVoteCount = -1;

        if (tempVoteCount === -1 || tempVoteCount < voteCount) {
            tempVoteCount = voteCount;
            floorWithHighestVote = floor;
        }
    });

    return floorWithHighestVote;
};

const calculateWeightedAverageKDistanceLocations = (locationDistances: LocationDistance[]): Position | void => {
    try {
        const k = 5;
        let locationWeight = 0.0;
        let sumWeights = 0.0;
        let weightedSumX = 0.0;
        let weightedSumY = 0.0;

        let floor: number;
        let x = 0.0;
        let y = 0.0;

        const kMin = k < locationDistances.length ? k : locationDistances.length;
        const floorVoting = new Map<number, number>();

        for (let i = 0; i < kMin; i++) {
            if (locationDistances[i].distance !== 0.0) {
                locationWeight = 1 / locationDistances[i].distance;
            } else {
                locationWeight = 100;
            }

            const locationDistanceCaliPointPos = locationDistances[i].calibrationPointPosition;

            x = locationDistanceCaliPointPos.x;
            y = locationDistanceCaliPointPos.y;

            if (floorVoting.has(locationDistanceCaliPointPos.floor)) {
                const oldValue = floorVoting.get(locationDistanceCaliPointPos.floor)!;
                floorVoting.set(locationDistanceCaliPointPos.floor, oldValue + 1);
            } else {
                floorVoting.set(locationDistanceCaliPointPos.floor, 1);
            }

            sumWeights += locationWeight;
            weightedSumX += locationWeight * x;
            weightedSumY += locationWeight * y;
        }

        weightedSumX /= sumWeights;
        weightedSumY /= sumWeights;
        floor = getFloorByValue(floorVoting);
        const positionToReturn: Position = {
            x: weightedSumX,
            y: weightedSumY,
            floor: floor,
        };
        return positionToReturn;
    } catch (err) {
        console.error(err);
        return;
    }
};

const WKNN_algorithm = async (
    receivedDatabaseRSSValues: Map<string, number>,
    projectId: string
): Promise<Position> => {
    const calibrationPointList: CalibrationPoint[] = await getCalibrationPointsByID(projectId);
    const locationDistanceResults: LocationDistance[] = [];

    try {
        calibrationPointList.forEach((calibrationPoint) => {
            const radioMap = calibrationPoint.radioMap;
            const currentDistance = calculateEuclideanDistance(radioMap, receivedDatabaseRSSValues);
            if (currentDistance === Number.NEGATIVE_INFINITY) {
                // CHECK THISSSSSSS
                throw new Error('Negative Infinity Distance Error');
            }
            const locationDistanceToAdd: LocationDistance = {
                calibrationPointId: calibrationPoint.id,
                calibrationPointName: calibrationPoint.name,
                calibrationPointPosition: calibrationPoint.position,
                distance: currentDistance,
            };
            locationDistanceResults.unshift(locationDistanceToAdd);
        });

        const sortedLocationDistances = locationDistanceResults.sort((d1, d2) => d1.distance - d2.distance);
        const calculatedPosition = calculateWeightedAverageKDistanceLocations(sortedLocationDistances);
        if (calculatedPosition) {
            return calculatedPosition;
        } else {
            throw new Error('Error calculating position');
        }
    } catch (err) {
        throw err;
    }
};

const ml_knn = async (receivedDatabaseRSSValues: Map<string, number>, projectId: string): Promise<number[][]> => {
    try {
        const calibrationPointList: CalibrationPoint[] = await getCalibrationPointsByID(projectId);
        const { signal_list, rssList, coordinateList } = await prepare_data(calibrationPointList, projectId, receivedDatabaseRSSValues);
        const KNN = new KNN_Model(rssList, coordinateList, { k: 3 });
        const predictions = KNN.predict(signal_list);
        return predictions;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const prepare_data = async (
    calibrationPoints: CalibrationPoint[],
    projectId: string,
    receivedSignals: Map<string, number>
): Promise<{ signal_list: number[][]; rssList: number[][]; coordinateList: number[][] }> => {
    const signal_list: number[][] = [[]];
    const rssList: number[][] = [];
    const coordinateList: number[][] = [];
    const accessPointList: AccessPoint[] = await getAccessPointsByID(projectId);

    calibrationPoints.forEach((cp) => {
        const temp_rss: number[] = [];
        const temp_coords: number[] = [];
        const radioMap = cp.radioMap;

        accessPointList.forEach((ap) => {
            const rss = radioMap.get(ap.bssid)!;
            temp_rss.push(rss);
        });

        temp_coords.push(cp.position.x);
        temp_coords.push(cp.position.y);
        temp_coords.push(cp.position.floor);

        rssList.push(temp_rss);
        coordinateList.push(temp_coords);
    });

    accessPointList.forEach((ap) => {
        signal_list[0].push(receivedSignals.get(ap.bssid)!);
    });

    return { signal_list, rssList, coordinateList };
};

export { calculatePosition };
