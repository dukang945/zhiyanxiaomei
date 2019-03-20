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
import UserInterested from '@/components/page/UserInterested'
import Workspace from '@/components/page/Workspace'
import Eye from '@/components/page/Eye'
import Nose from '@/components/page/Nose'
import Lip from '@/components/page/Lip'
import Hair from '@/components/page/Hair'
import Praise from '@/components/page/Praise'
import Star from '@/components/page/Star'
import HusbandStar from '@/components/page/HusbandStar'
import SimilarCelebrity from '@/components/page/SimilarCelebrity'
import Emotion from '@/components/page/Emotion'
import Answer from '@/components/page/Answer'
import ShareDescribe from '@/components/page/ShareDescribe'
import InterestedTest from '@/components/page/InterestedTest'
import CategoryProblem from '@/components/page/CategoryProblem'
import KnowledgeMes from '@/components/page/KnowledgeMes'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/Welcome',
      component: Welcome,
      name:'首页',
			redirect:'workspace',
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
					name:'美妆测评分类',
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
					name:'星座详情管理',
          component: ConstellationDetail
        },
        {
          path: '/log',
					name:'系统日志',
          component: Log
        },
        {
          path: '/evaluation',
					name:'美妆测评',
          component: Evaluation
        },
        {
          path: '/eye',
					name:'眼部管理',
          component: Eye
        },
        {
          path: '/face',
					name:'脸部管理',
          component: Face
        },
        {
          path: '/lip',
					name:'唇部管理',
          component: Lip
        },
        {
          path: '/nose',
					name:'鼻部管理',
          component: Nose
        },
        {
          path: '/hair',
					name:'发型管理',
          component: Hair
        },
        {
          path: '/praise',
					name:'夸奖的话',
          component: Praise
        },
        {
          path: '/star',
					name:'明星管理',
          component: Star
        },
        {
          path: '/husbandStar',
					name:'明星夫妻',
          component: HusbandStar
        },
        {
          path: '/similarCelebrity',
					name:'相似名人管理',
          component: SimilarCelebrity
        },
        {
          path: '/emotion',
					name:'AI识颜情绪管理',
          component: Emotion
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
					name:'妆容打分',
          component: Marking
        },
        {
          path: '/markingDetail',
					name:'妆容打分详情',
          component: MarkingDetail
        },
        {
          path: '/member',
					name:'美妆镜会员信息',
          component: Member
        },
        {
          path: '/menu',
					name:'菜单管理',
          component: Menu
        },
        {
          path: '/module',
					name:'美妆模块图',
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
          path: '/categoryProblem',
					name:'产品分类问题及答案',
          component: CategoryProblem
        },
        {
          path: '/rotation',
					name:'轮播图',
          component: Rotation
        },
        {
          path: '/search',
					name:'热搜信息管理',
          component: Search
        },
        {
          path: '/strategy',
					name:'护肤攻略管理',
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
					name:'妆容定制气质管理',
          component: Temperament
        },
        {
          path: '/user',
					name:'后台用户管理',
          component: User,
        },
        {
          path: '/userInterested',
					name:'用户星座和感兴趣标签',
          component: UserInterested,
        },
        {
          path: '/labelCountAll',
					name:'标签数据统计',
          component: LabelCountAll,
        },
        {
          path: '/registeredUser',
					name:'用户基础数据',
          component: Registered,
        },
				{
					path: '/beautyMakeupDataAll',
					name:'文章数据统计',
					component: BeautyMakeupDataAll,
				},
				{
					path: '/knowledgeMes',
					name:'文章数据统计',
					component: KnowledgeMes,
				},
        {
          path: '/vipMsg',
					name:'会员信息管理',
          component: VipMsg
        },
				{
					path:'/beautyknowledge',
					name:'美妆知识',
					component: Beautyknowledge
				},
				{
					path:'/hotsearch',
					name:'大家都在搜',
					component: Hotsearch
				},
				{
					path:'/answer',
					name:'答案之书管理',
					component: Answer
				},
				{
					path:'/shareDescribe',
					name:'分享描述管理',
					component: ShareDescribe
				},
				{
					path:'/interestedTest',
					name:'感兴趣内容测试图管理',
					component: InterestedTest
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
