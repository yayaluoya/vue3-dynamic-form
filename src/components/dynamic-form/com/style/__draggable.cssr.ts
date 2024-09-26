/** 
 * 该文件是 脚本 .node/scss-handle.js 通过 src\components\dynamic-form\com\style\draggable.ts.scss 生成的
 */
import { useSsrAdapter } from '@css-render/vue3-ssr'
import {c} from "../../_utils/cssr";
const className = 'draggable-jn9lva8f25fiayo';
const cssr = c('.' + className,
[
  c(`&`,`
  padding: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
    `, 
[
  c(`> .draggable-item`,`
  
    `, 
[
  c(`> *:not(.draggable-show-item)`,`
  display: none;
    `, 
[
      
]
    )    
]
    )    
]
    )    
]
    );
cssr.mount({
  id: className,
  ssr: useSsrAdapter(),
});
export {
  className,
};