/**
 * 最初的页面开发中,前端实现一个页面只需要在一个文件里完成,包括HTML/CSS/JavaScript各种内容.
 * 后来,通常将常用的静态资源放置在CDN, 并使用<link>和<script>的src属性引入的方式,来减少页面
 * 开发过程中的重复代码编写.
 * 
 * 如今前端页面的功能越来越复杂,规模也越来越大.为了提升代码的可读性,项目的可维护性,我们会将一些
 * 通用的工具和组件进行抽象,代码被有组织地按照一定规则进行划分,比如按照功能划分为页面,组件,工具库,脚本等.
 * 
 * 这个过程便是模块化,而JavaScript中的模块规范不止一种.
 */

/**
 * 一, JavaScript模块
 * 在JavaScript中,常说的模块规范包括 CommonJS/AMD/UMD/ES6 Module四种. 这些模块规范和定义之间
 * 的区别常常容易搞混,先来分别看下.
 * 
 */

/**
 * 1. CommonJS规范
 * CommonJS规范定义了模块应该怎样进行编写,从而各个模块系统之间可以进行相互操作.
 * 来看一下 CommonJS 规范的模块实例:
 */
 var beta = require('beta');
 function verb() {
   return beta.verb();
 }
 module.exports = {
   verb: verb
 };
 /**
  * 在该示例中,使用require()载入模块,使用module.exports输出模块.
  * 一般来说,CommonJS有以下特点:
  * > 一个文件就是一个模块;
  * > 使用require()载入模块,使用module.exports输出模块,因此各个模块间可以进行交互;
  * > 不支持异步加载;
  * 
  * 或许你已经知道, Node.js环境使用的便是基于CommonJS规范实现的模块系统,而如今我们提到CommonJS规范,
  * 也基本上认为是Node.js系统.
  * 
  * 为什么浏览器环境不使用CommonJS规范呢? 这是因为CommonJS不支持异步加载,而前面我们也说过,浏览器环境
  * 中同步任务的执行会带来性能问题,但对于异步模块定义(AMD)来说就不存在这样的问题.
  */

 /**
  * 2. AMD
  * 顾明思议,异步模块定义(AMD)主要为了解决异步加载模块而提出,它通过指定模块和依赖项的方式来定义模块.
  * 
  * RequireJS便是基于AMD的实现,同样可以看一个模块示例:
  */
 define("alpha",["require","exports","beta"],function(
     require,
     exports,
     beta
 ){
     exports.verb = function() {
         return beta.verb();
         //或者可以这么写
         return require("beta").verb();
     };
 });
 /**
  * 在该示例中,导出ID为alpha的模块,依赖了ID为beta的模块.
  * 现在我们知道,Node.js环境中的模块系统基于CommonJS模块,而浏览器环境中需要使用AMD实现.
  * 
  * 那么如果我们有一个模块,需要同时能运行在Node.js环境中和浏览器环境中,要怎么办? 我们可以使用UMD模式.
  */


 /**
  * 3. UMD
  * 为了兼容AMD和CommonJS的规范,通用模块定义(UMD)模式被提出,它在兼容两者的同时,也支持了传统的全局变量
  * 模式.
  * 
  * 我们来看下UMD模式的模块示例:
  */
(function(root,factory){
    if(typeof define === "function" && define.amd){
        //AMD
        define(["jquery"],factory);
    } else if (typeof exports === "object"){
        //CommonJS
        module.exports = factory(require("jquery"));
    } else {
        //全局变量
        root.returnExports = factory(root.jQuery);
    }
})(this,function($){
    // ...
});
/**
 * 可以看到,UMD模块头部通常都会有用来判断模块加载器环境的代码,并根据不同的环境提供了不同的方式
 * 进行加载.
 * 
 * 到这里,似乎不管是Node.js环境还是浏览器环境,都有支持的模块规范,也有能相互兼容的模块规范了.那么,
 * ES6模块又是什么呢?
 */

/**
 * 4. ES6模块
 * 相比于运行时进行加载的CommonJS规范,ES6模块化主要是为了:
 * 在编译阶段就可以确定各个模块之间的依赖关系.
 * 
 * 我们同样来看一个ES6模块的实例代码:
 */
// import 导入
import BaseTask, { TaskType } from "./BaseTask";
// export 导出
export { BaseTask };
/**
 * 在该示例中,使用import加载模块,使用export输出模块.
 * 
 * ES6模块的特点如下:
 * > 使用import加载和export输出;
 * > 一个模块只会加载一次(CommonJS也是一样);
 * > 导出的模块为变量引用,因此可以在内存中共享.
 * 
 * 现在大多数前端项目中都使用ES6模块,由于ES6模块化目的是编译阶段确定模块间依赖关系,因此我们需要
 * 在编译的时候使用Babel,Webpack等方式构建依赖关系树.
 * 
 * 除此之外,ES6模块化在各个浏览器里的兼容性差异较大,因此同样需要进行Babel编译以及Webpack进行打包,这个过程
 * 我们称之为代码构建.
 * 
 * 我们来总结下CommonJS/AMD/UMD/ES6 Module这四种模块规范:
 * 1. CommonJS规范定义了模块应该怎样进行编写,从而各个模块系统之间可以机型相互操作.
 * 2. CommonJS不支持异步加载,因此异步模块定义(AMD)主要为了解决异步加载模块而提出.
 * 3. 通用模块定义(UMD)模式用于兼容AMD和CommonJS的规范.
 * 4. CommonJS规范用于运行时进行模块加载,ES6模块化可以在编译阶段确定各个模块之间的依赖关系.
 * 
 * 下面,来看Webpack
 */

/**
 * 二, Webpack工具都做了些什么?
 * 如今前端项目大多数都使用了模块化,而如果想要将多个文件的代码打包成最终可按照预期运行的代码,则需要使用到代码
 * 构建工具.
 * 
 * 不管项目代码是如何进行组织的,项目中又有多少个文件,最终浏览器依然会从HTML内容进行解析和加载,因此我们需要对项目
 * 中的代码进行构建(包括编译和打包),生成浏览器可正常解析和加载的内容.
 * 
 * 我们先认识下常见前端构建相关工具.
 */

/**
 * 三, 常见的前端构建工具.
 * 对于前端开发来说,我们会用到各式各样的构建/打包工具,如下:
 * 
 * 如图 13.1 示例图
 * 
 * 其中,涉及模块化代码打包的主要有Grunt/Gulp/Webpack/Rollup. 很多同学会搞混这几个工具,这里简单介绍下他们之间区别:
 * 
 * 1.Gulp/Grunt是一种能够优化前端工作流程的工具,比如自动刷新页面,combo,压缩CSS/JavaScript,编译Less/Sass等.
 * 2.Webpack/Rollup是一个JavaScript的模块打包器,用于整合编译成最终的代码.
 * 3.其中,Rollup通常用来构建库,Webpack更适合来构建应用程序.
 * 
 * 对于业务团队来说,进行代码的模块打包更多情况下会选择Webapck.
 */

/**
 * 四, 认识Webapck
 * Webpack的使用有4个核心概念: 入口(entry),输出(output),Loader,插件(plugins),我们先分别来看.
 */

/**
 * 五, 入口(entry)
 * 首先便是入口(entry),entry指向我们前端应用的第一个启动文件. 例如,在Vue中是new Vue()位置所在的文件,在Angular中是启动
 * .bootstrap()的文件, 在React中则是ReactDOM.render() 或者是React.render()的启动文件.
 */
//将entry指向启动文件即可
module.exports = {
    entry: "./path/to/my/entry/file.js"
}
/**
 * 或许你会疑惑,入口的一个文件,又是怎样把整个前端项目中的代码关联起来,并进行打包的呢?
 * 
 * 实际上,Webpack会从entry开始,通过解析模块间的依赖关系,递归地构建出一个依赖图. 我们如果在项目中使用webpack-bundle-analyzer插件,
 * 也可以看到生成的这样一个依赖图.
 * 
 * 如图 13.2 示例图
 * 
 * Webpack会根据依赖图来对各个模块进行整合,最终打包成一个或多个的文件,来提供给浏览器进行加载.
 * 既然有入口,那当然就有出口,Webpack中的出口由输出(output)字段来描述.
 */

/**
 * 五, 输出(output)
 * 输出(output)字段用于告诉Webpack要将打包后的代码生成的文件名是什么(filename),以及将它们放在哪里(path).
 */
module.exports = {
    output: {
        filename: "bundle.js", //编译文件的文件名,比如 main.js/bundle.js/index.js
        path: "/home/proj/public/assets", //对应一个绝对路径,此路径是你希望一次性打包的目录
    },
};
//有了entry和output,我们来看看Webpack中间的编译过程中,是怎样用到Loader和Plugins的.

/**
 * 六, Loader
 * 要了解Loader, 需要知道在Webpack中,每个文件(.css,.html,.scss,.jpg等)都会被作为模块处理.如果你看过生成的
 * bundle.js代码就会发现,Webpack将所有的模块打包一起,每个模块添加标记id,通过这样一个id去获取所需模块的代码.
 * 
 * 但实际上,Webpack只理解JavaScript,因此Loader的作用就是把不同的模块和文件(比如HTML,CSS,JSX,Typescript等)
 * 转换为JavaScript模块.
 * 
 * 而不同的应用场景需要不同的Loader,比如我们经常会使用到的CSS相关Loader和其他资源Loader.
 * 
 * 如图 13.3 示例图
 * 
 * 前面说到,ES6模块需要依赖Babel编译和Webpack打包,而Babel在Webpack中就是使用Loader的方式来进行编译的.
 * 
 * babel-loader将ES6/ES7语法编译生成ES5,其中部分特性还需要babel-polyfill支持.这是因为Babel默认只转换新的
 * JavaScript语法(比如const/let),但不会对新的API(比如Promise)进行处理.
 * 
 * Webpack在编译过程中,支持多个Loader通过流水线的方式进行先后编译,编译的顺序为从后往前,最终以JavaScript模块的方式输出.
 * 
 * 到这里,我们知道Webpack以entry为入口,链式调用各个Loader进行编译生成JavaScript,最终打包放置在output中.其中Loader
 * 只负责将其他非JavaScript模块转换成JavaScript模块.
 * 
 * 那Webpack又是怎样地对这些代码进行组织并生成文件呢?这就是插件Plugins负责的事情.
 */

/**
 * 七,插件(plugins)
 * 插件(plugins)主要负责解决Loader无法做到的事情,它可以访问在Webpack编译过程中的关键事件,对Webpack内部示例的一些数据进行处理,处理完成后
 * 回调Webpack让其继续.
 * 
 * 来看几个具体插件.
 * > HtmlwebpackPlugin: 可以生成创建HTML入口文件,也可以为HTML文件中引入的外部资源如script,link动态添加每次编译后的哈希值,防止引用
 * 缓存的外部文件问题.
 * > CommonChunkPlugin: 用来提取代码的公共模块,并将这些公共模块按照预期进行打包生成独立的文件.
 * > ProvidePlugin: 用来定义标识符,当遇到指定标识符的时候自动加载模块,适合引入的全局变量(比如jQuery).
 * > ExtractTextPlugin: 可以将样式从JavaScript中抽出,生成单独的.css样式文件.
 * 
 * 看到这里应该明白:
 * 插件可以用来控制最终生成的代码是如何进行组织和输出的,包括对代码的打包优化,压缩,甚至是启用模块热替换,重新定义环境中的变量,等等.
 * 
 * 那么,现在已经知道Webpack到底对项目代码做了什么.
 * 1. 通过entry指定的入口开始,解析各个文件模块间的依赖.
 * 2. 根据模块间的依赖关系,开始对各个模块进行编译.
 * 3. 编译过程中,根据配置的规则对一些模块使用Loader进行编译处理.
 * 4. 根据插件的配置,对Loader编译后的代码进行封装,优化,分块,压缩等.
 * 5. 最终Webpack整合各个模块,根据依赖关系将它们打包成最终的一个或者多个文件.
 * 
 * 这便是Webpack做的事情:
 * 让前端项目中模块化的代码能最终在浏览器中进行加载,并正常地工作.
 */


