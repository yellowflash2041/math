class BigRational {
  constructor$1(n) {
    this.num = n;
  }
  constructor$2(num, den) {
    this.num = num;
    this.den = den;
    if (this.den.equals(BigInteger.ZERO)) {
      throw new IllegalArgumentException("zero denominator");
    }
    let gcd = this.num.gcd(this.den);
    this.num = this.num.divide(gcd);
    this.den = this.den.divide(gcd);
    if (this.den.signum() < 0) {
      this.den = this.den.negate();
      this.num = this.num.negate();
    }
  }
  constructor(...args$) {
    switch (args$.length) {
      case 1:
        return this.constructor$1(...args$);
      case 2:
        return this.constructor$2(...args$);
    }
  }
  toString() {
    return this.num + "/" + this.den;
  }
  equals(o) {
    let r = o;
    return r.num.equals(this.num) && r.den.equals(this.den);
  }
  negate() {
    return new BigRational(this.num.negate(), this.den);
  }
  reciprocal() {
    if (this.num.equals(BigInteger.ZERO)) {
      throw new IllegalArgumentException("reciprocal of zero");
    }
    return new BigRational(this.den, this.num);
  }
  pow(exponent) {
    return new BigRational(this.num.pow(exponent), this.den.pow(exponent));
  }
  doubleValue() {
    let negative = this.num.signum() < 0;
    let d = (negative ? this.num.negate() : this.num).divideAndRemainder(
      this.den
    );
    let result = d[0].doubleValue();
    let r = d[1];
    if (!r.equals(BigInteger.ZERO)) {
      let bit = 1;
      for (;;) {
        bit /= 2;
        r = r.shiftLeft(1);
        if (r.compareTo(this.den) >= 0) {
          let was = result;
          result += bit;
          if (result === was) {
            break;
          }
          r = r.subtract(this.den);
          if (r.equals(BigInteger.ZERO)) {
            break;
          }
        }
      }
    }
    return negative ? -result : result;
  }
  compareTo(r) {
    return this.num.multiply(r.den).compareTo(r.num.multiply(this.den));
  }
}
BigRational.ZERO = new BigRational(0);
BigRational.ONE = new BigRational(1);
BigRational.sum = (r1, r2) => {
  return new BigRational(
    r1.num.multiply(r2.den).add(r1.den.multiply(r2.num)),
    r1.den.multiply(r2.den)
  );
};
BigRational.product = (r1, r2) => {
  return new BigRational(r1.num.multiply(r2.num), r1.den.multiply(r2.den));
};
