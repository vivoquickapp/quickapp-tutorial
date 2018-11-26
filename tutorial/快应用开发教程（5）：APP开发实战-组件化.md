## 快应用开发教程（5）：APP开发实战-组件化

前几篇教程中，我们完成了豆瓣电影快应用的界面和数据接入，现在这个快应用看起来已经像那么回事儿了，但是还是存在一些可优化的点，比如我们的底部选项卡可以抽象出一个组件，这样就不用再每个页面都写分散的代码。下面就针对整个APP中的这些问题，优化我们项目代码的结构。

### 编写自定义组件

在快应用中，自定义组件其实和页面差不多，文件后缀名相同，代码结构相似，所以我们甚至可以认为整个快应用都是用不同的组件构成的。下面以底部选项卡为例，编写我们的豆瓣电影的第一个自定义组件出来。

首先我们在`src/common/component`目录中新建一个文件`tabbar.ux`，文件内的代码结构为：

```html
<template></template>
<style></style>
<script></script>
```

接下来我们把之前写好的底部选项卡的对应的样式、模板和脚本代码填充进去。

```html
<template>
  <div class="tabbar">
    <div class="tab" onclick="switchTab('/page/index')">
      <image src="/common/picture/ing-active.png"></image>
      <text class="active-tab">首页</text>
    </div>
    <div class="tab" onclick="switchTab('/page/top')">
      <image src="/common/picture/coming.png"></image>
      <text class="">排行榜</text>
    </div>
  </div>
</template>

<style>
  .tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    border-top-width: 1px;
    border-color: #bbbbbb;
    background-color: #ffffff;
    flex-direction: row;
    border-top-color: black
  }

  .tab {
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .tab image {
    height: 60px;
    width: 60px;
  }

  .tab text {
    font-size: 20px;
  }

  .active-tab {
    color: #27a;
  }
</style>

<script>
    import router from "@system.router";

    export default {
        switchTab: function (uri) {
            router.replace({
                uri: uri
            })
        }
    }
</script>
```

现在我们的组件已经基本完成，是不是很简单，和写一个页面基本一样呢，下面我们在`src/page/index/index.ux`和`src/page/top/index.ux`里面替换掉写死的底部筛选器和相关的代码，并在文件顶部引入刚写好的组件。

```html
<import name="tabbar" src="../../common/component/tabbar"></import>
<template>
    ···
    <tabbar></tabbar>
</template>
```

现在我们的页面代码是不是感觉清爽了一些，原本需要在两个页面都写的模板、样式和脚本代码都被集中到了一个文件中，对后续的修改维护也轻松了不少。但是同时也带来一个问题，底部选项卡的状态不会在不同页面显示不同效果了。下面我们解决这个问题。

### 组件间的通讯

要解决一个组件在不同页面和位置显示不同效果，我们可以在不同的调用位置传入不同的数据，然后在组件内判断传入的数据来控制组件的行为，这就是我们要用的组件间通讯的原因。

首先我们来看如何向组件内传入数据

```html
<tabbar status="index"></tabbar>
```

我们在自定义组件`tabbar`上定义了一个`status`属性，并赋值了一个字符串`'index'`，那么组件内部如何接受传入的这个数据呢？

```diff
export default {
+    props: ['status'],
    switchTab: function (uri) {
        router.replace({
            uri: uri
        })
    }
}
```

可以看到我们在组件内部声明了一个`props`的属性，他是一个数组，每个元素都是一个字符串。每个元素对应的是可以在组件上使用的一个属性。在`script`中可以直接使用`this.status`的方式访问数据。在模板中的使用方式和定义在`public`、`protected`和`private`中的数据一致。

了解了使用方法，我们来完成根据传入的数据来进行的状态判断。

```html
<template>
  <div class="tabbar">
    <div class="tab" onclick="switchTab('/page/index')">
      <image if="status !== 'index'" src="/common/picture/ing.png"></image>
      <image if="status === 'index'" src="/common/picture/ing-active.png"></image>
      <text class="{{status === 'index' ? 'active-tab' : ''}}">首页</text>
    </div>
    <div class="tab" onclick="switchTab('/page/top')">
      <image if="status !== 'top'" src="/common/picture/coming.png"></image>
      <image if="status === 'top'" src="/common/picture/coming-active.png"></image>
      <text class="{{status === 'top' ? 'active-tab' : ''}}">排行榜</text>
    </div>
  </div>
</template>
```

到此为止，我们的底部选项卡组件就算是完成了，但是组件通讯的方式我们仅用到了父组件向子组件传递数据，还有其他的通讯方式没有用到，具体的通讯方式使用可以在[官方文档父子组件通讯](https://doc.quickapp.cn/tutorial/framework/parent-child-component-communication.html)中看到。

### 练习

组件化的方法不是很难，主要是结合具体业务和组件逻辑做出不同的判断和调整，我们的豆瓣电影快应用的电影列表也是一个在两个页面都用到了的组件，下面可以请大家自行实现对电影列表的组件化。

-----------

作者：dadong

时间：2018.11.24

