import VueRouter from 'vue-router';
import Main from '../components/layout/Contents/Main/Main-container';
import MyPage from '../components/layout/Contents/MyPage/MyPage';
import MyPageHistory from '../components/layout/Contents/MyPage/MyPageHistory';
import MyPageDetail from '../components/layout/Contents/MyPage/MyPageDetail';
import MyPageRemove from '../components/layout/Contents/MyPage/MyPageRemove';
import MyPageHistory2 from '../components/layout/Contents/MyPage/MyPageHistory2';
import vNoticeBoardList from '../components/layout/Contents/Notice/notice-board-list';
import vNoticeBoardDetail from '../components/layout/Contents/Notice/notice-board-detail';

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
          path: 'history2',
          component: MyPageHistory2
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
    }
  ]
});

export default router;
