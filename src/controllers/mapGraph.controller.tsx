import { mapgraphs } from '../assets/jsons/mapgraphs';

interface MapGraph {
    projectId: string;
    // Define other properties as needed
}



const getMapGraphById = async (projectID: string): Promise<MapGraph | undefined> => {
    try {
        const savedGraph = mapgraphs.find(graph => graph.projectId === projectID);
        return savedGraph;
    } catch (err) {
        console.error(err);
    }
};

export { getMapGraphById };
