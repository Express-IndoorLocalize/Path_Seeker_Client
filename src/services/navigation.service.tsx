import fs from 'fs';
import { getMapGraphById } from '../controllers/mapGraph.controller';

// Define types
interface NodeCoordinates {
    [key: string]: [number, number]; // Assuming coordinates are [x, y]
}

interface Graph {
    [key: string]: Array<[string, number]>; // Assuming graph is represented as { node: [[neighbor, weight]] }
}

// Read coordinates from JSON
const coordinates: NodeCoordinates = JSON.parse(
    fs.readFileSync('../assets/jsons/nodes.json', 'utf8')
);

// Heuristic function
const heuristic = (node: string, goal: string): number => {
    return 0; // Adjust heuristic calculation as needed
};

// Function to get coordinates
function getCoordinates(nodes: string[]): Array<[number, number]> {
    return nodes.map(node => coordinates[node]);
}

// A* search algorithm
function aStar(graph: Graph, start: string, goal: string): string[] | null {
    let closedSet = new Set<string>();
    let openSet = new Set<string>([start]);
    let cameFrom: { [key: string]: string } = {};
    let gScore: { [key: string]: number } = {};
    let fScore: { [key: string]: number } = {};

    Object.keys(graph).forEach(node => {
        gScore[node] = Infinity;
        fScore[node] = Infinity;
    });

    gScore[start] = 0;
    fScore[start] = heuristic(start, goal);

    while (openSet.size > 0) {
        let current: string | null = null;
        let minFScore = Infinity;

        // Find the node in openSet with the lowest fScore
        for (let node of openSet) {
            if (fScore[node] < minFScore) {
                minFScore = fScore[node];
                current = node;
            }
        }

        if (current === goal) {
            // Reconstruct path and return
            let path: string[] = [current];
            while (current !== start) {
                current = cameFrom[current];
                path.unshift(current);
            }
            return path;
        }

        openSet.delete(current);
        closedSet.add(current);

        for (let [neighbor, weight] of graph[current]) {
            if (closedSet.has(neighbor)) continue;

            let tentativeGScore = gScore[current] + weight;

            if (!openSet.has(neighbor)) {
                openSet.add(neighbor);
            } else if (tentativeGScore >= gScore[neighbor]) {
                continue; // This is not a better path
            }

            // This path is the best until now, record it!
            cameFrom[neighbor] = current;
            gScore[neighbor] = tentativeGScore;
            fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal);
        }
    }

    return null; // If there is no path
}

export async function getPath(projectId: string, start_point: string, goal: string): Promise<Array<[number, number]> | null>{
    try {
        const projectID = projectId;
        const start = start_point;
        const goal1 = goal;
        const graph = getMapGraphById(projectID);
        const graph_to_send = graph.graph;
        const path = aStar(graph_to_send, start, goal1);
        if (path) {
            const coordinatesToSend = getCoordinates(path);
            return coordinatesToSend;
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default {getPath};
