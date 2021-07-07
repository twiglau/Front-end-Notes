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
  

