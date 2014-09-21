magic-square-34
===============

This repository holds the files for the [Albrech Dürer's Magic Square](http://zanel.la/lab/square34) website.

Probably the most interesting and reusable part of the code is the CombinationIterator class (js/CombinationIterator.js). It generates all ordered subsets from a set of n integers. For instance, the following code...

    var iterator = new CombinationIterator(6, 4);
    while (iterator.hasNext()) {
        console.log(iterator.getNext());
    }

... outputs all subsets of 4 elements from the set [0, 1, 2, 3, 4, 5]:

    [0, 1, 2, 3]
    [0, 1, 2, 4]
    [0, 1, 2, 5]
    [0, 1, 3, 4]
    [0, 1, 3, 5]
    [0, 1, 4, 5]
    [0, 2, 3, 4]
    [0, 2, 3, 5]
    [0, 2, 4, 5]
    [0, 3, 4, 5]
    [1, 2, 3, 4]
    [1, 2, 3, 5]
    [1, 2, 4, 5]
    [1, 3, 4, 5]
    [2, 3, 4, 5] 

The input parameters must both be larger than 0, and the first parameter can't be smaller than the second, otherwise an exception is thrown.

License
-------

[MIT](http://opensource.org/licenses/MIT) © [Carlos Zanella](http://zanel.la)
