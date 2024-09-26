/** 
 * 该文件是 脚本 .node/scss-handle.js 通过 src\components\dynamic-form\controls\style\grid.ts.scss 生成的
 */
import { useSsrAdapter } from '@css-render/vue3-ssr'
import {c} from "../../_utils/cssr";
const className = 'grid-2has7ddogdo5clm';
const cssr = c('.' + className,
[
  c(`&.grid`,`
  
    `, 
[
  c(`&:not(.form-render)`,`
  padding: 5px;
    `, 
[
      
]
    ),c(`&:not(.form-render).border`,`
  border: 1px dashed var(--borderColor);
    `, 
[
      
]
    )    
]
    ),c(`&.col`,`
  
    `, 
[
  c(`&:not(.form-render).border`,`
  border: 1px dashed var(--borderColor);
    `, 
[
      
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