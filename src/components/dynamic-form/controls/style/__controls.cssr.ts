/** 
 * 该文件是 脚本 .node/scss-handle.js 通过 src\components\dynamic-form\controls\style\controls.ts.scss 生成的
 */
import { useSsrAdapter } from '@css-render/vue3-ssr'
import {c} from "../../_utils/cssr";
const className = 'controls-bvjli7rm2mvo3x5';
const cssr = c('.' + className,
[
  c(`&`,`
  position: relative;
  border: 2px solid transparent;
    `, 
[
  c(`&.on`,`
  border: 2px solid var(--primaryColorHover);
    `, 
[
      
]
    ),c(`> .drag-handler,
  > .con-name,
  > .handler-button`,`
  position: absolute;
    z-index: 2;
    padding: 3px;
    box-sizing: border-box;
    `, 
[
      
]
    ),c(`> .drag-handler`,`
  top: 0;
    left: 0;
    color: var(--baseColor);
    background: var(--primaryColorHover);
    opacity: 0.6;
    cursor: move;
    `, 
[
  c(`&:hover`,`
  opacity: 1;
    `, 
[
      
]
    ),c(`> span`,`
  font-size: 12px;
      font-style: normal;
    `, 
[
      
]
    )    
]
    ),c(`> .con-name`,`
  top: 0;
    left: 0;
    color: var(--baseColor);
    background: var(--primaryColorHover);
    opacity: 0.7;
    `, 
[
  c(`> span`,`
  font-size: 12px;
      font-style: normal;
    `, 
[
      
]
    )    
]
    ),c(`> .handler-button`,`
  bottom: 0;
    right: 0;
    cursor: pointer;
    color: var(--baseColor);
    background: var(--primaryColorHover);
    opacity: 0.6;
    `, 
[
  c(`&:hover`,`
  opacity: 1;
    `, 
[
      
]
    ),c(`> div`,`
  display: inline-flex;
    `, 
[
      
]
    )    
]
    ),c(`> .content`,`
  position: relative;
    z-index: 1;
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