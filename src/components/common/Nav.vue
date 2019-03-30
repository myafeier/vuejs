<template>
	<div style="height: 93.7vh;">
		<ul class="navBox" ref="menus">

			<li class="navPrimary" v-for="(menu,index) in menus" :key='index'>
				<span class="linka da_bg" :class="{active:menu.id == $route.meta.cid}" @click="MenuParent(index, menu.url)">
					<i :class="menu.icon"></i>
					{{ menu.description }}
					<i v-if="menu.children" :class="menu.is_show ? 'el-icon-arrow-down linka-icon-dow' : 'el-icon-arrow-down linka-icon-dow transformRight'"></i>
				</span>
				<ul class="navSecond" v-show="menu.is_show">
					<li v-for="(child,index) in menu.children" @click="$router.push({name: child.url})" :key='index'>
						<span class="linka zi_font" :class="{active:child.id == $route.meta.cid}">{{ child.description }}</span>
					</li>
				</ul>
			</li>

		</ul>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'Nav',
		data() {
			return {
				activeMenu: '',
				// name用于高亮设置，url用于跳转
				menus: [{
					id: 1,
					name: 'Home',
					url: 'Home',
					description: '主页',
					icon: 'iconfont icon-home',
					is_show: true
				}, {
					id: 2,
					name: 'Users',
					url: 'Users',
					description: '用户管理',
					icon: 'iconfont icon-ic_assignment',
					is_show: true
				}, {
					id: 3,
					name: 'ProductInfo',
					url: 'ProductInfo',
					description: '品类信息管理',
					icon: 'iconfont icon-settings',
					is_show: true,
					
				}, {
					id: 4,
					name: 'Product',
					url: 'Product',
					description: '产品管理',
					icon: 'iconfont icon-settings',
					is_show: true,
					
				}, {
					id: 5,
					name: 'Query',
					url: 'Query',
					description: '查询管理',
					icon: 'iconfont icon-settings',
					is_show: true,
					
				},{
					
				}
				]
			}
		},
		computed: {
			...mapState([
				'MenusData'
			])
		},
		methods: {
			...mapActions([
				'getMenus'
			]),
			async getData() {
				if(this.MenusData.length == 0) {
					this.loading = true
				}
				await this.getMenus()
				this.loading = false
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			MenuParent(index, url) {
				console.log(index)
				console.log(url)
				if(url == 'Home'){
					this.$router.push({name: url})
				}else{
					this.$router.push({name: url})
					this.menus[index].is_show = !this.menus[index].is_show
				}
				console.log(this.menus)
			}
		},
		mounted() {
			//this.getData()
		},
		watch: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.el-menu-vertical-demo {
		border-right: none;
	}
	.transformRight{
		transform: rotate(-90deg);
	}

	.navBox {
		text-align: left;
		width: 230px;
		color: rgb(165, 172, 179);
		height: 93.7vh;
	}

	.navPrimary {}

	.navPrimary i {
		margin-right: 10px;
		color: #9A9A9A;
		vertical-align: middle;
		transition: transform .3s,-webkit-transform .3s;
	}

	.da_bg {
		background-color: rgb(3, 27, 55);
		font-size: 14px;
	}

	.zi_font {
		font-size: 13px;
		padding-left: 56px !important;
	}

	.navSecond li {
		margin-top: .6rem;
	}

	.linka {
		cursor: pointer;
		height: 56px;
		display: block;
		padding: 0 20px;
		line-height: 56px;
		&-icon-dow {
			float: right;
			margin-top: 22px;
		}
	}

	.linka:hover {}

	.linka.active,
	.linka.active i {
		background: rgb(0, 140, 244);
		color: #ffffff;
	}
</style>
