export const nav = [
  {id:'home',label:'首页',icon:'home',route:'#home'},
  {id:'food',label:'菌养食材',icon:'leaf',route:'#foods'},
  {id:'inputs',label:'肥料与饲料',icon:'sprout',route:'#inputs'},
  {id:'base',label:'基地溯源',icon:'pin',route:'#bases'},
  {id:'knowledge',label:'科普知识',icon:'book',route:'#articles'},
  {id:'events',label:'食材安全事件',icon:'shield',route:'#events'}
];
export const categories=[
  {id:'vegetables',name:'蔬菜类',image:'hero',description:'查看种植与批次资料'},
  {id:'fruit',name:'瓜果类',image:'fruit',description:'连接产品与来源基地'},
  {id:'poultry',name:'家禽肉类',image:'poultry',description:'了解养殖与生产记录'},
  {id:'eggs',name:'蛋奶类',image:'eggs',description:'查看对应检测资料'}
];
export const foods = [
  {id:'leafy-greens',name:'蔬菜产品示意',category:'vegetables',base:'plant',image:'hero'},
  {id:'seasonal-fruit',name:'瓜果产品示意',category:'fruit',base:'plant',image:'fruit'},
  {id:'farm-poultry',name:'家禽产品示意',category:'poultry',base:'animal',image:'poultry'},
  {id:'eggs-dairy',name:'蛋奶产品示意',category:'eggs',base:'animal',image:'eggs'}
];
export const bases=[
  {id:'plant',name:'种植基地示意',image:'base',kind:'种植',description:'基地介绍、种植过程、日常管理与指标监测。'},
  {id:'animal',name:'养殖基地示意',image:'poultry',kind:'养殖',description:'基地介绍、养殖过程、饲喂记录与指标监测。'}
];
export const inputs=[
  {id:'bio-fertilizer',name:'微生物肥料示意',type:'fertilizer',image:'fertilizer',description:'了解成分、适用对象与使用方法。'},
  {id:'fermented-feed',name:'发酵饲料示意',type:'feed',image:'feed',description:'查看原料、菌种与储存说明。'}
];
export const topics=[{id:'all',name:'全部文章'},{id:'microbes',name:'微生物分类与作用'},{id:'principles',name:'菌养机理'},{id:'methods',name:'技术方法'},{id:'research',name:'研究与应用'},{id:'standards',name:'食品检测标准'}];
export const articles=[
  {id:'microbes',title:'认识微生物',topic:'microbes',image:'fertilizer',intro:'从分类、作用与应用场景，了解菌养技术的基础。',sections:[['微生物分类与作用','本栏目围绕微生物类别、主要作用、应用场景及资料来源整理内容。'],['了解应用场景','从肥料与饲料资料出发，连接种植、养殖和日常管理记录。'],['资料来源','当前为文章版式示意。正式研究资料与引用来源待补充。']]},
  {id:'principles',title:'了解菌养机理',topic:'principles',image:'hero',intro:'看见技术、生产过程、食材与检测之间的联系。',sections:[['从技术到食材','微生物技术、种植或养殖过程、食材、检测与溯源，是本网站相互关联的内容入口。'],['看见对应记录','产品关联来源基地；基地关联生产过程、日常管理和指标监测。检测信息按对应批次展示。'],['阅读与核实','具体机理、技术效果及适用条件将在正式资料中说明，现阶段不预设产品效果或检测结论。']]},
  {id:'methods',title:'技术方法与生产记录',topic:'methods',image:'base',intro:'从菌株资料、发酵工艺到实际生产记录。',sections:[['技术方法','预留菌株筛选与培养、肥料发酵、饲料发酵等专题入口。'],['关联生产过程','技术说明与产品使用说明分别维护，生产记录链接至基地及批次。'],['资料补充','具体工艺、应用条件与引用来源待补充。']]},
  {id:'research',title:'研究与应用资料',topic:'research',image:'fertilizer',intro:'按研究主题整理资料、条件与来源。',sections:[['研究与应用','预留土壤、根系、饲料利用和养殖环境等研究资料入口。'],['资料状态','正式研究依据、适用条件与资料来源待补充。']]},
  {id:'standards',title:'如何阅读检测资料',topic:'standards',image:'base',intro:'关注采样对象、批次、日期和报告原件。',sections:[['检测信息','页面预留检测项目、结果、单位、检测日期、机构和报告原件等字段。'],['关联批次','环境监测与食材检测分别展示，并明确其对应产品和批次。'],['标准资料','标准名称、编号、适用范围与官方链接待核实后补充。']]}
];
export const eventExample={id:'layout-example',title:'事件详情版式示意',risk:'资料待整理',intro:'此页面展示信息结构，不对应真实安全事件。'};
export const categoryName=id=>categories.find(x=>x.id===id)?.name || '待补充';
export const baseName=id=>bases.find(x=>x.id===id)?.name || '待补充';
