interface Point {
    x: number;
    y: number;
}

interface Rectangle {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

export function findNearestCoordinates(x: number, y: number): Point {
    let nearestPoint: Point = { x: 0, y: 0 };

    const functionBoundaries: Rectangle = {
        minX: 127,
        minY: 70,
        maxX: 265,
        maxY: 645,
    };

    const allNearestX = [127,265];
    const allNearestY = [70,456,645];
    const allXDiff = [];
    const allYDiff = [];

    for(const i of allNearestX){
        allXDiff.push(Math.abs(x-i));
    }

    for(const i of allNearestY){
        allYDiff.push(Math.abs(y-i));
    }

    if( Math.min(...allYDiff) < Math.min(...allXDiff) ){
        nearestPoint.y = allNearestY[allYDiff.indexOf(Math.min(...allYDiff))];
        if(functionBoundaries.minX < x && x <functionBoundaries.maxX){
            nearestPoint.x = x;
        }else{
            if(functionBoundaries.minX > x ){
                nearestPoint.x = functionBoundaries.minX;
            }else{
                nearestPoint.x = functionBoundaries.maxX
            }
        }
    }else{
        nearestPoint.x = allNearestX[allXDiff.indexOf(Math.min(...allXDiff))];
        if( functionBoundaries.minY < y && y < functionBoundaries.maxY ){
            nearestPoint.y = y;
        }else{
            if(functionBoundaries.minY > y ){
                nearestPoint.y = functionBoundaries.minY;
            }else{
                nearestPoint.y = functionBoundaries.maxY;
            }
        }
    }

    return nearestPoint;
}

