import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/page/Welcome'
import Login from '@/components/page/login'
import SkillColumn from '@/components/page/SkillColumn'
import SkillDetail from '@/components/page/SkillDetail'
import About from '@/components/page/About'
import Act from '@/components/page/Act'
import ActDetail from '@/components/page/ActDetail'
import Advice from '@/components/page/Advice'
import Aim from '@/components/page/Aim'
import Branch from '@/components/page/Branch'
import Brand from '@/components/page/Brand'
import Classify from '@/components/page/Classify'
import Color from '@/components/page/Color'
import Constellation from '@/components/page/Constellation'
import ConstellationDetail from '@/components/page/ConstellationDetail'
import Log from '@/components/page/Log'
import Evaluation from '@/components/page/Evaluation'
import Face from '@/components/page/Face'
import Feedback from '@/components/page/Feedback'
import Icon from '@/components/page/Icon'
import Ingredient from '@/components/page/Ingredient'
import Issue from '@/components/page/Issue'
import Keyword from '@/components/page/Keyword'
import Main from '@/components/page/Main'
import Makeup from '@/components/page/Makeup'
import Marking from '@/components/page/Marking'
import MarkingDetail from '@/components/page/MarkingDetail'
import Member from '@/components/page/Member'
import Menu from '@/components/page/Menu'
import Module from '@/components/page/Module'
import Part from '@/components/page/Part'
import Product from '@/components/page/Product'
import Rotation from '@/components/page/Rotation'
import Search from '@/components/page/Search'
import Strategy from '@/components/page/Strategy'
import Tag from '@/components/page/Tag'
import Teach from '@/components/page/Teach'
import Temperament from '@/components/page/Temperament'
import User from '@/components/page/User'
import VipMsg from '@/components/page/VipMsg'
import Beautyknowledge from '@/components/page/Beautyknowledge'
import Hotsearch from '@/components/page/Hotsearch'
import LabelCountAll from '@/components/page/LabelCountAll'
import Registered from '@/components/page/Registered'
import BeautyMakeupDataAll from '@/components/page/BeautyMakeupDataAll'
import Workspace from '@/components/page/Workspace'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/Welcome',
      component: Welcome,
      name:'首页',
			redirect:'/workspace',
      children: [{
          path: '/jnlmgl',
					name:'技能栏目管理',
          component: SkillColumn
        },
        {
          path: '/jnxqgl',
					name:'技能详情管理',
          component: SkillDetail
        },
        {
          path: '/gywmgl',
					name:'关于我们',
          component: About
        },
        {
          path: '/jmgl',
					name:'节目管理',
          component: Act
        },
        {
          path: '/jmxqgl',
					name:'节目详情管理',
          component: ActDetail
        },
        {
          path: '/hzjygl',
					name:'化妆建议管理',
          component: Advice
        },
        {
          path: '/hzmdgl',
					name:'化妆目的管理',
          component: Aim
        },
        {
          path: '/bzzlgl1',
					name:'步骤子类管理',
          component: Branch,
        },
        {
          path: '/ppgl',
					name:'品牌管理',
          component: Brand,
        },
        {
          path: '/classify',
					name:'',
          component: Classify
        },
        {
          path: '/cpshgl',
					name:'产品色号管理',
          component: Color
        },
        {
          path: '/xzgl',
					name:'星座管理',
          component: Constellation
        },
        {
          path: '/xzxqgl',
					name:'星座详情管理',
          component: ConstellationDetail
        },
        {
          path: '/xtrz',
					name:'系统日志',
          component: Log
        },
        {
          path: '/mzcpgl',
					name:'美妆测评',
          component: Evaluation
        },
        {
          path: '/face',
					name:'',
          component: Face
        },
        {
          path: '/yhfk',
					name:'用户反馈管理',
          component: Feedback
        },
        {
          path: '/syicongl',
					name:'首页icon管理',
          component: Icon
        },
        {
          path: '/hzpcfgl',
					name:'化妆品成分管理',
          component: Ingredient
        },
        {
          path: '/jfwtgl',
					name:'肌肤问题管理',
          component: Issue
        },
        {
          path: '/gjcgl',
					name:'关键词管理',
          component: Keyword
        },
        {
          path: '/bzzlgl',
					name:'步骤主类管理',
          component: Main
        },
        {
          path: '/hzcpgl',
					name:'化妆产品管理',
          component: Makeup
        },
        {
          path: '/zrdffl',
					name:'妆容打分分类',
          component: Marking
        },
        {
          path: '/zrdfms',
					name:'妆容打分描述',
          component: MarkingDetail
        },
        {
          path: '/mzjhyxx',
					name:'美妆镜会员信息',
          component: Member
        },
        {
          path: '/cdgl',
					name:'菜单管理',
          component: Menu
        },
        {
          path: '/mzmktgl',
					name:'美妆模块图管理',
          component: Module
        },
        {
          path: '/jsgl',
					name:'角色管理',
          component: Part
        },
        {
          path: '/cpflgl',
					name:'产品分类管理',
          component: Product
        },
        {
          path: '/lbtgl',
					name:'轮播图管理',
          component: Rotation
        },
        {
          path: '/rsxxgl',
					name:'热搜信息管理',
          component: Search
        },
        {
          path: '/hfglgl',
					name:'护肤攻略管理',
          component: Strategy
        },
        {
          path: '/bqgl',
					name:'标签管理',
          component: Tag
        },
        {
          path: '/zrjcgl',
					name:'妆容教程管理',
          component: Teach
        },
        {
          path: '/zrdzqzgl',
					name:'妆容定制气质管理',
          component: Temperament
        },
        {
          path: '/htyhgl',
					name:'后台用户管理',
          component: User,
        },
        {
          path: '/yhxzhgxqbq',
					name:'标签数据统计',
          component: LabelCountAll,
        },
        {
          path: '/yhjcsjmd',
					name:'用户基础数据',
          component: Registered,
        },
				{
					path: '/wzsjmdtj',
					name:'文章数据统计',
					component: BeautyMakeupDataAll,
				},
        {
          path: '/hyxxgl',
					name:'会员信息管理',
          component: VipMsg
        },
				{
					path:'/beautyknowledge',
					name:'美妆知识',
					component: Beautyknowledge
				},
				{
					path:'/mzzs',
					name:'美妆知识',
					component: Hotsearch
				},
				{
					path:'/workspace',
					name:'工作台',
					component: Workspace
				}
      ]
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },

  ]
})
