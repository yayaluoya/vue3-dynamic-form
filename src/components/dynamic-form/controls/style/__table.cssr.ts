/** 
 * 该文件是 脚本 .node/scss-handle.js 通过 src\components\dynamic-form\controls\style\table.ts.scss 生成的
 */
import { useSsrAdapter } from '@css-render/vue3-ssr'
import {c} from "../../_utils/cssr";
const className = 'table-b6p8e3086n5z6on';
const cssr = c('.' + className,
[
  c(`&.table`,`
  
    `, 
[
  c(`> table`,`
  width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    `, 
[
  c(`tr`,`
  
    `, 
[
      
]
    ),c(`td`,`
  height: 50px;
      padding: 5px;
      border: 1px solid var(--borderColor);
      vertical-align: top;
    `, 
[
      
]
    )    
]
    ),c(`&.form-render`,`
  
    `, 
[
  c(`> table`,`
  
    `, 
[
  c(`td`,`
  border: 1px solid var(--borderColor);
    `, 
[
      
]
    )    
]
    )    
]
    )    
]
    ),c(`&.cell`,`
  height: 100%;
    `, 
[
  c(`&:not(.form-render).border`,`
  border: 1px dashed var(--borderColor);
    `, 
[
      
]
    ),c(`> .content`,`
  height: 100%;
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