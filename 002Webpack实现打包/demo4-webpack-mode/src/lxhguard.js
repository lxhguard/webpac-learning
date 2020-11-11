// 导入 login.js 并使用该模块
import { CreateDivElement } from './login';
import { ZERO } from './a';


const divElement = CreateDivElement(ZERO);
document.body.append(divElement);