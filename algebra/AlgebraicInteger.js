class AlgebraicInteger {
  constructor(x = null) {
    this.x = x;
  }
  toString() {
    return "AlgebraicInteger [" + Arrays.toString(this.x) + "]";
  }
}
