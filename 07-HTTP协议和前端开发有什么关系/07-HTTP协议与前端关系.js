/**
 * HTTP请求的场景相对复杂,对应的HTTP协议也是各式各样的,因此很多时候大家都认为内容
 * 太多太杂,认为学习HTTP协议性价比太低.
 * 
 * 其实在日常开发中,经常会使用的 cookie, 浏览器的缓存机制, 各种形式的网络连接(比如Websocket),
 * 这些网络请求相关的场景都跟HTTP协议有密切的关系.
 * 
 * 对于前端开发来说,HTTP协议基本上不会离开嘴边. HTTP协议的内容很多很杂,这里我先给大家梳理下它的设计
 * 和演变.
 */

/**
 * 一, 认识HTTP协议
 * 上一讲,我们知道了网络请求的过程,当服务端建立起与客户端的TCP连接之后,服务端会持续监听客户端发起的
 * 请求. 接下来,客户端将发起HTTP请求,请求内容通常包括请求方法,请求的资源等,服务端收到请求后会进行
 * 回复,回复内容通常包括HTTP状态,响应消息等.
 * 
 * 可以看到,网络请求的过程包括两个步骤: 客户端发送请求,服务器返回响应. 这就是HTTP协议的主要特点:
 * > 遵循经典的 "客户端-服务端" 模型.
 * 
 * 除此之外,HTTP协议还被设计的简单易读. 在HTTP/2之前,HTTP协议是语义可读的,我们可以直观地获取其中的
 * 内容.比如:
 * > HTTP请求方法: 代表这客户端的动作行为(GET-获取资源/POST-提交资源/PUT-修改资源/DELETE-删除资源)
 * > HTTP状态码: 代表着当前请求的状态(1XX-提示信息/2XX-成功/3XX-重定向/4XX-客户端错误/5XX-服务端错误)
 * > HTTP消息头: 客户端和服务端通过request和response传递附加信息.
 * 
 * 前面我们说到,HTTP协议在HTTP/2之前是语义可读的,那么HTTP/2之后发生了什么呢? 我们可以看一下HTTP协议
 * 的演变过程.
 */

/**
 * 二, HTTP协议的演变
 * HTTP协议从被创造以来,一直在不断演变着: 从HTTP/1.0, HTTP/1.1, 到HTTP/2, HTTP/3, HTTP协议在保持
 * 协议简单性的同时,扩展了灵活性,提供越来越多,更加可靠的传输服务.
 * 
 * >1. HTTP/1.0到HTTP/1.1,主要实现了对TCP连接的复用.
 * 最初在HTTP/1.0中,每一对HTTP请求和响应都需要打开一个单独的TCP连接. 这样的方式对资源消耗很大,因此HTTP/1.1
 * 中引入持久连接的概念,通过设置Connection头部的keep-alive的方式,可以让TCP连接不会关闭. 该功能避免了TCP
 * 连接上,长时间地对同一个服务端的发起请求.
 * 
 * >2. HTTP/1.1到HTTP/2,主要实现了多个请求的复用.
 * HTTP/2通过将HTTP消息拆分为独立的帧,进行交错发送,实现在同一个连接上并行多个请求,来减少网络请求的延迟.为了
 * 实现多路复用,HTTP/2协议对HTTP头部进行了二进制编码,因此不再语义可读. 
 * 除此之外,HTTP2还实现了Header压缩,服务端主动推动,流优先级等能力.
 * 
 * >3. HTTP/2到HTTP/3,主要实现了基于UDP协议,更快的传输. 
 * HTTP/3使用了基于UDP的QUIC协议,实现了又快又可靠的传输. 由于UDP协议中没有错误检查内容,因此可以更快地实现通信.
 * 同时,QUIC协议负责合并纠错,重建丢失的数据,解决了UDP协议传输丢包的问题.
 * 
 * 总的来说, HTTP协议的演变过程主要围绕着传输效率和速度上的优化,我们可以通过升级HTTP协议来优化前端应用.除此之外,
 * 我们在日常的工作中,同样可以借鉴HTTP协议的优化手段. 比如,可以使用资源压缩,资源复用等技术手段,来优化前端性能.
 * 技术常常是通用的,我们在学习一些看起来不相关的内容时,会发现其实很多技术转变都是值得思考和参考的.
 * 
 * 下面我们来看一下常见的一些HTTP协议场景.
 */

/**
 * 三, HTTP Cookie
 * HTTP协议是无状态的,这意味着在同一个TCP连接中,先后发起的请求之间没有任何关系.这给服务端带来了挑战:
 * 用户在同一个网站中进行连续的操作,服务端无法知道这些操作来自哪里.
 * 
 * 使用HTTP Cookie可以解决这个问题. 当服务端将HTTP响应返回给客户端时,通过在响应头里面添加一个Set-Cookie信息,浏览器
 * 收到带Set-Cookie信息的响应后会将Cookie保存,在后面发送给该服务端的每个请求中,都会自动带上Cookie信息.服务端根据
 * Cookie信息,就能取得客户端的数据信息.
 * 
 * 由于Cookie信息是被浏览器识别并自动保存和发送的,因此在默认情况下,浏览器关闭之后它就会被自动删除.但我们也
 * 可以通过指定过期时间(Expires) 或者 有效期(Max-Age),来让Cookie获得更久的有效期.
 * 
 * 需要注意的是,某个网站在设置了Cookie之后,所有符合条件(有效期,域名,路径,适用站点等)的请求都会被自动带上Cookie. 这带来了
 * 一个Web安全隐患: 服务端只知道请求来自某个用户的浏览器,却不知道请求本身是否用户自愿发出的.
 * 
 * 利用这一漏洞,攻击者可通过一些技术手段(图片地址,超链接等)欺骗用户的浏览器访问曾经认证过的网站,并利用用户的登录态进行一些
 * 操作,可能导致用户信息泄露,资产被转移,在不知情的情况下发送信息等,带来了恶劣的后果. 这便是常说的Web安全问题之一:
 * 跨站请求伪造(CSRF).
 * 
 * 为了应对这种情况,我们可以校验HTTP请求头中的Referer字段,这个字段用以标明请求来源于那个地址. 但由于该字段可能会被篡改,因此
 * 只能作为辅助校验手段.
 * 
 * 防范跨站请求伪造攻击的有效方法,就是避免依赖浏览器自动带上的Cookie信息.我们可以使用其他方式校验用户登录态,比如将用户
 * 登录态保存在浏览器缓存中,在发送请求的时候添加用于标识用户的参数值,现在大多数应用也是使用Token来进行用户标识.
 * 
 * 除了HTTP Cookie 之外,浏览器中HTTP缓存机制也同样依赖HTTP协议.
 */

/**
 * 四, HTTP 缓存
 * 缓存常常被用作性能优化的技术方案之一, 通过缓存我们可以有效地减少资源获取的耗时,减少用户的等待时长,从而提升用户的体验.
 * 
 * 其中,我们可以通过HTTP协议,设置浏览器对HTTP响应资源进行缓存. 使用浏览器缓存后,当我们再发起HTTP请求时,如果浏览器缓存
 * 发现请求的资源已经被存储,它会拦截请求并返回该资源的副本,不需要再去请求服务端获取资源,因此减少了HTTP请求的耗时,同时
 * 也能有效地环节服务端压力.
 * 
 * 一般来说,HTTP缓存只能存储GET请求的响应内容,对于这些响应内容可能存在两种情况:
 * 
 * 1. > 不缓存内容,每次请求的时候都会从服务端获取最新的内容;
 * 2. > 设置了缓存内容,则在有效期内会从缓存获取,如果用户刷新或内容过期则去服务端获取最新的内容.
 * 
 * 那么,要如何给GET请求设置缓存呢? 在浏览器中,便是依靠请求和响应中的头信息来控制缓存的. 根据缓存的行为,我们可以将它们分为
 * 强制缓存和协商缓存两种.
 * 
 * 1. > 强制缓存.
 * 在规定有效期内,直接使用缓存. 可以通过以下的方式使用强制缓存:
 * > 1. 服务端通过设置Expires 和 Cache-Control, 和客户端约定缓存内容的有效时间;
 * > 2. 若符合缓存条件,浏览器响应HTTP 200(from cache).
 * 
 * 2. > 协商缓存,
 * 与服务端协商是否使用缓存. 可以通过以下的方式使用协商缓存:
 * > 1. 服务端通过设置If-Modified-Since 和 If-None-Match, 和客户端约定标识协商缓存的值;
 * > 2. 当有效期过后,浏览器将缓存信息中的Etag 和 Last-Modified 信息, 分别使用If-None-Match
 * 和 If-Modified-Since 请求头设置,提交给服务端.
 * > 3. 若符合缓存条件,服务端则响应HTTP 304, 浏览器将从缓存读数据.
 * 
 * 若以上缓存条件均不符合,服务端响应HTTP 200, 返回更新后的数据,同时通过响应头更新HTTP缓存设置. 整个过程
 * 可以用下面的流程图来表示:
 * 
 * 如图 07.1 示例图
 * 
 * 浏览器会在第一次请求完服务端后得到响应,通过适当地设置响应头信息,我们可以使用更多的缓存资源,从而提升网站的响应速度和性能,给到用户更好
 * 的体验.
 * 
 * 除了常见的Cookie和GET请求的缓存,客户端和服务端在实现双向通信的时候,同样会依赖HTTP协议来完成.
 */

/**
 * 五, 客户端服务端双向通信
 * 客户端和服务端的通信方式有很多种,大多数场景下都是由客户端主动发送数据给服务端,但在特定的场景下(如多人协作,
 * 在线游戏) 客户端还需要和服务端保持实时通信,此时需要使用双向通信.
 * 
 * 常见的双向通信方式包括 HTTP短轮询(polling), HTTP 长轮询(long-polling),XHR Streaming,Server-Sent Events,
 * Websocket等.
 * 
 * 其中,最简单粗暴的莫过于HTTP短轮询,客户端每隔特定的事件(比如1s)便向服务端发起请求,获取最新的资源信息. 该方式会造成
 * 较多的资源浪费,尤其当服务端内容更新频率低于轮询间隔是,就会造成服务端资源,客户端资源的浪费. 除此之外,过于频繁的请求
 * 也会给服务端造成额外的压力,当服务端负载较高的时候,甚至可能导致雪崩等情况发生.
 * 
 * HTTP 长轮询解决了解决了短轮芯的一些问题,长轮询实现特点主要为当客户端向服务端发起请求后,服务端保持住链接,当数据更新响应
 * 之后才断开连接. 然后客户端会重新建立连接,并继续等待新数据. 此技术的主要问题在于,在重新连接过程中,页面上的数据可能会过时
 * 且不准确.
 * 
 * 相比HTTP长轮询,XHR Streaming 可以维护客户端和服务端之间的连接. 但使用 XHR Streaming 过程中, XMLHttpRequest 对象
 * 的数量将不断增长,因此在使用过程中需要定期关闭连接,来清除缓冲区.
 * 
 * SSE(Server-Sent Events)方案思想便是 XHR Streaming, 主要基于浏览器中 EventSource API 的封装和协议.
 * 他会对HTTP服务开启一个持久化的连接,以 text/event-stream 格式发送事件,会一直保持开启直到被要求关闭.
 * 
 * 最后我们来介绍 WebSocket, 它实现了浏览器与服务端全双工通信. 前面提到, HTTP短轮询,长轮询都会带来额外的资源浪费,因此
 * Websocket在实现实时通信的同时,能更好地节省服务端资源和带宽.
 * 
 * Websocket是如何实现全双工通信的呢? Websocket建立在TCP协议之上,握手阶段采用HTTP协议,但这个HTTP协议的请求头中,有以下
 * 的标示性的内容.
 * > Connection: Upgrade, Upgrade: websocket : 表示这个连接将要被转换为WebSocket连接.
 * > Sec-WebSocket-Key: 向服务端提供所需的信息,以确认客户端有权请求升级到WebSocket.
 * > Sec-WebSocket-Protocol: 指定一个或多个的WebSocket协议.
 * > Sec-WebSocket-Version: 指定WebSocket的协议版本.
 * 
 * 如果服务端同意启动WebSocket连接,会在握手过程中的HTTP协议中返回包含Sec-WebSocket-Accept的响应消息,接下来客户端
 * 和服务端便建立WebSocket连接,并通过WebSocket协议传输数据.
 * 
 * 由于不在需要通过HTTP协议通信,省去请求头等内容设置,Websocket数据格式会更加轻量,通信更加高效,性能开销也响应地降低.
 * 除此之外,不同于HTTP协议,Websocket协议没有同源限制,因此客户端可以与任意服务端通信.
 * 
 * 以上这些,都是客户端和服务端双向通信的一些解决方案.
 * 
 * 如图 07.2 示例图
 * 
 * 在依赖双向通信的场景中,这些方案并没有绝对的最优解,更多时候都是不同场景和脚骨设计下的选择.
 * 如果仔细研究在线协作的办公工具,比如谷歌文档,石墨文档,金山文档,腾讯文档,你会发现它们的双
 * 向通信都分别使用了不同的解决方案.
 */