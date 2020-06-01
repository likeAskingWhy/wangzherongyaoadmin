import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
// 分类列表
import Newcategory from '../views/Newcategory.vue'
import Categorylist from '../views/Categorylist.vue'
// 物品列表
import Newitem from '../views/Newitem.vue'
import Itemlist from '../views/Itemlist.vue'
// 英雄列表
import Newhero from '../views/Newhero.vue'
import Herolist from '../views/Herolist.vue'
// 文章列表
import Newarticle from '../views/Newarticle.vue'
import Articlelist from '../views/Articlelist.vue'
// 广告位列表
import Newad from '../views/Newad.vue'
import Adlist from '../views/Adlist.vue'
// 管理员列表
import Newadminuser from '../views/Newadminuser.vue'
import Adminuserlist from '../views/Adminuserlist.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/login', name: 'login', component: Login, meta: { isPublic: true }},
	{
		path: '/',
		name: 'main',
		component: Main,
		children: [
			{ path: '/categories/create', component: Newcategory },
			{ path: '/categories/list', component: Categorylist },
			{ path: '/categories/create/:id', component: Newcategory, props: true },
			
			{ path: '/items/create', component: Newitem },
			{ path: '/items/list', component: Itemlist },
			{ path: '/items/create/:id', component: Newitem, props: true },
			
			{ path: '/heroes/create', component: Newhero },
			{ path: '/heroes/list', component: Herolist },
			{ path: '/heroes/create/:id', component: Newhero, props: true },
			
			{ path: '/articles/create', component: Newarticle },
			{ path: '/articles/list', component: Articlelist },
			{ path: '/articles/create/:id', component: Newarticle, props: true },
			
			{ path: '/ads/create', component: Newad },
			{ path: '/ads/list', component: Adlist },
			{ path: '/ads/create/:id', component: Newad, props: true },
			
			{ path: '/admin_users/create', component: Newadminuser },
			{ path: '/admin_users/list', component: Adminuserlist },
			{ path: '/admin_users/create/:id', component: Newadminuser, props: true },
		]
	},
]

const router = new VueRouter({
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
	if (!to.meta.isPublic && !localStorage.token) {
		return next('/login');
	}
	next();
})

export default router
