/**
 * 在第6讲和第8讲的内容中,介绍了浏览器中页面是如何进行请求和渲染的. 在单页应用出现
 * 以前,浏览器通过HTTP请求向服务端请求页面内容的时候,服务端会根据页面不同的URL路由,
 * 拼接出相应的页面视图片段,最终以HTML的方式返回给浏览器,浏览器再进行解析和渲染.
 * 
 * 这种多个页面间没有关系,各自为完整页面的应用,称为多页应用. 我们熟悉的JSP, PHP 也都是
 * 通过拼接HTML模板的方式,来给浏览器提供完整的页面内容.
 * 
 * 如今,大多数的前端应用都使用单页应用的方式来实现. 那么什么是单页应用呢?使用单页应用的优势是
 * 什么? 为什么单页应用流行一段时间之后,现在又有人开始回到多页应用的方式呢?
 * 
 * 下面来一探究竟
 */

/**
 * 一, 单页应用
 * 与多页应用区别:
 * > 多页应用是由服务端进行HTML模板拼接的,各个页面间没有直接关系;
 * > 单页应用便是将页面内容的控制权交给前端来处理,通过使用一个前端页面 + 多个页面片段的方式
 * 进行渲染.
 * 
 * 当页面以多页应用的方式进行加载时,如果发生页面间的跳转,常常会导致整个页面都需要重新加载. 这是因为
 * 当页面路由发生了变化,浏览器会重新向服务端获取相应的内容,而服务端则会根据新的URL再次进行HTML模板
 * 拼接,并返回给前端.
 * 
 * 在这个过程中,用户会看到页面重新变回了白屏,然后再出现内容,体验很糟糕. 使用这种方式加载页面,整个
 * 页面都需要重新加载,导致体验不够友好.
 * 
 * 除此之外,由于页面中整个HTML内容都需要重新加载,多页应用还存在以下问题:
 * 
 * 1. 静态资源无法有效复用,包括 JavaScript脚本和CSS内容;
 * 2. 原有的页面状态,用户状态无法保留,依赖URL,Cookie,本地缓存等获取用户数据.
 * 
 * 其实在大多数情况下,对于同一个网站,不同URL的页面其实整体骨架都很相似,向网站导航栏,顶部菜单栏,底部网站
 * 相关内容等都是相同的,使用多页应用的方式会导致这些内容也重新加载.
 * 
 * 既然如此,那么是否可以使用页面局部刷新的方式来更新页面内容呢? 在第10讲其实也有介绍,如今流行的Angular,
 * React,Vue等这些前端框架都是通过某个数据变量关联到页面的某块内容展示的方式,实现页面的局部更新.
 * 
 * 但仅有局部刷新的能力还是不够的,因为即使页面内容更新了,如果页面的URL灭有发生变化,当用户刷新页面的时候,
 * 可能会丢失当前的页面内容. 因此,需要在前端配置控制器的方式来控制页面展示,这就是单页应用.
 * 
 * 显然,单页应用的出现带来以下的好处:
 * 
 * 1. 通用的静态资源(比如 jQuery, Axios, Boostrap等) 不需要重新加载;
 * 2. 页面的数据状态和用户状态依然保留;
 * 3. 局部页面内容更新,页面切花快, 用户体验好.
 * 
 * 但是,单页应用同样存在着一些问题,这些问题会影响着项目的选型,也因此出现了服务端渲染等解决方案.
 */

/**
 * 二, 单页应用的问题
 * 由于要启动单页应用,浏览器在首次打开页面的时候,除了加载固定的脚本和样式文件以外,页面流程大概是这样的.
 * 
 * 1. 浏览器请求服务器, 服务器返回固定静态资源 + 基础的HTML内容 + 前端路由库.
 * 2. 由于是前端进行渲染,因此在一般情况下,服务端返回的HTML内容基本上<body>为空. 前端在页面进行加载的
 * 时候,需要继续向服务端发起Ajax请求,获取页面渲染需要的数据.
 * 3. 服务端根据请求内容,给前端返回相应的数据.
 * 4. 前端拿到数据后,根据当前的URL信息来生成相应的内容,进行页面的二次渲染,此时页面才最终加载完成.
 * 
 * 可以看到,单页应用相比多页应用的优势主要在于页面切换时. 在首次打开的时候,多页应用可以直接返回用于最终
 * 渲染的页面,而单页应用则需要自行进行计算和组装,中间过程很可能还设计数据的二次请求,因此会比多页应用慢.
 * 
 * 除此之外,由于搜索引擎只识别HTML内容,单页应用更多依赖Javascript进行HTML拼接,因此对SEO(search engine
 * optimization 简写为SEO,搜索引擎优化)的支持不友好,很可能会影响搜索引擎中的排名.
 * 
 * 基于这些原因,如今不少前端框架也支持服务端渲染(SSR, Server-Side-Rendering),通过提供Node.js服务的方式,
 * 在服务端完成页面内容的拼接,直接返回给前端. 相对的,单页应用的渲染方式,也别成为客户端渲染(CSR, Client-Side-Rendering).
 * 
 * 服务端渲染听起来跟多页应用很相似,都是服务端完成HTML内容拼接的,那是否可以认为服务端渲染就是多页应用呢?
 * 
 * 并不是,服务端渲染可以只用来控制首屏直出,而在页面进行切换的时候,依然使用单页应用的方式,这样的解决方案结合
 * 了多页应用和单页应用的优势,如今也在不少项目中使用.
 * 
 * 那么,页面切换的时候,如何避免页面重新加载,又能正确渲染页面内容呢? 大多数项目中都会使用前端路由库(比如ngRouter/vue-router
 * /react-router等),这些路由库的设计原理又是怎样的?
 */

/**
 * 三, 前端路由库的设计与实现
 * 页面的跳转,局部内容的刷新是Web应用中使用最多的场景. 想象一下,如果我们只刷新了页面的内容,但是URL并没有改变,当用户刷新当前
 * 页面的时候,原先的内容会丢失,需要重新操作进入到对应的页面中,这是比较糟糕的一种体验.
 * 
 * 所以,可以把页面的内容匹配到对应的路由信息中,即使是强制刷新,URL信息也不会丢,用户依然可以快速回复原先的页面浏览信息,这也是项目
 * 中设计和使用路由的很重要的原因.
 * 
 * 前面说到,单页应用使用了局部刷新的能力,配合路由信息变更的时候进行局部页面内容的刷新(而不是重新加载一个完整的页面),可以让用户获取
 * 更好的体验.
 * 
 * 要实现前端路由,离不开浏览器提供的 History API, Location API 这些API,因此后面介绍路由能力实现时,我们也会进行些介绍.
 * 
 * 一般来说,前端路由的实现,会包括两种模式:
 * 1. History模式
 * 2. Hash模式
 */

/**
 * 四, History模式
 * History的路由模式,依赖了一个关键的属性window.history, 该属性可用来获取用于操作浏览器历史记录的History对象.也就是说,通过使用
 * window.history,我们可以实现以下与路由相关的重要能力.比如:
 * 
 * > 在history中跳转
 * 使用window.history.back(), window.history.forward() 和 window.history.go() 方法,可以实现在用户历史记录中向后和向前
 * 的跳转.
 * 
 * > 添加和修改历史记录中的条目
 * 使用history.pushState()和history.replaceState()方法,它可以操作浏览器的历史栈,同时不会引起页面的刷新(可避免页面重新加载).
 * 
 * > 监听页面路由切换
 * 当同一个页面在历史记录切换时,就会产生popstate事件,可以通过window.popstate监听页面路由切换的情况.
 * 
 * 也就是说,使用pushState() 和 replaceState() 来修改路由信息,通过 popstate事件监听页面路由变化,来进行页面的局部更新,这
 * 便是History的路由模式.
 * 
 * 但History的路由模式需要依赖HTML5 History API(IE10以上),以及服务器的配置来支持,所以也有不少的开发者会使用Hash模式来管理
 * Web应用的路由.
 * 
 * 那么Hash模式又是怎样呢?
 */

/**
 * 五, Hash模式
 * Hash模式使用的是从井号(#)开始的URL(锚)片段,主要依赖Location对象的hash属性(location.hash)和hashchange事件,包括:
 * 
 * > 使用location.hash来设置和获取hash
 * location.hash的设置和获取,并不会造成页面重新加载,利用这一点,我们可以记录页面关键信息的同时,提升页面体验.
 * 
 * > 监听hashchange事件
 * 当页面的hash改变时,hashchange事件会被触发,同时提供了两个属性: newURL(当前页面新的URL)和oldURL(当前页面旧的URL).
 * 
 * 部分浏览器不支持onhashchange事件,我们可以自行使用定时器检测和触发的方式来进行兼容,可以使用以下的代码逻辑来实现:
 */
 (function (window) {
    // 如果浏览器原生支持该事件，则退出
    if ("onhashchange" in window.document.body) {
      return;
    }
    var location = window.location,
      oldURL = location.href,
      oldHash = location.hash;
    // 每隔100ms检测一下location.hash是否发生变化
    setInterval(function () {
      var newURL = location.href,
        newHash = location.hash;
      // 如果hash发生了变化，且绑定了处理函数...
      if (newHash != oldHash && typeof window.onhashchange === "function") {
        // 执行事件触发
        window.onhashchange({
          type: "hashchange",
          oldURL: oldURL,
          newURL: newURL,
        });
        oldURL = newURL;
        oldHash = newHash;
      }
    }, 100);
  })(window);

  //我们可以看到, Hash路由模式使用location.hash来设置和获取hash,并通过window.onhashchange监听
  //基于hash的路由变化,来进行页面更新处理的.

  /**
   * 六, 路由结合前端框架
   * 不管是History模式还是Hash模式,路由的实现原理都很简单,因此一般来说大家也都会直接使用前端框架
   * 自带的路由库.
   * 
   * 路由库结合前端框架的工作流程是这样的:
   * 1. 设置监听器,监听popstate或者hashchange事件.
   * 2. 根据当前URL信息匹配设置的路径,根据路由设置加载对应模块,通过前端框架进行更新和渲染;
   * 3. 页面更新的同时,使用location.hash或者history.pushState/replaceState更新页面的路由信息.
   * 
   * 以上是简单的实现,很多路由工具库还会提供时间监听和通知之外的一些更高级的能力,比如与渲染成结合解析
   * 和处理的能力,以及路由的钩子,路由监听,路由鉴权,匹配和映射,赖加载打包等这种能力,减轻业务开发过程中
   * 的处理工作.
   */

