import home from "./home";
import attendance from "./attendance";
import homanResources from "./human-resources";
import system from "./system-setting";
import process from "./process-manage";
import productionReport from "./production-report";
import quality from "./quality-manage";
import document from "./document";
import productionExec from "./production-execution";
import monitor from "./monitor";
import sales from "./sales";
import financial from "./financial";
import base from "./base";
import purchase from './purchase'
import storage from './storage'
import productDevelopment from "./product-development";
import productionManagement from "./production-management";
import assetManagement from "./asset-management";
import shebei from './shebei'
import logistics from './logistics'
import projects from './projects'
import customer from './customer'
import flow from './flow'
import log from './log'
const routes = [
  ...home,
  ...attendance,
  ...homanResources,
  ...system,
  ...process,
  ...productionReport,
  ...quality,
  ...document,
  ...productionExec,
  ...financial,
  ...productDevelopment,
  ...productionManagement,
  ...assetManagement,
  ...sales,
  ...financial,
  ...base,
  ...purchase,
  ...storage,
  ...shebei,
  ...logistics,
  ...projects,
  ...customer,
  ...flow,
  ...monitor,
  ...log
];

export default routes;
