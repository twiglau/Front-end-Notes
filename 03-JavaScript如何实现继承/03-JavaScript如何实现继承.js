/**
 * JavaScript中有个特殊的存在:
 * 对象,每个对象还都拥有一个原型对象,并可以从中继承方法和属性.
 * 
 * 提到对象和原型,是否有过这些疑惑:
 * > 1. JavaScript的函数怎么也是个对象?
 * > 2. __proto__和prototype到底是啥关系?
 * > 3. JavaScript中对象是怎么实现继承的?
 * > 4. JavaScript是怎么访问对象的方法和属性的?
 * 
 * 下面结合问题,来探讨下JavaScript对象的继承
 */


/**
 * 一,原型对象和对象是什么关系?
 * 在JavaScript中,对象由一组或多组的属性和值组成:
 * {
 *    key1:value1,
 *    key2:value2,
 *    key3:value3,
 * }
 * 在JavaScript中,对象的用途很是广泛,因为它的值即可以是原始类型(number,string,boolean,null,
 * undefined,bigint和symbol),还可以是对象和函数.
 * 
 * 不管是对象,还是函数和数组,它们都是Object的实例,也就是说在JavaScript中,除了原始类型以外,其余都是
 * 对象.
 * 这也就解答了疑惑1:
 * JavaScript的函数怎么也是个对象?
 * 在JavaScript中,函数也是一种特殊的对象,它同样拥有属性和值. 所有的函数会有一个特别的属性 prototype,
 * 该属性的值是一个对象,这个对象便是我们常说的"原型对象".
 * 
 * 我们可以在控制台打印一些属性:
 * function Person(name) {
 *    this.name = name;
 * }
 * console.log(Person.prototype);
 * 打印结果显示为:
 * 
 * 如图  03.1 示例图.
 * 
 * 可以看到,该原型对象有两个属性: constructor和__proto__.
 * 到这里,我们仿佛看到疑惑"2: __proto__ 和 prototype 到底是啥关系?" 的答案要出现了.
 * 在JavaScript中, __proto__ 属性指向对象的原型对象, 对于函数来说,它的原型对象便是
 * prototype. 函数的原型对象 prototype 有以下特点:
 * > 默认情况下,所有函数的原型对象(prototype)都拥有constructor属性,该属性指向与之关联
 *   的构造函数,在这里构造函数便是Person函数;
 * > Person函数的原型对象(prototype)同样拥有自己的原型对象,用__proto__属性表示.前面
 *   说过,函数是Object的实例,因此Person.prototype的原型对象为Object.prototype.
 * 
 * 我们可以用这样一张图来描述 prototype, __proto__ 和 constructor 三个属性的关系:
 * 
 * 如图 03.2 示例图.
 * 
 * 从这个图中,我们可以找到这样的关系:
 * > 在JavaScript中, __proto__ 属性指向对象的原型对象;
 * > 对于函数来说,每个函数都有一个prototype属性,该属性为该函数的原型对象.
 * > 在JavaScript中还可以通过prototype 和 __proto__ 实现继承
 */


/**
 * 二, 使用 prototype 和 proto 实现继承
 * 前面我们说过,对象之所以使用广泛,是因为对象的属性值可以为任意类型. 因此,属性的值同样可以为另
 * 外一个对象,这意味着JavaScript可以这么做: 通过将对象A的 __proto__ 属性赋值为对象B, 即 A.__proto__ = B,
 * 此时使用 A.__proto__ 便可以访问B的属性和方法.
 * 
 * 这样, JavaScript可以在两个对象之间创建一个关联,使得一个对象可以访问另一个对象的属性和方法,
 * 从而实现了继承,此时疑惑 "3. JavaScript中给对夏宁是怎么实现继承的?" 解答完毕.
 * 
 * 那么,JavaScript又是怎样使用prototype和__proto__实现继承的呢?
 * 
 * 继续以Person为例, 当我们使用 new Person() 创建对象时, JavaScript就会创建构造函数Person的实例,
 * 比如这里我们创建了一个叫 "Lily"的Person:
 * 
 * var lily = new Person("Lily");
 * 
 * 上述这段代码在运行时,JavaScript引擎通过将Person的原型对象prototype复制给实例对象lily的
 * __proto__属性,实现了Lily 对Person的继承, 即执行了以下代码:
 * 
 * // 实际上 JavaScript 引擎执行了以下代码
 * var lily = {};
 * lily.__proto__ = Person.prototype;
 * Person.call(lily,"Lily");
 * 
 * 我们来打印下lily实例:
 * 
 * 如图 03.3 示例图
 * 
 * 可以看到, lily 作为Person的实例对象,它的__proto__指向了Person的原型对象,即Person.prototype.
 * 这时,我们再补充一下上图中的关系:
 * 
 * 如图 03.4 示例图
 * 
 * 从这幅图中,我们可以清晰地看到构造函数和constructor属性,原型对象(prototype)和__proto__,实例对象
 * 之间的关系,这时很多初学者容易搞混淆的. 根据这张图,可以得到一下的关系:
 * > 1. 每个函数的原型对象 (Person.prototype) 都拥有constructor属性,指向该原型对象的构造函数(Person);
 * > 2. 使用构造函数(new Person())可以创建对象,创建的对象称为实例对象(lily);
 * > 3. 实例对象通过将__proto__属性指向构造函数的原型对象(Person.prototype),实现了该原型对象的继承.
 * 
 * 那么现在,关于疑惑2中 __proto__ 和 prototype 的关系,我们可以得到这样的答案:
 * > 每个对象都有__proto__属性来标识自己所继承的原型对象,但只有函数才有prototype属性;
 * > 对于函数来说,每个函数都有一个prototype属性,该属性为该函数的原型对象;
 * > 通过将实例对象的__proto__属性赋值为其构造函数的原型对象prototype,JavaScript可以使用构造函数
 *   创建对象的方式,来实现继承.
 * 
 * 现在我们知道,一个对象可通过__proto__访问原型对象上的属性和方法,而该原型同样也可通过__proto__访问它的
 * 原型对象,这样我们就在实例和原型之间构造了一条原型链. 这里我用红色的线将lily实例的原型链标了出来.
 * 
 * 如图 03.5 示例图
 * 
 * 下面一起来进行疑惑4 "JavaScript是怎么访问对象的方法和属性呢?" 的解答: 在JavaScript中,是通过遍历原型
 * 链的方式,来访问对象的方法和属性.
 */


/**
 * 三, 通过原型链访问对象的方法和属性
 * 当JavaScript试图访问一个对象的属性时,会基于原型链进行查找. 查找的过程是这样的:
 * > 首先会优先在该对象上搜寻. 如果找不到, 还会依次层层向上搜索该对象的原型对象,该对象的原型对象的原型对象等;
 * > JavaScript中的所有对象都来自Object, Object.prototype.__proto__ === null. null没有原型,并
 *   作为这个原型链中的最后一个环节;
 * > JavaScript会遍历访问对象的整个原型链,如果最终依然找不到,此时会认为该对象的属性值为undefined.
 * 
 * 我们可以通过一个具体的例子,来表示基于原型链的对象属性的访问过程,在该例子中我们构建了一条对象的原型链,并进行
 * 属性值的访问:
 * 
 * // 让我们假设我们有一个对象 o, 其有自己的属性 a 和 b:
 * var o = {a:1,b:2};
 * // o 的原型 o.__proto__ 有属性 b 和 c
 * o.__proto__ = {b:3,c:4};
 * //最后, o.__proto__.__proto__ 是 null.
 * //这就是原型链的末尾,即 null,
 * //根据定义,null 没有 __proto__.
 * //综上, 整个原型链如下:
 * {a:1,b:2} ---> {b:3,c:4} ---> null
 * //当我们在获取属性值的时候,就会触发原型链的查找:
 * console.log(o.a); // o.a => 1
 * console.log(o.b); // o.b => 2
 * console.log(o.c); // o.c => o.__proto__.c => 4
 * console.log(o.d); // o.c => o.__proto__.d => o.__proto__.__proto__ == null => undefined
 * 
 * 可以看到,当我们对对象进行属性值的获取时,会触发该对象的原型链查找过程.
 * 既然JavaScript中会通过遍历原型链来访问对象的属性,那么我们可以通过原型链的方式进行继承.
 * 
 * 也就是说,可以通过原型链去访问原型对象上的属性的方法,我们不需要在创建对象的时候给该对象重新赋值/添加方法.比如,
 * 我们调用lily.toString()时,JavaScript引擎会进行一下操作:
 * 
 * > 1. 先检查lily对象是否具有可用的toString()方法;
 * > 2. 如果没有,则检查lily的原型对象(Person.prototype)是否具有可用的toString()方法;
 * > 3. 如果也没有, 则检查Person()构造函数prototype属性所指向的对象的原型对象(即Object.prototype)
 *      是否有可用的toString()方法,于是该方法被调用.
 * 
 * 由于通过原型链的方式实现JavaScript继承,JavaScript中实现继承的方式还包括经典继承(盗用构造函数),组合继承,
 * 原型式继承,寄生式继承,等等.
 * 
 * > 原型链继承方式中引用类型的属性被所有实例共享,无法做到实例私有;
 * > 经典继承方式可以实现实例属性私有,但要求类型只能通过构造函数来定义;
 * > 组合继承融合原型链继承和构造函数的优点,它的实现如下:
 * 
 * function Parent(name) {
 *    //私有属性,不共享
 *    this.name = name;
 * }
 * 
 * //需要复用,共享的方法定义在父类原型上
 * Parent.prototype.speak = function() {
 *    console.log("hello");
 * };
 * 
 * function Child(name) {
 *    Parent.call(this,name)
 * }
 * 
 * //继承方法
 * Child.prototype = new Parent();
 * 
 * 组合继承模式通过将共享属性定义在父类原型上, 将私有属性通过构造函数赋值的方式,实现了按需共享对象和
 * 方法,是JavaScript中最常用的继承模式.
 * 
 * 虽然在继承的实现方式上有很多种,但实际上都离不开原型对象和原型链的内容,因此掌握__proto__ 和 prototype,
 * 对象的继承等这些知识,是我们实现各种继承方式的前提.
 */

/**
 * 小结
 * 关于JavaScript的原型和继承,常常会在我们面试题中出现. 随着ES6/ES7等语法糖的出现,我们在日常开发中
 * 可能更倾向于使用class/extends等语法来编写代码,原型继承等概念逐渐变淡.
 * 问题:
 * 1. JavaScript的函数和对象是怎样的关系?
 * 2. __proto__ 和 prototype 都表示原型对象,它们有什么区别?
 * 3. JavaScript中对象的继承和原型链是什么关系?
 */

/**
 * 1. 函数是一种特殊的对象,在对象内部属性拥有仅供JavaScript引擎读取的Call属性的对象称为函数,使用typeof
 *    检测时会被识别为function.
 * 2. proto 可以称为指针指向prototype,后者实质上也是对象.可以将proto比作链,prototype比作节点,以null
 *    为顶点链接起来形成原型链,当访问标识符是,实例没有则会去原型链上查找,找到则返回结果,直到顶端null没找到
 *     则返回 undefined.
 */