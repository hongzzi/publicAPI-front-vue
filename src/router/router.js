import VueRouter from 'vue-router';
import Main from '../components/layout/Contents/Main/Main-container';
import MyPage from '../components/layout/Contents/MyPage/MyPage';
import MyPageDetail from '../components/layout/Contents/MyPage/MyPageDetail';
import MyPageRemove from '../components/layout/Contents/MyPage/MyPageRemove';
import MyPageHistory from '../components/layout/Contents/MyPage/MyPageHistory';
import vNoticeBoardList from '../components/layout/Contents/Notice/notice-board-list';
import vNoticeBoardDetail from '../components/layout/Contents/Notice/notice-board-detail';
import vFoodList from '../components/layout/Contents/FoodList/portfolio-container';
import vWeekMenu from '../components/layout/Contents/WeekMenu/week-menu-main';

const router = new VueRouter({
  routes: [
    {
      name: 'Main',
      path: '/',
      component: Main
    },
    {
      name: 'MyPage',
      path: '/mypage',
      component: MyPage,
      children: [
        {
          path: 'history',
          component: MyPageHistory
        },
        {
          path: 'detail',
          component: MyPageDetail
        },
        {
          path: 'remove',
          component: MyPageRemove
        }
      ]
    },
    {
      name: 'foodList',
      path: '/food/list',
      component: vFoodList
    },
    {
      name: 'noticeList',
      path: '/notice/list',
      component: vNoticeBoardList
    },
    {
      name: 'noticeDetail',
      path: '/notice/detail',
      component: vNoticeBoardDetail,
      props: route => {
        return { board: route.params.board };
      }
    },
    {
      name: 'weekMenu',
      path: '/menu/list',
      component: vWeekMenu
    }
  ]
});

export default router;
