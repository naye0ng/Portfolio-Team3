import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import LoginPage from './views/LoginPage.vue'
import MakePortfolio from './views/MakePortfolio.vue'
import TeamGitGraph from './views/TeamGitGraph.vue'
import ProfilePage from './views/ProfilePage.vue'
import PortDetail from './views/PortDetail.vue'
Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
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
			path: '/makeport',
			name: 'makeportfolio',
			component: MakePortfolio
		},
		{	
			path: '/profile',
			name: 'profile',
			component: ProfilePage
		},
		{
			path: '/portdetail/:title',
			name: 'portdetail',
			component: PortDetail,
			props: true //props access permission
		}
	]
})
