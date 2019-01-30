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
import LabelCountAll from '@/components/page/LabelCountAll'
import Registered from '@/components/page/Registered'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/Welcome',
      component: Welcome,
      name:'首页',
      children: [{
          path: '/skillColumn',
					name:'技能栏目管理',
          component: SkillColumn
        },
        {
          path: '/skillDetail',
					name:'技能详情管理',
          component: SkillDetail
        },
        {
          path: '/about',
					name:'关于我们',
          component: About
        },
        {
          path: '/act',
					name:'节目管理',
          component: Act
        },
        {
          path: '/actDetail',
					name:'节目详情管理',
          component: ActDetail
        },
        {
          path: '/advice',
					name:'化妆建议管理',
          component: Advice
        },
        {
          path: '/aim',
					name:'化妆目的管理',
          component: Aim
        },
        {
          path: '/branch',
					name:'步骤子类管理',
          component: Branch,
        },
        {
          path: '/brand',
					name:'品牌管理',
          component: Brand,
        },
        {
          path: '/classify',
					name:'',
          component: Classify
        },
        {
          path: '/color',
					name:'产品色号管理',
          component: Color
        },
        {
          path: '/constellation',
					name:'星座管理',
          component: Constellation
        },
        {
          path: '/constellationDetail',
					name:'',
          component: ConstellationDetail
        },
        {
          path: '/log',
					name:'系统日志',
          component: Log
        },
        {
          path: '/evaluation',
					name:'',
          component: Evaluation
        },
        {
          path: '/face',
					name:'',
          component: Face
        },
        {
          path: '/feedback',
					name:'用户反馈管理',
          component: Feedback
        },
        {
          path: '/icon',
					name:'首页icon管理',
          component: Icon
        },
        {
          path: '/ingredient',
					name:'化妆品成分管理',
          component: Ingredient
        },
        {
          path: '/issue',
					name:'肌肤问题管理',
          component: Issue
        },
        {
          path: '/keyword',
					name:'关键词管理',
          component: Keyword
        },
        {
          path: '/main',
					name:'步骤主类管理',
          component: Main
        },
        {
          path: '/makeup',
					name:'化妆产品管理',
          component: Makeup
        },
        {
          path: '/marking',
					name:'',
          component: Marking
        },
        {
          path: '/markingDetail',
					name:'',
          component: MarkingDetail
        },
        {
          path: '/member',
					name:'',
          component: Member
        },
        {
          path: '/menu',
					name:'菜单管理',
          component: Menu
        },
        {
          path: '/module',
					name:'',
          component: Module
        },
        {
          path: '/part',
					name:'角色管理',
          component: Part
        },
        {
          path: '/product',
					name:'产品分类管理',
          component: Product
        },
        {
          path: '/rotation',
					name:'',
          component: Rotation
        },
        {
          path: '/search',
					name:'',
          component: Search
        },
        {
          path: '/strategy',
					name:'',
          component: Strategy
        },
        {
          path: '/tag',
					name:'标签管理',
          component: Tag
        },
        {
          path: '/teach',
					name:'妆容教程管理',
          component: Teach
        },
        {
          path: '/temperament',
					name:'',
          component: Temperament
        },
        {
          path: '/user',
					name:'',
          component: User,
        },
        {
          path: '/labelCountAll',
					name:'标签埋点',
          component: LabelCountAll,
        },
        {
          path: '/registeredUser',
					name:'用户基础数据',
          component: Registered,
        },
        {
          path: '/vipMsg',
					name:'会员信息管理',
          component: VipMsg
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
