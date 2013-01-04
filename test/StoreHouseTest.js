/*jshint expr:true */
describe('StoreHouse', function() {
  var instance;
  
  beforeEach(function() {
    instance = new StoreHouse();
  });
  
  describe('constructor', function() {
    it('should create a new object', function() {
      expect(new StoreHouse()).to.be.an('object');
    });
  });
  
  describe('set', function() {
    it('should set a value by key', function() {
      var val = 'value';
      instance.set('key', val);
      expect(instance.get('key')).to.equal(val);
    });
  
    it('should have a retain count of one', function() {
      var val = 'something';
      instance.set('key', val);
      expect(instance.retainCount('key')).to.equal(1);
    });
  });
  
  describe('get', function() {
    it('should increment the retain count each get', function() {
      var val = 'something';
      instance.set('key', val);
      instance.get('key');
      instance.get('key');
      expect(instance.retainCount('key')).to.equal(3);
    });
  });
  
  describe('release', function() {
    it('should decrement the retain count', function() {
      var val = 'something';
      instance.set('key', val);
      instance.release('key');
      expect(instance.retainCount('key')).to.equal(0);
    });
  });
  
  describe('retain', function() {
    it('should increment the retain count', function() {
      var val = 'something';
      instance.set('key', val);
      instance.retain('key');
      expect(instance.retainCount('key')).to.equal(2);
    });
  });
  
  describe('clean', function() {
    it('should clean all items from the StoreHouse with a retainCount of 0', function() {
      var val = 'something';
      instance.set('key', val);
      instance.release('key');
      instance.clean();
      expect(instance.get('key')).to.equal(undefined);
    });
    
    it('should clean all items from the StoreHouse with a retainCount less than 0', function() {
      var val = 'something';
      instance.set('key', val);
      instance.release('key');
      instance.release('key');
      instance.clean();
      expect(instance.get('key')).to.equal(undefined);
    });
  
    it('should clean only the items from the StoreHouse with a retainCount of 0', function() {
      var val = 'something';
      instance.set('key', val);
      instance.get('key');
      instance.set('hi', 'something');
      instance.release('hi');
      instance.release('key');
      instance.clean();
      expect(instance.get('key')).to.equal(val);
      expect(instance.get('hi')).to.equal(undefined);
    });
  });
  
  describe('of', function() {
    it('should return the same StoreHouse instance by key', function() {
      var users = StoreHouse.of('users');
  
      expect(users).to.equal(StoreHouse.of('users'));
    });
  
    it('should return a different StoreHouse instance with different key', function() {
      var users = StoreHouse.of('users');
  
      expect(users).to.not.equal(StoreHouse.of('kpis'));
    });
  });
});