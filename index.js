class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    let newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  createTree(ctx, node, x, y, radius) {
    if (node) {
      if (node.left) {
        let leftX = x - 2 * radius;
        let leftY = y + 2 * radius;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(leftX, leftY);
        ctx.stroke();
        this.createTree(ctx, node.left, leftX, leftY, radius);
      }

      if (node.right) {
        let rightX = x + 2 * radius;
        let rightY = y + 2 * radius;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(rightX, rightY);
        ctx.stroke();
        this.createTree(ctx, node.right, rightX, rightY, radius);
      }

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(node.value, x, y + radius / 2);
    }
  }
}

let tree = new BinarySearchTree();

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    let value = Math.floor(Math.random() * 201) - 100;
    tree.insert(value);
    let canvas = document.getElementById("tree");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tree.createTree(ctx, tree.root, canvas.width / 2, 50, 20);
  }
});
