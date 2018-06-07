function makeIterator(arr) {
    var currentIndex = 0;
    return {
        next: function () {
            return currentIndex < arr.length ? { value: arr[currentIndex++], done: false } : { value: undefined, done: true };
        }
    }
}

var names=['zhangsan','lisi','wangwu'];

names.foo="foo"
console.log(names.length);