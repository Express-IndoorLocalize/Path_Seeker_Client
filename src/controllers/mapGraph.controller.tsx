import fs from 'fs';

interface MapGraph {
    projectId: string;
    // Define other properties as needed
}

const mapGraph: MapGraph[] = JSON.parse(
    fs.readFileSync('../assets/jsons/mapgraphs', 'utf8')
);

const getMapGraphById = async (projectID: string): Promise<MapGraph | undefined> => {
    try {
        const savedGraph = mapGraph.find(graph => graph.projectId === projectID);
        return savedGraph;
    } catch (err) {
        console.error(err);
    }
};

export { getMapGraphById };
