# StoreHouse

StoreHouse is a low level library that provides a key-value cache with reference counting for thick client development. Useful for storing Backbone models to mitigate requests in a memory defensive way.

## Download

- [StoreHouse.js](http://raw.github.com/iammerrick/StoreHouse/master/build/StoreHouse.js)
- [StoreHouse.min.js](http://raw.github.com/iammerrick/StoreHouse/master/build/StoreHouse.min.js)

## Usage

StoreHouse is a library that can be used by calling it's constructor function or factory `of` method. Put objects into a particular StoreHouse instance using `set` and retrieve them by key using `get`. When you are finished with a value call `release`. This will decrement the retain count of that particular value, if the value's retain count is at zero the model will be garbage collected the next turn of the StoreHouse clean loop.

## Are you crazy? Why would I use this!?

One of the most prolific and effective techniques for a building a desktop class web application is declarative UI bindings. Meaning I describe how my UI represents my data, and then I only have to manage my data from there on out and the UI will synchronize itself. The trouble is when multiple developers are creating instances of the same model which is really an identical data entity, suddenly the in-sync UI grows terribly out of sync because events bound and fired on one instance of a model isn't reflected at all in the changes of the other model though they are supposed to represent the same data. Consequently the need for a model repository arises where I can ask for an instance of a model and it provides that instance, which may be the same instance someone else is using. That way when the change user name form updates a models name, and my profile card represents the same model our UI stays in sync. I can hear what you are thinking...

> "Ok, ok so maybe a repository of models would be useful for a thick client application but why in the world do we have all this wanna-be [autorelease pool] memory management stuff in a garbage collected environment?"

Truthfully in most applications you don't need to worry about all the memory management, you would be just fine if the repository or StoreHouse held on to it indefinitely. And, by all means, use StoreHouse like that, it is designed so that you don't have to care or even know about retain and release if your application doesn't need it but if you do need the ability to run a tighter ship you can. The benefit of having a cache that cleans itself on an interval is that you can significantly mitigate requests, so if you have an offline app that never gets a good refresh. The user will only be requesting a particular data entity when its not in the cache. Pretty neat, eh? Also crazy. Yes. I know. Crazy (awesome).

### constructor

```javascript
var instance = new StoreHouse();
```

You can optionally configure the default StoreHouse clean interval which is 15 minutes. Values in the StoreHouse that aren't being used won't stick around more than your configured cleanInterval in milliseconds.

```javascript
var instance = new StoreHouse({
  cleanInterval: (1000 * 60 * 5) // 5 Minutes
});
```

### of - Factory function

StoreHouse provides a factory method to create multiple managed StoreHouses for different types of values.

```javascript
var users = StoreHouse.of('users');
```

### set

set takes a key as the first argument and a value as the second. Set will automatically increment the retain count to 1.

```javascript
users.set('1', {
  id: 1,
  name: 'Merrick
});
```

### get

get takes a key and returns the stored value. This will increment the retain count by 1.

```javascript
users.get('1'); // Returns the Merrick Object from the set example
```

### retain

retain increments the retain count on a particular value, using get will do this for you.

```javascript
users.retain('1');
```

### release

release decrements the retain count of a particular value, you should call release when you are done with a particular value. When the retain count hits zero it will be garbage collected on the next round of the clean loop or when clean is called explicitly.

```javascript
users.release('1');
```

### retainCount

retainCount returns the current retainCount of a given value.

```javascript
users.retainCount('1');
```

### clean

clean will remove the reference the StoreHouse has to your value. Thus, if no one is using it, it will be garbage collected. Called on the cleanInterval.

```javascript
users.clean();
```

### dispose

dispose will remove the internal reference to a particular value thus removing it from the StoreHouse's loving care.

```javascript
users.dispose('1');
```

You can also pass dispose and array of keys.

```javascript
users.dispose(['1', '2', '5']); // Remove users 1, 2 & 5 from the StoreHouse
```

## Dependencies

Really, one could remove these dependencies quite easily but I can't imagine someone using this with something other than the Backbone.js model scenario. Please let me know if you have another interesting need that garbage collection itself isn't enough.

- [Backbone.js](http://backbonejs.org)
- [underscore.js](http://underscorejs.org)

## Build

`npm install && grunt build`

## Author

- Name: Merrick Christensen
- Twitter: [@iammerrick](http://twitter.com/iammerrick)

## License

Available via the MIT or new BSD license. Also, buy me a Diet Coke™ next time you see me if you want to.