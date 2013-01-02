(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone'], factory);
    } else {
        // Browser globals
        root.StoreHouse = factory(_, Backbone);
    }
}(this, function (_, Backbone) {
    //= StoreHouse.js
    return StoreHouse;
}));