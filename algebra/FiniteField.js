class FiniteField {
  constructor(p = 0) {
    this.p = p;
    for (let i = 3; ; i += 2) {
      if (i * i > this.p) {
        if (this.p % 2 === 0 && this.p !== 2) {
          break;
        }
        return undefined;
      }
      if (this.p % i === 0 && this.p !== i) {
        break;
      }
    }
    throw new IllegalArgumentException(
      "only finite fields of prime order implemented"
    );
  }
  multiplication() {
    return new InvertibleBinaryOperation();
  }
  addition() {
    return new InvertibleBinaryOperation();
  }
  pow(x, n) {
    let product = 1;
    for (let bit = 1; bit <= n; bit <<= 1) {
      if ((n & bit) !== 0) {
        product *= x;
        product %= this.p;
      }
      x *= x;
      x %= this.p;
    }
    return product;
  }
}
