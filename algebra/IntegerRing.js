class IntegerRing {
  addition() {
    return new InvertibleBinaryOperation();
  }
  multiplication() {
    return new BinaryOperationWithIdentity();
  }
}
IntegerRing.Z = new IntegerRing();
