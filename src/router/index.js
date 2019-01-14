import Vue from 'vue';
import Router from 'vue-router';

import User from '@/components/user';
import Join from '@/components/login/join';
import Article from '@/components/Article';
import Index from '@/components/Index';
import Class from '@/components/Class';
import Comment from '@/components/admin_comment';
import Index_left from '@/components/Index/index_left';
import Index_right from '@/components/Index/index_right';
import Home_index from '@/components/home_index';
import Admin_login from '@/components/admin_login';

import Login_and_reg from '@/components/login/login_and_reg';

import Article_content from '@/components/content/article_content';


import Content from '@/components/content/Content';
import Login from '@/components/login/login';
import Register from '@/components/login/register';

import Home from '@/components/home';

Vue.use(Router);


export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/admin/home',
			component: Home,
			children: [
				{
				  path: '/admin/home',
				  component: Home_index,
				}, {
				  path: '/admin/user',
				  component: User,
				}, {
				  path: '/admin/Article',
				  component: Article,
				}, {
				  path: '/admin/class',
				  component: Class,
				}, {
				  path: '/admin/comment/:coid',
				  component: Comment,
				},
			]
    },
		{
			path: '/admin/',
			component: Admin_login,
			name: 'Admin_login',
			meta: {
				title: '后台登陆程序',
			}
		},
		{
		  path: '/',
			component: Index,
			children: [
				{
					path: '/',
					components: {
						index_left: Index_left,
						index_right: Index_right,
					},
				},
				{
				  path: '/class/:cid',
				  components: {
				    index_left: Index_left,
				    index_right: Index_right,
				  },
				},
				
			]
		},
		{
		  path: '/join',
			component: Join,
			
		},
		{
		  path: '/login',
		  component: Login_and_reg,
			children: [
				{
				  path: '/login',
				  component: Login,
				},
				{
				  path: '/register',
				  component: Register,
				}
			]
		},
		{
		  path: '/article/:aid',
		  component: Content,
		  children: [{
		      path: '/article/:aid',
		      component: Article_content,
		    },

		  ]
		},
  ]
})
