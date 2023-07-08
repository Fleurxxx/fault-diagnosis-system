/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-01 20:28:39
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-03 19:17:41
 * @FilePath: \maintenance\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-02-11 05:34:11
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-02 11:14:15
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
                    },{
                        path:"/model/paste",  //手动上传
                        component: ()=>import('../components/updata/Hand.vue'),
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
              redirect:'/diagnose/upfile',
              component: ()=>import('../views/diagnose/OnlineDiagnose.vue'),
              meta: {
                  title: '在线诊断'
              },
              children:[
                  {
                      path:"/diagnose/upfile",  //上传
                      component: ()=>import('../components/updata/Files.vue'),
                  },{
                      path:"/diagnose/paste",  //手动上传
                      component: ()=>import('../components/updata/Hand.vue'),
                  }
              ]
          },{
            path:"/fault",
            component: ()=>import('../views/diagnose/FaultAnalysis.vue'),
            meta: {
                title: '在线诊断'
            },
          },{
            path:"/fini",
            component: ()=>import('../views/diagnose/Finish.vue'),
            meta: {
                title: '在线诊断'
            },
          },{
            path:"/history",
            component: ()=>import('../views/diagnose/Record.vue'),
            meta: {
                title: '历史记录'
            },
          },{ //------- 故障维修 -------//
                path:"/maintain",
                component: ()=>import('../views/maintain/Index.vue'),
                meta: {
                    title: '故障维修'
                },
                // redirect: '/maintain',
                children: [
                    
                ]
            },{ //------- 故障维修中心 -------//
                path:"/center",
                component: ()=>import('../views/maintain/Center.vue'),
                meta: {
                    title: '维修中心'
                },
            },{ //------- 故障维修中心 -------//
                path:"/start",
                component: ()=>import('../views/maintain/Start.vue'),
                meta: {
                    title: '维修中心'
                },
                redirect:'/start/upfile',
                children:[
                    {
                        path:"/start/upfile",  //上传
                        component: ()=>import('../components/updata/Files.vue'),
                    },{
                        path:"/start/paste",  //手动上传
                        component: ()=>import('../components/updata/Hand.vue'),
                    }
                ]
            },{ //------- 故障维修中心 -------//
                path:"/record",
                component: ()=>import('../views/maintain/Record.vue'),
                meta: {
                    title: '维修中心'
                },
            },{ //------- 故障维修中心 -------//
                path:"/finish",
                component: ()=>import('../views/maintain/Finish.vue'),
                meta: {
                    title: '维修中心'
                },
            },{
                path:"/detail",
                component: ()=>import('../views/maintain/Details.vue'),
                meta: {
                    title: '维修详情'
                }
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
            path:"/txt",
            component: ()=>import('../test/txt1.vue'),
            meta: {
                title: '代码编辑器'
            }
          },{
            path:"/txt2",
            component: ()=>import('../test/txt2.vue'),
            meta: {
                title: '代码编辑器'
            }
          },{
            path:"/csv",
            component: ()=>import('../test/pushcsv.vue'),
            meta: {
                title: '代码编辑器'
            }
          },{
            path:"/zhuzi",
            component: ()=>import('../components/data/Column.vue'),
            meta: {
                title: '代码编辑器'
            }
          },{
            path:"/zhu",
            component: ()=>import('../components/chart/BuildEletricCharts.vue'),
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
    },{
      path:"/login",
      component: ()=>import('../views/login/Login.vue'),
    },{
      path:"/timeline",
      component: ()=>import('../views/login/Register.vue'),
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
