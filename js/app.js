;(function () {

	// Your starting point. Enjoy the ride!
	// const todos = [
	// 	{
	// 		id:1,
	// 		title:"鸡肉米线",
	// 		completed:true,
			
	// 	},
	// 	{
	// 		id:2,
	// 		title:"混炒",
	// 		completed:false,
			
	// 	},
	// 	{
	// 		id:3,
	// 		title:"敲代码",
	// 		completed:true,
			
	// 	},
	// 	{
	// 		id:4,
	// 		title:"学习使我快乐",
	// 		completed:false,
			
	// 	}
	// ];
	// 
	// 注册一个全局自定义指令 `v-focus`
	Vue.directive('focus', {
	  // 当被绑定的元素插入到 DOM 中时……
	  inserted: function (el) {
	    // 聚焦元素
	    el.focus()
	  }
	})

	Vue.directive('todo-focus', {
	  // 当被绑定的元素插入到 DOM 中时……
	  update: function (el,binding) {
	    // 聚焦元素
	    console.log("binding",binding.value);
	   if (binding.value) {
	   	 el.focus()
	   }
	  }
	})

	const app=new Vue ({
		el: '#app',
		data:{
			todos:JSON.parse(window.localStorage.getItem('todos') ||　'[]'),
			currentEditing: null,
			filterText:''
		},
		// 计算属性
		computed:{
			remaningCount:function(){
				return this.todos.filter(item =>!item.completed).length;
			},

			toggleAllStat:{
				get(){ 
					return this.todos.every(t =>t.completed);
				},
				set(){
					const checked = !this.toggleAllStat;
					this.todos.forEach(item =>{
						item.completed = checked;
					})
				}
			},
			filterTodos(){
				// all
				// return this.todos
				// active 
				// return this.todos.filter(t => !t.completed);
				// completed
				// return this.todos.filter(t=>t.completed)
				switch(this.filterText){
					case 'active':
						return this.todos.filter(t => !t.completed);
						break;
					case 'completed':
						return this.todos.filter(t => t.completed);
						break;
					default:
						return this.todos;
						break;
				}
			}

		},

		watch:{
			 todos:{
			 	handler: function (val, oldVal) {
			 		// console.log(val);
			 		// console.log(oldVal);
			 		window.localStorage.setItem('todos',JSON.stringify(val));
			 	 },
      			deep: true,
			 }
		},
		methods: {
			// 回车
			handleNewTodoKeyDown (e) {
				 console.log(e);
				// 0. 注册按下的回车事件
		        // 1. 获取文本框的内容
		        // 2. 数据校验
		        // 3. 添加到 todos 列表
		        // 4. 清空文本框
	        	const target = e.target.value.trim();
	        	if(!target.length){
	        		return
	        	}
	        	const todos = this.todos;
	        	todos.push({
	        		id:todos.length ? todos[todos.length - 1].id +1 :1,
	        		title:target,
	        		completed:false
	        	});
	        	e.target.value="";
			},
			// 删除一行
			handleDel(index){
				this.todos.splice(index,1);
			},
			// 全选
			handleChange(e){
				 console.log(e);
				const checked = e.target.checked;
				this.todos.forEach(item=>{
					item.completed = checked;
				})
			},
			// 双击编辑,
			handleEditingDb(item){
				console.log(1);
				this.currentEditing = item;
			},
			// 敲回车,失焦保存编辑
			handleEnterSave(item,index,e){

				const target = e.target
		        const value = target.value.trim()

		        // 数据被编辑为空的了，直接删除
		        if (!value.length) {
		          this.todos.splice(index, 1)
		        } else {
		          item.title = value;
		          this.currentEditing = null;
		        }
			},
			handleCancelEditEsc () {
		        // 1. 把样式给去除
		        this.currentEditing = null
		    },
		    handleClearAll(){
		    	console.log(1);
		    	for (var i =0 ;i<this.todos.length;i++){
		    		if (this.todos[i].completed) {
		    			this.todos.splice(i,1);
		    			i--;
		    		}
		    	}	
		    },
		  
		}
	})//.$mount("#app");
	  //
	  handlehashchange();
	  window.onhashchange = handlehashchange

	  function handlehashchange() {
	    app.filterText = window.location.hash.substr(2)
	  }
})();


/*
 *
 *
 */