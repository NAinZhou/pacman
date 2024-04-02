//A* 算法
// AStar算法的一个简单实现
function AStarSearch(map, start, end) {
  var openList = [],
    closedList = [],
    path = [];
  var startNode = {
    x: start.x,
    y: start.y,
    g: 0,
    h: getHeuristic(start, end),
    f: 0,
    parent: null,
  };
  startNode.f = startNode.g + startNode.h;
  openList.push(startNode);

  while (openList.length > 0) {
    var lowIndex = 0;
    for (var i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowIndex].f) {
        lowIndex = i;
      }
    }
    var currentNode = openList.splice(lowIndex, 1)[0];
    if (currentNode.x == end.x && currentNode.y == end.y) {
      var curr = currentNode;
      while (curr.parent) {
        path.push({ x: curr.x, y: curr.y });
        curr = curr.parent;
      }
      return path.reverse();
    }
    closedList.push(currentNode);
    var neighbors = getNeighbors(map, currentNode);

    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (closedList.find((c) => c.x == neighbor.x && c.y == neighbor.y)) {
        continue;
      }
      var gScore = currentNode.g + 1; // 1 is the distance from a node to another
      var gScoreIsBest = false;

      if (!openList.find((c) => c.x == neighbor.x && c.y == neighbor.y)) {
        gScoreIsBest = true;
        neighbor.h = getHeuristic(neighbor, end);
        openList.push(neighbor);
      } else if (gScore < neighbor.g) {
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        neighbor.parent = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }

  return path;

  function getNeighbors(map, node) {
    var ret = [];
    var x = node.x,
      y = node.y;
    if (map[y - 1] && map[y - 1][x] == 0) {
      ret.push({ x: x, y: y - 1 });
    }
    if (map[y + 1] && map[y + 1][x] == 0) {
      ret.push({ x: x, y: y + 1 });
    }
    if (map[y][x - 1] && map[y][x - 1] == 0) {
      ret.push({ x: x - 1, y: y });
    }
    if (map[y][x + 1] && map[y][x + 1] == 0) {
      ret.push({ x: x + 1, y: y });
    }
    return ret;
  }

  function getHeuristic(pos0, pos1) {
    // This is the Manhattan distance
    var d1 = Math.abs(pos1.x - pos0.x);
    var d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
  }
}
