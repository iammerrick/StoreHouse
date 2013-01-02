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