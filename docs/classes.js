// Class Declaration
class MyClass {
    constructor(param1, param2) {
      this.param1 = param1;
      this.param2 = param2;
    }
  
    // Methods
    method1() {
      // Method 1 code
    }
  
    method2() {
      // Method 2 code
    }
  
    // Static Method
    static staticMethod() {
      // Static method code
    }
  }
  
  // Class Expression
  const MyOtherClass = class {
    constructor(param1, param2) {
      this.param1 = param1;
      this.param2 = param2;
    }
  
    // Methods
    method1() {
      // Method 1 code
    }
  
    method2() {
      // Method 2 code
    }
  
    // Static Method
    static staticMethod() {
      // Static method code
    }
  };
  
  // Inheritance
  class ChildClass extends ParentClass {
    constructor(param1, param2, param3) {
      super(param1, param2); // Call the parent constructor
      this.param3 = param3;
    }
  
    // Override parent method
    method1() {
      // New implementation of method1
    }
  
    // Extend parent method
    method2() {
      super.method2(); // Call parent method
      // Additional code for method2
    }
  }
  
  // Getters and Setters
  class GetterSetterClass {
    constructor() {
      this._property = null; // Convention for private properties
    }
  
    get property() {
      return this._property;
    }
  
    set property(value) {
      this._property = value;
    }
  }
  
  // Public Fields
  class PublicFieldClass {
    publicField = 'public'; // Available in all instances
  }
  
  // Private Fields
  class PrivateFieldClass {
    #privateField = 'private'; // Available only inside the class
  }
  
  // Static Fields
  class StaticFieldClass {
    static staticField = 'static'; // Belongs to the class itself
  }
  
  // Extending Built-in Objects
  class CustomArray extends Array {
    constructor(...args) {
      super(...args);
    }
  
    // Custom methods or overrides
  }
  
  // Using instanceof to check instance of class
  const obj = new MyClass();
  console.log(obj instanceof MyClass); // true
  
  // Using static methods
  MyClass.staticMethod();
  
  // Using getters and setters
  const instance = new GetterSetterClass();
  instance.property = 'new value';
  console.log(instance.property); // 'new value'