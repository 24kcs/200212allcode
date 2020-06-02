/**
 * 面试题:说说你对象数据劫持及数据绑定的理解
 * Vue中的数据劫持observer(dep对象)和数据绑定watcher对象
 * 数据劫持:无非就是在创建Vue的实例时候,把vm.data中所有的属性一个一个添加observer的data对象上,同时产生对应个数的dep对象
 * 数据绑定:模版解析的时候,获取表达式的值的时候,开始创建watcher对象,并建立dep对象和watcher对象的关系,在内存的文档碎片对象中,进行表达式的值的解析,最终把data对象中的属性和html模版中的表达式联系起来
 *  在实例化Vue的时候,先实现数据代理操作,然后在模版解析之前,实现数据劫持,此时调用的是observe()方法,并传入data对象和vm对象,内部会先判断data数据是不是一个对象,如果是一个对象则开始创建劫持实例对象,在创建劫持对象的时候,通过遍历vm对象中data对象内部所有的属性的时候,开始创建dep对象(data中有一个属性就会创建一个dep对象,多少个属性就会创建多少个dep对象),然后通过Object.defineProperty()方法,把vm.data对象中所有的属性一个一个的添加到劫持对象的data对象中,此时实现了数据劫持操作.
    数据劫持操作后,开始模版解析,模版解析的过程中,先创建文档碎片对象,并在内部把html容器中所有的节点全部的扔进文档碎片对象中,开始进行遍历操作,无论当前的节点是标签还是文本,只要是用到了表达式,最终都会直接或者间接的调用内部的bind方法,在bind方法的内部会开始创建watcher对象(html模版中有一个表达式就创建一个watcher对象,多少个表达式就创建多少个watcher对象),然后在实例化watcher对象的内部,需要获取表达式的值,在获取表达式的值的时候,会自动的进入MVVM内部的Object.dineProperty方法的get方法内部,就会自动的介入Observer中的Object.dineProperty方法的get方法内部,内部开始判断是否存在watcher对象,如果存在则调用dep对象的相关方法并传入dep对象本身,内部实际上是调用的watcher对象的addDep方法,内部是把watcher对象添加到dep对象的subs数组中,dep的id及dep对象以键值对的方式存储到watcher对象的depIds对象中,此时dep对象和watcher对象关系建立完毕,关系一旦建立后则回到compile中,文档碎片对象内部的解析操作完成,添加到html容器中,页面开始正常的显示
    dep对象和watcher对象建立关系后,关系有如下几种:
    一对一的关系:一个dep对应一个watcher:data中定义了一个属性,html模版中用了一个表达式
    一对多的关系:一个dep对应多个watcher:data中定义了一个属性,html模版中用了多个表达式
    多对一的关系:多个dep对应一个watcher:data中定义了多个属性,html模版中用了一个表达式
    多对多的关系:多个dep对应多个watcher:data中定义了多个属性,html模版中用了多个表达式
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */