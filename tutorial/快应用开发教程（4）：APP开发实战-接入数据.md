## 快应用开发教程（4）：APP开发实战-接入数据

上一篇中我们把应用需要的页面搭建了出来，已经可以看出整个应用的雏形了，可是数据都还是写死在模板中的，所以接下来我们把数据接口中的动态数据接入，让我们的应用真正可用起来。

### 准备工作

#### 数据接口

##### **1.  查询正在上映的院线电影列表**

接口功能

> 获取院线正在上映的电影列表

URL

> https://api.douban.com/v2/movie/in_theaters

支持格式

> JSON

HTTP请求方式

> GET

请求参数

> | 参数  | 必选  | 类型   | 默认值 | 说明                     |
> | :---- | :---- | :----- | ------ | ------------------------ |
> | count | false | int    | 20     | 请求的电影列表每页的数量 |
> | start | false | int    | 0      | 请求的电影列表开始的位置 |
> | city  | false | string | '北京' | 请求所在城市的电影列表   |

返回字段

> | 返回字段 | 字段类型 | 说明                     |
> | :------- | :------- | :----------------------- |
> | count    | int      | 电影列表每页的数量       |
> | start    | int      | 请求的电影列表开始的位置 |
> | total    | int      | 列表全部元素数量         |
> | subjects | array    | 电影列表数据             |
> | title    | string   | 标题                     |

接口示例

> 地址：[https://api.douban.com/v2/movie/in_theaters?count=10&city=深圳&start=0](https://api.douban.com/v2/movie/in_theaters?count=10&city=深圳&start=0)
``` json
{
  "count": 20,
  "start": 0,
  "total": 38,
  "subjects": [···],
  "title": "正在上映的电影-深圳"
}
```

##### **2.  查询即将上映的院线电影列表**

接口功能

> 获取即将上映的电影列表

URL

> https://api.douban.com/v2/movie/coming_soon

支持格式

> JSON

HTTP请求方式

> GET

请求参数

> | 参数  | 必选  | 类型 | 默认值 | 说明                     |
> | :---- | :---- | :--- | ------ | ------------------------ |
> | count | false | int  | 20     | 请求的电影列表每页的数量 |
> | start | false | int  | 0      | 请求的电影列表开始的位置 |

返回字段

> | 返回字段 | 字段类型 | 说明                     |
> | :------- | :------- | :----------------------- |
> | count    | int      | 电影列表每页的数量       |
> | start    | int      | 请求的电影列表开始的位置 |
> | total    | int      | 列表全部元素数量         |
> | subjects | array    | 电影列表数据             |
> | title    | string   | 标题                     |

接口示例

> 地址：[https://api.douban.com/v2/movie/coming_soon?count=10&start=0](https://api.douban.com/v2/movie/coming_soon?count=10&start=0)

```json
{
  "count": 20,
  "start": 0,
  "total": 38,
  "subjects": [···],
  "title": "即将上映的电影"
}
```

##### **3.  查询豆瓣电影TOP250电影列表**

接口功能

> 获取豆瓣电影TOP250电影列表

URL

> https://api.douban.com/v2/movie/top250

支持格式

> JSON

HTTP请求方式

> GET

请求参数

> | 参数  | 必选  | 类型 | 默认值 | 说明                     |
> | :---- | :---- | :--- | ------ | ------------------------ |
> | count | false | int  | 20     | 请求的电影列表每页的数量 |
> | start | false | int  | 0      | 请求的电影列表开始的位置 |

返回字段

> | 返回字段 | 字段类型 | 说明                     |
> | :------- | :------- | :----------------------- |
> | count    | int      | 电影列表每页的数量       |
> | start    | int      | 请求的电影列表开始的位置 |
> | total    | int      | 列表全部元素数量         |
> | subjects | array    | 电影列表数据             |
> | title    | string   | 标题                     |

接口示例

> 地址：[https://api.douban.com/v2/movie/top250?count=10&start=0](https://api.douban.com/v2/movie/top250?count=10&start=0)

```json
{
  "count": 20,
  "start": 0,
  "total": 38,
  "subjects": [···],
  "title": "豆瓣电影Top250"
}
```

##### **4.  查询单个电影详情信息**

接口功能

> 获取单个电影详情信息

URL

> https://api.douban.com/v2/movie/subject/:movie_id

支持格式

> JSON

HTTP请求方式

> GET

返回字段

> 字段太多请自行点开下面的接口示例查看

接口示例

> 地址：[https://api.douban.com/v2/movie/subject/3168101](https://api.douban.com/v2/movie/subject/3168101)

```json
{
  "id": "3168101",
  "title": "毒液：致命守护者",
  "year": "2018",
  "directors": [···],
  "original_title": "Venom",
  ···
}
```

#### 请求数据的方法

有了数据接口，接下来就是要发起请求了，在快应用中提供了请求数据的系统接口`@sytem.fetch`。接口的使用按照下列步骤进行。

1. 在`manifest.json`文件中的`feature`字段下声明要使用的接口

```json
{
    ···
    "feature": [
        {"name": "system.fetch"},
		···
    ]
}
```

2. 在要使用接口的位置导入

```javascript
import fetch from '@system.fetch' 
```

3. 使用`fetch`请求数据

```javascript
fetch.fetch({
    url: 'http://www.example.com',
    success: function (response) {
        console.log(`the status code of the response: ${response.code}`)
        console.log(`the data of the response: ${response.data}`)
        console.log(`the headers of the response: ${JSON.stringify(response.headers)}`)
    },
    fail: function (err, code) {
        console.log(`handling fail, code = ${code}`)
    }
})
```

关于数据请求接口更详细的说明可以在[官方文档](https://doc.quickapp.cn/features/system/fetch.html)中查看。

#### 绑定数据的方法

数据请求回来了，我们还需要让数据渲染到组件上去，快应用中模板数据的绑定方法和目前主流前端框架的方式类似。首先在页面`script`中提前声明需要绑定的数据。

```html
<template>
    <text>{{message}}</text>
</template>

<script>
    export default {
        protected: {
            message: 'Hello'
        }
    }
</script>
```

`protected`是快应用数据位置的关键字，和它功能相似的还有`public`和`private`。他们之间的区别见下表。

| 属性      | 类型   | 描述                                                         |
| --------- | ------ | ------------------------------------------------------------ |
| public    | Object | public内定义的属性允许被传入的数据覆盖，如果外部传入数据的某个属性未被声明，在public中不会新增这个属性 |
| protected | Object | protected内定义的属性，允许被应用内部页面请求传递的数据覆盖，不允许被应用外部请求传递的数据覆盖 |
| private   | Object | private内定义的属性不允许被覆盖                              |

### 接入数据

在做好上述的准备工作后，可以正式把数据接入到我们的应用上了。用上面准备的方式写好请求数据的方法。这里以首页正在热映的数据请求为例。

`template`代码

```html
<list class="movie-list">
    <block for="movie in movies">
        <list-item type="movie">
            <div class="movie">
                <div class="poster">
                    <image src="{{movie.images.large}}"></image>
                </div>
                <div class="info">
                    <div class="top">
                        <div class="title">
                            <text class="name">{{movie.title}}</text>
                            <text class="year">{{movie.year}}</text>
                        </div>
                        <div class="rating">
                            <text class="average">{{movie.rating.average}}</text>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="wrap">
                            <text>类型: </text>
                            <text>
                                <block for="type in movie.genres">
                                    <span>{{type}}</span>
                                </block>
                            </text>
                        </div>
                        <div class="wrap">
                            <text>演员: </text>
                            <text>
                                <block for="actor in movie.casts">
                                    <span>{{actor.name}}</span>
                                </block>
                            </text>
                        </div>
                        <div class="wrap">
                            <text>导演: </text>
                            <text>
                                <block for="director in movie.directors">
                                    <span>{{director.name}}</span>
                                </block>
                            </text>
                        </div>
                    </div>
                </div>
            </div>
        </list-item>
    </block>
    <list-item type="nomore">
        <text>没有更多了~</text>
    </list-item>
</list>
```

`script`代码

```javascript
import router from "@system.router";
import fetch from "@system.fetch";

export default {
    protected: {
        movies: []
    },
    onInit: function () {
        this.getMovieList(); // 在页面初始化的时候后请求数据
    },
    switchTab: function (uri) {
        router.replace({
            uri: uri
        })
    },
    getMovieList: function () {
        const that = this; // 保存当前this
        fetch.fetch({
            url: 'https://api.douban.com/v2/movie/in_theaters?count=10&start=0',
            success: function (response) {
                let data = JSON.parse(response.data); // 解析请求回来的数据为对象
                if (response.code === 200) { // 判断当前请求是否成功返回
                    that.movies = data.subjects; // 把请求到的数据赋值到定义的变量上去
                }
            },
            fail: function (err, code) {
                console.log(`handling fail, code = ${code}`);
            }
        })
    }
}
```

现在页面已经像是那么回事了，但是还缺少数据请求的交互，例如顶部筛选器的点击事件还没有，电影列表滚动到底部加载更多也还没有处理，下面我们一个一个处理。

#### 滚动到底部加载更多

监听列表滚动到底部的是`list`组件的`scrollbottom`事件，事件有两种方式绑定到组件上。

```html
<div>
    <!-- 正常格式 -->
    <list onscrollbottom="getMore"></list>
    <!-- 缩写 -->
    <list @scrollbottom="getMore"></list>
</div>
```

给`list`组件绑定好的监听滚动底部事件的方法，然后我们要处理的就是滚动到底部后要执行的方法了，这个方法是这样处理的。

```javascript
protected: {
  movies:[],
  start: 0, // 请求数据开始的位置
  count: 10 // 每次请求回来的列表元素个数
},
getMovieList: function () {
    const that = this; // 保存当前this
    fetch.fetch({
        url: 'https://api.douban.com/v2/movie/in_theaters?count='+ that.count +'&start='+ that.start,
        success: function (response) {
            let data = JSON.parse(response.data); // 解析请求回来的数据为对象
            if (response.code === 200) { // 判断当前请求是否成功返回
                that.movies = that.movies.concat(data.subjects); // 把请求到的数据赋值到定义的变量上去
        		that.start += that.count; // 每次请求成功后给start增加页码
            }
        },
        fail: function (err, code) {
            console.log(`handling fail, code = ${code}`);
        }
    })
}
```

为了优化数据加载的体验，我们简单给数据列表加上`loading`和没有更多数据的提示。

```html
<list>
    ···
    <list-item class="more" type="more">
        <div if="!more"><progress type="circular"></progress></div>
        <div if="more"><text>没有更多了~</text></div>
    </list-item>
</list>
```

```css
.more {
    justify-content: center;
}
```

```diff
    protected: {
        movies: [],
        start: 0,
        count: 10,
+        more: false
    },
    getMovieList: function () {
        const that = this; // 保存当前this
        fetch.fetch({
            url: 'https://api.douban.com/v2/movie/in_theaters?count=' + that.count + '&start=' + that.start,
            success: function (response) {
                let data = JSON.parse(response.data); // 解析请求回来的数据为对象
                if (response.code === 200) { // 判断当前请求是否成功返回
                    that.movies = that.movies.concat(data.subjects); // 把请求到的数据赋值到定义的变量上去
                    that.start += that.count; // 每次请求成功后给start增加页码
                }
+                if (that.movies.length === data.total) {
+                    that.more = true;
+                }
            },
            fail: function (err, code) {
                console.log(`handling fail, code = ${code}`);
            }
        })
    }
```

#### 顶部筛选器事件处理

筛选器的实现有很多种方式，这里采取最简单的方式。

`template`代码

```html
<div class="filter-wrap">
    <text class="filter {{type === 'in_theaters'? 'active': ''}}" onclick="getMovieListByType('in_theaters')">正在热映</text>
    <text class="filter {{type === 'coming_soon'? 'active': ''}}" onclick="getMovieListByType('coming_soon')">即将上映</text>
</div>
```

`script`代码

```diff
export default {
    protected: {
        movies: [],
        start: 0,
        count: 10,
        more: false,
+        type: 'in_theaters'
    },
    onInit: function () {
        this.getMovieList();
    },
    switchTab: function (uri) {
        router.replace({
            uri: uri
        })
    },
    getMovieList: function () {
        const that = this; // 保存当前this
        fetch.fetch({
+            url: 'https://api.douban.com/v2/movie/' + that.type + '?count=' + that.count + '&start=' + that.start,
            success: function (response) {
                let data = JSON.parse(response.data); // 解析请求回来的数据为对象
                if (response.code === 200) { // 判断当前请求是否成功返回
                    that.movies = that.movies.concat(data.subjects); // 把请求到的数据赋值到定义的变量上去
                    that.start += that.count; // 每次请求成功后给start增加页码
                }
                if (that.movies.length === data.total) {
                    that.more = true;
                }
            },
            fail: function (err, code) {
                console.log(`handling fail, code = ${code}`);
            }
        })
    },
+    getMovieListByType: function (type) {
+        this.start = 0;
+        this.movies = [];
+        this.more = false;
+        this.type = type;
+        this.getMovieList();
+    }
}
```

#### 处理跳转详情页

现在我们给单个电影加上跳转详情页的事件。

`template`代码

```html
<list-item type="movie" onclick="gotoDetail(movie.id)">
···
</list-item>
```

`script`代码

```javascript
gotoDetail: function (id) {
    router.push({
        uri: '/page/detail',
        params: {
            id: id
        }
    })
}
```

这个跳转方法我们采用`router`模块的`push`方法，同时在跳转的同时把当前点击的电影ID当做参数传到详情页，详情页取到传递过来的`id`，根据这个再请求到对应的电影详细信息。

#### 详情页数据接入

详情页通过传递进来的`id`，发送获取详细信息的请求，根据请求回来的数据渲染页面。绑定数据的方法上面已经演示过了，下面就不再赘述了。

详情页`script`代码

```javascript
import fetch from "@system.fetch";

export default {
    protected: {
        id: 0, // 上个页面传过来的id，一定要在此定义，不然无法访问
        movie: {}
    },
    onInit: function () {
        this.getMovieById();
    },
    getMovieById: function () {
        const that = this; // 保存当前this
        fetch.fetch({
            url: 'https://api.douban.com/v2/movie/subject/' + that.id,
            success: function (response) {
                let data = JSON.parse(response.data);
                if (response.code === 200) {
                    that.movie = data;
                    that.$page.setTitleBar({ text: data.title }); // 设置页面标题
                }
            },
            fail: function (err, code) {
                console.log(`handling fail, code = ${code}`);
            }
        })
    }
}
```

现在还剩下最后一个页面榜单页作为练习留给大家自行实现数据接入。

下一篇我们来讲如何把我们写的代码组件化，降低代码耦合度，增加代码的可复用性，提高整个应用的组件化程度。

-------------

作者：dadong

时间：2018.11.23

