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


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/welcome',
      component: Welcome,
      children: [{
          path: '/skillColumn',
          component: SkillColumn
        },
        {
          path: '/skillDetail',
          component: SkillDetail
        },
        {
          path: '/about',
          component: About
        },
        {
          path: '/act',
          component: Act
        },
        {
          path: '/actDetail',
          component: ActDetail
        },
        {
          path: '/advice',
          component: Advice
        },
        {
          path: '/aim',
          component: Aim
        },
        {
          path: '/branch',
          component: Branch
        },
        {
          path: '/brand',
          component: Brand
        },
        {
          path: '/classify',
          component: Classify
        },
        {
          path: '/color',
          component: Color
        },
        {
          path: '/constellation',
          component: Constellation
        },
        {
          path: '/constellationDetail',
          component: ConstellationDetail
        },
        {
          path: '/log',
          component: Log
        },
        {
          path: '/evaluation',
          component: Evaluation
        },
        {
          path: '/face',
          component: Face
        },
        {
          path: '/feedback',
          component: Feedback
        },
        {
          path: '/icon',
          component: Icon
        },
        {
          path: '/ingredient',
          component: Ingredient
        },
        {
          path: '/issue',
          component: Issue
        },
        {
          path: '/keyword',
          component: Keyword
        },
        {
          path: '/main',
          component: Main
        },
        {
          path: '/makeup',
          component: Makeup
        },
        {
          path: '/marking',
          component: Marking
        },
        {
          path: '/markingDetail',
          component: MarkingDetail
        },
        {
          path: '/member',
          component: Member
        },
        {
          path: '/menu',
          component: Menu
        },
        {
          path: '/module',
          component: Module
        },
        {
          path: '/part',
          component: Part
        },
        {
          path: '/product',
          component: Product
        },
        {
          path: '/rotation',
          component: Rotation
        },
        {
          path: '/search',
          component: Search
        },
        {
          path: '/strategy',
          component: Strategy
        },
        {
          path: '/tag',
          component: Tag
        },
        {
          path: '/teach',
          component: Teach
        },
        {
          path: '/temperament',
          component: Temperament
        },
        {
          path: '/user',
          component: User
        },
        {
          path: '/vipMsg',
          component: VipMsg
        }
      ]
    },
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '/login',
      component: Login
    },

  ]
})
