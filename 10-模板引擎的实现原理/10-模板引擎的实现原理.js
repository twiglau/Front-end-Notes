/**
 * 为什么要使用前端框架
 * 一个工具被大多数人使用,称为热门,离不开相关技术发展的历史进程. 了解这些工具和框架出现的原因,可以即时掌握技术的而发展方向,保持对
 * 技术的敏感度,更新自身的认知,这些都会称为我们自身的竞争力.
 */

/**
 * 一,前端的飞速发展
 * ~~~~~
 */

/**
 * 二,前端框架的出现
 * 前面第8将中,我们知道了浏览器是如何渲染页面的. 从用户的角度来看,浏览器生成了最终的渲染树,并通过光栅化来将页面显示的屏幕上,页面渲染
 * 的工作就完成了.
 * 
 * 实际上,浏览器页面更多的不只是静态页面的渲染,还包括点击, 拖拽等事件操作以及接口请求,数据渲染到页面等动态的交互逻辑,因此我们还常常
 * 需要更新页面的内容.
 * 
 * 要理解前端框架问什么如此重要,需要先看看在框架出现前,前端开发是如何实现和用户进行交互的.
 * 
 * 这个过程跟上一讲事件驱动的内容很相似,以一个常见的表单提交作为例子,会包括编写静态页面,给对应的元素绑定对应的事件,事件触发时更新页面
 * 内容等步骤,这是最简单的页面交互.
 * 
 * 对于更新页面内容这个步骤,如果我们页面中有很多的内容需要更新,光拼接字符串我们可能就有一大堆代码.
 * 
 * 举个例子,抢答活动中常常会出现题目和多个答案进行选择,我们现在需要开发一个管理端,对这些抢答卡片进行管理. 假设一个问题会包括
 * 两个答案,我们可以通过新增卡片的方式来添加一套问答,编辑卡片的过程包括这些步骤.
 * 
 * 1. 新增一个卡片是,通过插入DOM节点的方式添加卡片样式.
 */
var index = 0;
// 用来新增一个卡片，卡片内需要填写一些内容
function addCard() {
    // 获取一个id为the-dom的元素
    var body = $("#the-dom");
    // 从该元素内获取class为the-class的元素
    var addDom = body.find(".the-class");
    // 在the-class元素前方插入一个div
    addDom.before('<div class="col-lg-4" data-index="' + index + '"></div>');
    // 同时保存下来该DOM节点，方便更新内容
    var theDom = body.find('[data-index="' + index + '"]');
    theDom.innerHTML(
        `<input type="text" class="form-control question" placeholder="你的问题">

            <input type="text" class="form-control option-a" placeholder="回答1">

            <input type="text" class="form-control option-b" placeholder="回答2">

            `
    );
    // 做完上面这堆之后index自增
    index++;
    return theDom;
}

//2. 卡片内编辑题目的答案时,会有字数限制(使用jQuery对输入框的输入事件进行监听,并限制输入内容)
// theDom使用上面代码保存下来的引用

// 问题绑定值

theDom
  .on("keyup", ".question", function (ev) {
    ev.target.value = ev.target.value.substr(0, 20);
  })
  // 答案a绑定值
  .on("keyup", ".option-a", function (ev) {
    ev.target.value = ev.target.value.substr(0, 10);
  })
  // 答案b绑定值
  .on("keyup", ".option-b", function (ev) {
    ev.target.value = ev.target.value.substr(0, 10);
  });

//3. 获取输入框内的内容(使用jQuery选择元素并获取内容),用于提交到后台.
// 获取卡片的输入值
// theDom 使用上面代码保存下来的引用
function getCardValue(index) {
    var body = $("#the-dom");
    var theDom = body.find('[data-index="' + index + '"]');
    var questionName = theDom.find(".question").val();
    var optionA = theDom.find(".option-a").val();
    var optionB = theDom.find(".option-b").val();
    return { questionName, optionA, optionB };
}
/**
 * 可以看到,仅仅实现一个问答卡片的编辑就需要编写不少的代码,大多数代码内容都是为了拼接
 * HTML内容,获取DOM节点,操作DOM节点.
 * 
 * 这些代码逻辑,如果我们使用Vue来实现,只需要这么写:
 */
`
<template>
  <div v-for="card in cards">
    <input
      type="text"
      class="form-control question"
      v-model="card.questionName"
      placeholder="你的问题"
    />
    <input
      type="text"
      class="form-control option-a"
      v-model="card.optionA"
      placeholder="回答1"
    />
    <input
      type="text"
      class="form-control option-b"
      v-model="card.optionB"
      placeholder="回答2"
    />
  </div>
</template>
<script>
  export default {
    name: "Cards",
    data() {
      return {
        cards: [],
      };
    },
    methods: {
      // 添加一个卡片
      addCard() {
        this.cards.push({
          questionName: "",
          optionA: "",
          optionB: "",
        });
      },
      // 获取卡片的输入值
      getCardValue(index) {
        return this.cards[index];
      },
    },
  };
</script>
`
/**
 * 可见,前端框架提供了便利的数据绑定,界面更新,事件监听等API,我们不需要再手动更新前端
 * 页面的内容,维护一大堆的HTML和变量拼接的动态内容了.
 * 
 * 使用前端框架对开发效率有很大的提升,同时也在一定程度上避免了代码可读性,可维护性等问题. 这
 * 也是为什么前端框架这么热门.
 * 
 * 那么,框架是怎么做到这些呢? 要实现这些能力,离不开其中的模板引擎.
 */

/**
 * 三, 前端框架的核心 --- 模板引擎
 * 当用户对页面进行操作,页面内容更新,我们需要实现的功能流程包括:
 * 
 * 1. 监听操作;
 * 2. 获取数据变量;
 * 3. 使用数据变量拼接成HTML模板;
 * 4. 将HTML内容赛到页面对应的地方;
 * 5. 将HTML片段内需要监听的点击事件进行绑定.
 * 
 * 可以看到,实现逻辑会比较复杂和繁琐.
 * 
 * 如果使用前端框架,我们可以:
 * > 使用将数据变量绑定到HTML模板的方式,来控制展示的内容;
 * > 配合一些条件判断,条件循环等逻辑,控制交互的具体逻辑;
 * > 通过改变数据变量,框架会自动更新页面内容.
 * 
 * 这样,可以快速高效地完成功能开发,代码的可读性和维护性远胜于纯手工实现.
 * 
 * 如果使用数据驱动的方式,还可以通过让逻辑与UI解耦的方式,提升代码的可维护性. 其中的数据绑定,事件绑定等
 * 功能,前端框架是依赖模板引擎的方式来实现的.
 * 
 * 以Vue为例子,对于开发者编写的Vue代码,Vue会将其进行以下处理从而渲染到页面中:
 * 1. 解析语法生成AST对象;
 * 2. 根据生成的AST对象,完成data数据初始化;
 * 3. 根据AST对象和data数据绑定情况,生成虚拟DOM对象;
 * 4. 将虚拟DOM对象生成真正的DOM元素插入到页面中,此时页面挥别渲染.
 * 
 * 模板引擎将模板语法进行解析,分别生成HTML DOM, 使用像HMTL拼接的方式(在对应的位置绑定变量,指令解析获取
 * 拼接逻辑等等),同时配合事件的管理,虚拟DOM的设计,可以最大化地提升页面的性能.
 * 
 * 这些便是模板引擎主要的工作,分别看一下.
 */

/**
 * 四, 解析语法生成AST对象
 * 抽象语法树(Abstract Syntax Tree)也称为AST语法树,指的是原地代码所对应的树状结构. 其实我们的DOM结构树,
 * 也是AST的一种,浏览器会对HTML DOM 进行语法解析,并生成最终的页面.
 * 
 * 生成AST的过程涉及编译器的原理,一般经过以下过程.
 * 
 * 1. 语法分析. 模板引擎需要在这个过程中识别出特定的语法, 比如 v-if/v-for这样的指令,或是<MyCustomComponent>
 * 这样的自定义DOM标签,还有@click/:props这样的简化绑定语法等.
 * 
 * 2. 语义分析. 这个过程会审查源程序有误语义错误,为代码生成阶段手机类型信息, 一般类型检查也会在这个过程中进行. 例如
 * 我们绑定了某个不存在的变量或者事件,又或者是使用了某个未定义的自定义组件等,都会在这个阶段进行报错提示.
 * 
 * 3. 生成AST对象.
 * 
 * 以Vue为例,生成AST的过程包括HTML模板解析,元素检查和预处理:
 */
/**
 *  将HTML编译成AST对象
 *  该代码片段基于Vue2.x版本
 */
 export function parse(
    template: string,
    options: CompilerOptions
  ): ASTElement | void {
    // 返回AST对象
    // 篇幅原因，一些前置定义省略
    // 此处开始解析HTML模板
    parseHTML(template, {
      expectHTML: options.expectHTML,
      isUnaryTag: options.isUnaryTag,
      shouldDecodeNewlines: options.shouldDecodeNewlines,
      start(tag, attrs, unary) {
        // 一些前置检查和设置、兼容处理此处省略
        // 此处定义了初始化的元素AST对象
        const element: ASTElement = {
          type: 1,
          tag,
          attrsList: attrs,
          attrsMap: makeAttrsMap(attrs),
          parent: currentParent,
          children: [],
        };
        // 检查元素标签是否合法（不是保留命名）
        if (isForbiddenTag(element) && !isServerRendering()) {
          element.forbidden = true;
          process.env.NODE_ENV !== "production" &&
            warn(
              "Templates should only be responsible for mapping the state to the " +
                "UI. Avoid placing tags with side-effects in your templates, such as " +
                `<${tag}>` +
                ", as they will not be parsed."
            );
        }
        // 执行一些前置的元素预处理
        for (let i = 0; i < preTransforms.length; i++) {
          preTransforms[i](element, options);
        }
        // 是否原生元素
        if (inVPre) {
          // 处理元素的一些属性
          processRawAttrs(element);
        } else {
          // 处理指令，此处包括v-for/v-if/v-once/key等等
          processFor(element);
          processIf(element);
          processOnce(element);
          processKey(element); // 删除结构属性
          // 确定这是否是一个简单的元素
          element.plain = !element.key && !attrs.length;
          // 处理ref/slot/component等属性
          processRef(element);
          processSlot(element);
          processComponent(element);
          for (let i = 0; i < transforms.length; i++) {
            transforms[i](element, options);
          }
          processAttrs(element);
        }
        // 后面还有一些父子节点等处理，此处省略
      },
      // 其他省略
    });
    return root;
  }

  //到这里,Vue将开发者的模板代码解析成AST对象,我们来看看这样的AST对象是怎样生成DOM元素的.

  /**
   * 五, AST对象生成DOM元素
   * 前面提到,在编译器解析和渲染过程中个,模板引擎会识别和解析模板语法语义,生成AST对象,最后根据
   * AST对象会生成最终的DOM元素.
   * 
   * 举个例子,我们写了这么一段HTML模板:
   */

`
<div>

  <a>123</a>

  <p>456<span>789</span></p>

</div>

`

//模板引擎可以在语法分析,语义分析等步骤后,得到这样一个AST对象:
thisDiv = {
    dom: {
      type: "dom",
      ele: "div",
      nodeIndex: 0,
      children: [
        {
          type: "dom",
          ele: "a",
          nodeIndex: 1,
          children: [{ type: "text", value: "123" }],
        },
        {
          type: "dom",
          ele: "p",
          nodeIndex: 2,
          children: [
            { type: "text", value: "456" },
            {
              type: "dom",
              ele: "span",
              nodeIndex: 3,
              children: [{ type: "text", value: "789" }],
            },
          ],
        },
      ],
    },
  };

  /**
   * 这个AST对象维护我们需要的一些信息,包括HTML元素里:
   * > 需要绑定哪些变量(变量更新的时候需要更新该节点内容);
   * > 是否有其他的逻辑需要处理(比如含有逻辑指令,如v-if,v-for等);
   * > 哪些节点绑定了事件监听事件(是否匹配一些常用的事件能力支持,如@click).
   * 
   * 模板引擎会根据AST对象生成最终的页面片段和逻辑,在这个过程中会通过添加特殊标识(例如元素ID,
   * 属性标记等)的方式来标记DOM节点,配合DOM元素选择方式,事件监听方式等,在需要更新的时候可快速
   * 定位到该DOM节点,并进行节点内容更新,从而实现页面内容的更新.
   * 
   * 目前来说,前端模板渲染的实现一般分为以下两种方式.
   * > 字符串模板方式: 使用拼接的方式生成DOM字符串,直接通过innerHTML()插入页面.
   * > 节点模板方式: 使用createElement() / appendChild() / textContent 等方法动态地插入
   * DOM 节点.
   * 
   * 在使用字符串模板的时候,我们将nodeIndex绑定在元素属性上,主要用于在数据更新时追寻节点进行内容更新.
   * 
   * 在使用节点模板的时候,我们可在创建节点时将该节点保存下来,直接用于数据更新:
   */
  // 假设这是一个生成 DOM 的过程，包括 innerHTML 和事件监听
function generateDOM(astObject) {
  const { dom, binding = [] } = astObject;
  // 生成DOM，这里假装当前节点是baseDom
  baseDom.innerHTML = getDOMString(dom);
  // 对于数据绑定的，来进行监听更新吧
  baseDom.addEventListener("data:change", (name, value) => {
    // 寻找匹配的数据绑定
    const obj = binding.find((x) => x.valueName == name);
    // 若找到值绑定的对应节点，则更新其值。
    if (obj) {
      baseDom.find(`[data-node-index="${obj.nodeIndex}"]`).innerHTML = value;
    }
  });
}
// 获取DOM字符串，这里简单拼成字符串
function getDOMString(domObj) {
  // 无效对象返回''
  if (!domObj) return "";
  const { type, children = [], nodeIndex, ele, value } = domObj;
  if (type == "dom") {
    // 若有子对象，递归返回生成的字符串拼接
    const childString = "";
    children.forEach((x) => {
      childString += getDOMString(x);
    });
    // dom对象，拼接生成对象字符串
    return `<${ele} data-node-index="${nodeIndex}">${childString}</${ele}>`;
  } else if (type == "text") {
    // 若为textNode，返回text的值
    return value;
  }
}

/**
 * 通过上面的方式,前端框架实现了将AST对象生成DOM元素,并将这些DOM元素渲染或更新到页面上.
 * 
 * 或许你会觉得疑惑: 原本就是一个<div>HTML模板,经过AST生成一个对象,最终还是生成一个<div>DOM节点,看起来
 * 好像挺多余的.
 * 
 * 实际上,在这个过程中,模板引擎可以实现更多功能.
 */

/**
 * 六, 模板引擎可以做更多
 * 将HTML模板解析成AST对象,再根据AST对象生成DOM节点,在这个过程中前端框架可以实现以下功能:
 * 
 * 1. 排除无效DOM元素(非自定义组件,也非默认组件的DOM元素),在构建阶段可及时发现并进行报错;
 * 
 * 2. 可识别出自定义组件,并渲染对应的组件;
 * 3. 可方便实现数据绑定,事件绑定等功能;
 * 4. 为虚拟DOM Diff 过程打下铺垫.
 * 5. HTML转义 (预防 XSS 漏洞).
 * 
 * 这里以第5点预防XSS漏洞为例子,详细介绍下模板引擎是如何避免XSS攻击的.
 */

/**
 * 七 预防 XSS 漏洞
 * 我们知道 XSS 的整个攻击过程大概为:
 * 1. 攻击者提交含有恶意代码的内容(比如 JavaScript脚本);
 * 2. 页面渲染的时候,这些内容未被过滤就被加载处理,比如获取Cookie,执行操作等.
 * 3. 其他用户在浏览页面的时候,就会在加载到恶意代码时受到攻击.
 * 
 * 要避免网站用户受到 XSS 攻击, 主要方法是将用那个用户提交的内容进行过滤处理. 大多数前端框架会自带
 * HTML转义功能,从而避免XSS的攻击.
 * 
 * 以Vue为例,使用默认的数据绑定方式(双大括号, v-bind等) 会进行HTML转义,将数据解释为普通文本,而非HTML
 * 代码.
 * 
 * 除此预防XSS漏洞之外,前端框架还做了一些性能,安全性等方面的优化,也提供了一些用于项目开发配套的工具,
 * 包括路由的管理, 状态和数据的管理等工具.
 */

/**
 * 小结
 * 了解前端矿建的出现,由于前端框架帮开发者解决了很多重复性的工作(拼接HTML模板,DOM元素查找,DOM元素事件监听等),
 * 极大地提升了开发者的效率,同时还提升了代码的可读性和可维护性,因此受到很多前端开发的追捧.
 * 
 * 除此之外,还介绍了前端框架中模板引擎的实现原理,包括解析语法生成AST对象,更具AST对象生成DOM元素,并对生成的
 * DOM元素进行标记,则可以在变量改变的时候,解析找到相应的DOM元素进行内容的更新.
 * 
 * 在了解这些内容之后,可以在页面渲染遇到性能问题的时候,根据所使用框架的具体实现,找到可能导致页面渲染卡顿或是不流畅
 * 的原因. 除此之外,在使用框架的过程中,遇到一些语法报错,XSS安全漏洞等为题的时候,也可以快速找到解决办法.
 */

