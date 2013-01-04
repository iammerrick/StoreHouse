(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone'], factory);
    } else {
        // Browser globals
        root.StoreHouse = factory(_, Backbone);
    }
}(this, function (_, Backbone) {
    var Class = function(options) {
      this._configure(options || {});
      this.initialize.apply(this, arguments);
    };
    
    _.extend(Class.prototype, Backbone.Events, {
      initialize: function(){},
      
      _configure: function(options) {
        if (this.options) {
          options = _.extend({}, this.options, options);
        }
        
        this.options = options;
      }
    });
    
    // Borrow Backbone's extend functionality.
    Class.extend = Backbone.Model.extend;
    
    var StoreHouseInstances = {};
    
    var StoreHouse = Class.extend({
      
      options: {
        cleanInterval: (1000 * 60 * 15) // Fifteen minutes
      },
      
      initialize: function () {
        this.store = {};
        this.startCleanLoop();
      },
      
      get: function(key) {
        
        // If it's not in the store return undefined
        if ( ! this.store[key]) {
          return undefined;
        }
        
        this.retain(key);
        
        return this.store[key].value;
      },
      
      set: function(key, value) {
        this.store[key] = {
          value: value,
          retainCount: 1
        };
        return this;
      },
      
      retain: function(key) {
        ++this.store[key].retainCount;
        return this;
      },
      
      release: function(key) {
        --this.store[key].retainCount;
        return this;
      },
      
      retainCount: function(key) {
        return this.store[key].retainCount;
      },
      
      clean: function() {
        var removeKeys = _.map(this.store, function(value, key) {
          if (value.retainCount <= 0) {
            return key;
          }
        });
        
        this.dispose(removeKeys);
        
        return this;
      },
      
      dispose: function(keys) {
        
        if ( ! _.isArray(keys)){
          keys = [keys];
        }
    
        _.each(keys, function(key) {
          this.store[key] = undefined;
          delete this.store[key];
        }, this);
        
        return this;
      },
      
      startCleanLoop: function() {
        var context = this;
        
        setTimeout(function() {
          context
            .clean()
            .startCleanLoop();
            
        }, this.options.cleanInterval);
      }
    }, {
      of: function(key) {
        if ( ! StoreHouseInstances[key]) {
          StoreHouseInstances[key] = new StoreHouse();
        }
        
        return StoreHouseInstances[key];
      }
    });
    return StoreHouse;
}));