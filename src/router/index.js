/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-02-11 05:34:11
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-07 17:26:07
 * @FilePath: \oss-backstage\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from 'vue-router'
//nprogress进度条
import { start, close } from "../utils/nprogress";


const routes = [
    {
        path: '/',
        redirect:'/home',
        component: () => import('../views/home/Index.vue'),
        children:[
            {
                path:"/home", //首页
                component: ()=>import('../views/home/Home.vue'),
                //component: resolve => require(['views/home/Index'],resolve)
                meta: {
                    //title: '首页',
                },
            },{ //------- 模型训练 -------//
                path:"/model",   //在线训练
                redirect:'/model/upfile',
                component: ()=>import('../views/model/OnlineTraining.vue'),
                meta: {
                    title: '在线训练'
                },
                children:[
                    {
                        path:"/model/upfile",  //上传
                        component: ()=>import('../components/updata/Files.vue'),
                        meta: {
                            title: '模型信息'
                        },
                    },{
                        path:"/model/paste",  //手动上传
                        component: ()=>import('../components/updata/Hand.vue'),
                        meta: {
                            title: '模型信息'
                        },
                    }
                ]
            },{
                path:"/analysis",  //数据分析
                component: ()=>import('../views/model/DataAnalysis.vue'),
                meta: {
                    title: '在线训练'
                },
            },{
                path:"/trained",  //训练完成
                component: ()=>import('../views/model/Finish.vue'),
                meta: {
                    title: '在线训练'
                },
            },{
                path:"/management",  //模型管理
                component: ()=>import('../views/model/ModelManagement.vue'),
                meta: {
                    title: '模型管理'
                },
            },{
              path:"/info",  //训练完成
              component: ()=>import('../views/model/Info.vue'),
              meta: {
                  title: '在线训练'
              },
          },{ //------- 故障诊断 -------//
                path:"/diagnose",
                component: ()=>import('../views/diagnose/OnlineDiagnose.vue'),
                meta: {
                    title: '故障诊断'
                },
            },{ //------- 故障维修 -------//
                path:"/maintain",
                component: ()=>import('../views/maintain/Index.vue'),
                meta: {
                    title: '故障维修'
                },
            },{ //------- 故障维修中心 -------//
                path:"/center",  
                component: ()=>import('../views/maintain/Center.vue'),
                meta: {
                    title: '维修中心'
                },
            },{
                path:"/detail",
                component: ()=>import('../views/maintain/Details.vue'),
            // }
            },{ //------- 组件测试-------//
                path:"/file",  //上传
                component: ()=>import('../components/updata/Files.vue'),
                meta: {
                    title: '模型信息'
                },
            },{
                path:"/hand",  //上传
                component: ()=>import('../components/updata/Hand.vue'),
                meta: {
                    title: '模型信息'
                },
            },{
              path:"/data",  //基于codemirror实现的代码编辑器
              component: ()=>import('../components/data/DataCard.vue'),
              meta: {
                  title: '代码编辑器'
              },
          },{
            path:"/txt",  //基于codemirror实现的代码编辑器
            component: ()=>import('../test/txt1.vue'),
            meta: {
                title: '代码编辑器'
            }
        },{
          path:"/table",  //基于codemirror实现的代码编辑器
          component: ()=>import('../components/table/Table.vue'),
          meta: {
              title: '代码编辑器'
          },
        }
            // {
            //     path:"model",
            //     redirect:'/model/training',
            //     meta: {
            //         title: '模型训练',
            //         icon: 'User'
            //     },
            //     children:[
            //         {
            //             path:"training",  //在线训练
            //             component: ()=>import('../views/model/OnlineTraining.vue'),
            //             meta: {
            //                 title: '在线训练'
            //             },
            //         },{
            //             path:"management",  //模型管理
            //             component: ()=>import('../views/model/ModelManagement.vue'),
            //             meta: {
            //                 title: '模型管理'
            //             },
            //         },
            //     ]
            // }

        ]
    },{
        path:"/:catchAll(.*)",  //404
        component: ()=>import('../views/error/404.vue'),
        meta: {
            title: '404'
        },
    },{
        path:"/timeline",
        component: ()=>import('../components/MyTimeLine.vue'),
    }
]

export const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes
})



router.beforeEach((to, from, next) => {
  start();
  next();
});

router.afterEach(() => {
  close();
});



/**
 * 路由守卫
 */
// router.beforeEach((guard)=>{
//   brforeEach.checkAuth(guard,router);
// })



/**
 * 输出对象
 */
export default router
