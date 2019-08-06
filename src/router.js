import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import LoginPage from './views/LoginPage.vue'
import MakeContents from './views/MakeContents'
import TeamGitGraph from './views/TeamGitGraph.vue'
import ProfilePage from './views/ProfilePage.vue'
import PortDetail from './views/PortDetail.vue'
import PostDetail from './views/PostDetail.vue'
import Admin from './views/Admin.vue'
import HelloUniverse from './views/HelloUniverse.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'intro',
			component: HelloUniverse
		},
		{
			path: '/home',
			name: 'home',
			component: HomePage
		},
		{
			path: '/post',
			name: 'post',
			component: PostPage
		},
		{
			path: '/portfolio',
			name: 'portfolio',
			component: PortfolioPage
		},
		{
			path: '/team3',
			name: 'team3',
			component: TeamGitGraph
		},
		{
			path: '/login',
			name: 'login',
			component: LoginPage
		},
		{
			path: '/makecontents/:kind',
			name: 'makecontents',
			component: MakeContents,
			props: true //props access permission

		},
		{	
			path: '/profile',
			name: 'profile',
			component: ProfilePage
		},
		{
			path: '/portdetail/:id',
			name: 'portdetail',
			component: PortDetail,
			props: true //props access permission
		},
		{
			path: '/postdetail/:id',
			name: 'postdetail',
			component: PostDetail,
			props: true
		},
		{
			path: '/admin',
			name: 'admin',
			component: Admin,
		},
	],
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})