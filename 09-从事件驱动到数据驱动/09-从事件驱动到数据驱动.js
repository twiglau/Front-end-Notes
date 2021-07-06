/**
 * 事件驱动和数据驱动两种编码思维模式.
 */

/**
 * 一, 事件驱动
 * 什么是事件驱动的编程方式?
 * 前端开发在实现功能的时候,会更倾向于使用事件驱动,这是因为受到JavaScript语言的设计和使用
 * 场景的影响.
 * 
 * 作为浏览器脚本语言, JavaScript的主要用途是与用户互动,操作DOM,实现页面UI和交互操作,属于
 * GUI(图形用户界面)编程. 而GUI则是基于事件I/O模式的编程方式.
 */

/**
 * 二, GUI与事件
 * GUI应用程序注重与用户的交互,大部分的程序执行需要等到用户的交互动作发生之后,所以GUI程序的
 * 执行取决于与用户的实时交互情况.
 * 
 * 然而,用户在访问程序期间,与程序进行交互的频率并不高. 若不停轮询获取用户输入(类似HTTP短轮询),
 * 不仅资源利用率低,还无法做到真正的同步. 因此, GUI 程序会将执行流程交由用户控制,当用户触发
 * 事件的时候进行响应,调用预先绑定好的代码来对事件进行处理.
 * 
 * 在写代码实现页面功能的时候,思路常常是这样的:
 * >1. 编写静态页面(HTML和样式);
 * >2. 在特定的元素上添加事件监听,监听用户交互(点击,输入,拖拽)等事件;
 * >3. 将事件绑定到对应的函数和处理逻辑,比如获取用户输入/应用状态,计算并更新状态等;
 * >4. 根据计算后的数据状态,更新相应的页面元素.
 * 
 * 通俗地说,事件驱动思维是从事件响应出发,来完成应用的设计和编程. 这种编程方式实现起来即简单有清晰,
 * 所以很多开发者会选择(或是下意识地) 使用事件驱动方式来写代码.
 * 
 * 我们来看看基于事件驱动的编程流程是怎样的.
 */

/**
 * 三, 事件驱动的编码流程
 * 这里我们以实现一个提交表单的页面作为例子,如果用事件驱动的方式来实现,大致分为三个步骤.
 * 
 * 第一步:编写惊天页面.
 */
`    <!-- 实现静态页面 -->

    <form>
    
    Name:
    
    <p id="name-value"></p>
    
    <input type="text" name="name" id="name-input" />
    
    Email:
    
    <p id="email-value"></p>
    
    <input type="email" name="email" id="email-input" />
    
    <input type="submit" />
    
    </form>
 `   

 //第二步: 给对应的元素绑定对应的事件,例如通过 addEventListener来监听input输入框的输入事件.

` var nameInputEl = document.getElementById("name-input");

var emailInputEl = document.getElementById("email-input");

// 监听输入事件，此时 updateValue 函数未定义

nameInputEl.addEventListener("input", updateNameValue);

emailInputEl.addEventListener("input", updateEmailValue);
`

//第三步: 事件触发时,进行相关逻辑的处理(发起请求,更新页面内容等),并更新页面内容.我们将用户
//输入的内容更新到页面中展示.

`var nameValueEl = document.getElementById("name-value");

var emailValueEl = document.getElementById("email-value");

// 定义 updateValue 函数，用来更新页面内容

function updateNameValue(e) {

  nameValueEl.innerText = e.srcElement.value;

}

function updateEmailValue(e) {

  emailValueEl.innerText = e.srcElement.value;

}
`

//上述的三个步骤,便是基于事件驱动的思维实现的,是前端页面开发中很常见的编程思路. 即使使用
//了前端框架(这里以Vue为例), 也很容易用事件驱动的方式来实现上述功能:

`
<template>

  <!-- 1. 绘制 HTML -->

  <div>

    Name:

    <p>{{ name }}</p>

    <!-- 2. 使用 v-on 绑定事件，这里绑定 updateValue 方法 -->

    <input type="text" v-bind:value="name" v-on:input="updateValue" />

    <!-- 上面 input 可以简写为： -->

    <input type="text" v-model="name" />

  </div>

</template>

<script>

  export default {

    data() {

      return {

        name: "",

      };

    },

    methods: {

      // 3. change 事件触发时，更新数据

      updateValue(event) {

        this.name = event.target.value;

      },

    },

  };

</script>
`
/**
 * 这里可以看出,使用前端框架帮我们省去了元素选择, HTML拼接并更新等这些工作,同时还可以直接
 * 在模板上绑定事件监听. 至于前端框架是如何做到这些的,我们会在下一讲详细介绍.
 * 现在,来回顾下事件驱动的编程思路:
 * 1. 开发静态页面;
 * 2. 在对应的元素上绑定事件;
 * 3. 实现被绑定的事件功能,例如获取数据,更新页面等.
 * 
 * 代码实现思路的关注点在于
 * 触发了怎样的操作和这个操作会导致什么后果(即小做怎样的处理).
 * 因此事件驱动的思维方式会围绕着 "操作" 和 "响应" 进行.
 */


/**
 * 四,数据驱动
 * 使用数据驱动的前提,在于将页面内容抽象为数据表达. 基于抽象后的数据,这些数据会发生怎样的变化,又是
 * 如何被改变的,这些便是数据驱动的关注点.
 * 
 * 使用数据驱动的前提,在于将页面内容抽象为数据表达. 基于抽象后的数据,这些数据会发生怎样的变化,又是如何
 * 被改变的,这些便是数据驱动的关注点.
 * 
 * 数据驱动和时间驱动的最大差异是开发的视角.
 * >事件驱动会关注于 "操作" 和 "响应",基于流程实现编码.
 * >数据驱动则会关注于"数据"和"数据的变化",基于状态实现编码.
 * 
 * 下面我们同样以实现一个提交表单的页面为例,介绍数据驱动的编码流程.
 */

/**
 * 五, 数据驱动的编码流程
 * 对于提交表单的页面实现,数据驱动的编程方式同样可以分成三个步骤.
 * 
 * 第一步: 对页面进行抽象设计,使用合适的数据结构来表达.
 * 抽象设计的内容会在第14,15将内容中介绍,在这里我们先使用最简单的方式来设计: 将页面中会变化和不会变化的内容
 * 隔离开,对其中会变化的内容进行抽象,再根据结构来设计数据结构.
 * 
 * 以页面中的表单为例,变化的部分包括两个输入框,两处展示输入框内容的文字. 其中,输入框和展示部分关联着相同的内容,
 * 因此我们可以使用同一个数据来表达.
 */

`
// 包括一个 name 和 一个 email 的值

export default {

  data() {

    return {

      name: "",

      email: "",

    };

  },

};
`

//通过这样的方式,我们得到了两个抽象后的数据,一个是名字name,另外一个是邮件email,它们都是字符串格式.

//第二步: 这个表单除了具备name和email两个数据,还包括两个分别用于改变数据的方法.因此,我们给该表单添加上更新值的方法:

`
export default {

    data() {
  
      return {
  
        name: "",
  
        email: "",
  
      };
  
    },
  
    methods: {
  
      // 更新 name 值
  
      updateNameValue(newName) {
  
        this.name = newName;
  
      },
  
      // 更新 email 值
  
      updateEmailValue(newEmail) {
  
        this.email = newEmail;
  
      },
  
    },
  
  };
  
`
//第三步: 实现静态页面,并把数据和事件绑定到页面中. 我们将步骤1中的数据板顶到页面中的输入框和展示值的地方,
//同时在需要监听事件的元素上绑定上述的方法.

`
<form>

  Name:

  <p>{{ name }}</p>

  <input

    type="text"

    name="name"

    v-bind:value="name"

    v-on:input="updateNameValue($event.target.value)"

  />

  Email:

  <p>{{ email }}</p>

  <input

    type="email"

    name="email"

    v-bind:value="email"

    v-on:input="updateEmailValue($event.target.value)"

  />

  <input type="submit" />

</form>
`
//如果说步骤1和步骤2分别是抽象数据和抽象逻辑的过程,那么步骤3则是将抽象数据的逻辑具现化的过程.
//通过将抽象的逻辑具现化,我们最终将抽象的结果实现为应用的功能,这就是数据驱动的实现过程.

/**
 * 五,数据驱动和事件驱动的区别
 * 1. 数据驱动更容易将试图与逻辑解绑,能快速适应变更和调整.
 * 对于数据驱动,我们在编程实现的过程中,更多的是思考数据状态的维护和处理,而无需过于考虑UI的变化和
 * 事件的监听. 即使我们页面UI全部重构了,影响到的只有模板中绑定的部分(即上面的第3个步骤),功能逻辑
 * 并不会受到影响.
 * 
 * 简单来说,基于数据模型设计的代码,即使经历了需要变更,页面结构调整,服务器接口调整,也可以快速地实现更新和支持.
 * 
 * 2. 事件驱动更倾向于流程式开发,数据驱动倾向于数据装填的变更和流动
 * 事件驱动的特点是,以某个交互操作为起点,流程是地处理逻辑. 流程式代码,在遇到中间某个环境变更,就需要同时
 * 更新该变更点前后环节的流程交接.
 * 
 * 例如,对于页面加载渲染的过程,可以分成 加载页面逻辑 -> 请求服务器 -> 更新页面. 如果需要在从服务器获取的
 * 基础上,新增读取本地缓存的环节,同时需要在 加载页面逻辑, 更新页面 两个环节进行衔接,并发地支持 读取本地缓存 和 请求服务器.
 * 
 * 而数据驱动的思考方式特点是, 以数据为中心, 思考数据的输入和输出.
 * 
 * > 数据来源: 比如从服务器获取,用户输入,重置清空.
 * > 数据去处: 比如提交给服务器.
 * 
 * 同样的,如果我们需新增 读取本地缓存 的环节, 在数据驱动的情况下, 只是增加了一个数据来源,对于整个模型影响会小很多.
 * > 数据来源: 从服务器获取, 用户输入, 重置清空, 读取本地缓存
 * 
 * 事件驱动和数据驱动一个很重要的区别在于:
 * 
 * 事件驱动是从每个事件的触发("操作")为中心来设计我们的代码,数据驱动则是以数据为中心, 通过接受事件触发和更新数据状态
 * 的方式来实现页面功能.
 * 
 * 从事件驱动到数据驱动,可以理解为从用户交互为中心,调整成以数据的状态扭转为中心,来进行一些页面逻辑的实现.
 * 
 * 事件驱动的方式相比于数据驱动,少了数据抽象设计的一部分,因此开发的时候可能很快就完成某个功能的实现,但从维护和扩展的角度来说,
 * 习惯数据驱动的方式,在遇到功能变更和迭代时可以更高效,更合理地进行调整.
 */

/**
 * 小结
 * 浏览器属于GUI编程,我们在开发过程中常常基于"事件"和"响应"的方式来理解功能,因此大多数会倾向于使用事件驱动的方式.
 * 
 * 相比于事件驱动,数据驱动更倾向于以 "数据" 为中心, 通过将页面抽象为数据表达,用数据状态变更的方式来表达功能逻辑. 数据驱动
 * 更容易将试图与逻辑解绑,能快速适应变更和调整.
 * 
 * 在日常开发中,更多时候是结合了事件驱动和数据驱动来进行编码.
 * 
 * Vue, Angular, React 这些前端框架的出现,处理了很多事件驱动流程上的工作,从而推动了更多开发者从事件驱动转变成
 * 数据驱动的方式,更加专注于数据的处理.
 */
