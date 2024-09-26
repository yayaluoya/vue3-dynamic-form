/** 
 * 该文件是 脚本 .node/scss-handle.js 通过 src\components\dynamic-form\style\editor.ts.scss 生成的
 */
import { useSsrAdapter } from '@css-render/vue3-ssr'
import {c} from "../_utils/cssr";
const className = 'editor-dzmumx8w4sqi7m1';
const cssr = c('.' + className,
[
  c(`&`,`
  --height: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  background-color: var(--baseColor);
    `, 
[
  c(`> .a,
  > .b,
  > .c`,`
  box-sizing: border-box;
    height: var(--height);
    `, 
[
      
]
    ),c(`> .a`,`
  width: 260px;
    box-sizing: border-box;
    display: flex;
    `, 
[
  c(`.dynamic-form-draggable.a`,`
  width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    `, 
[
  c(`.draggable-item`,`
  width: calc(50% - 4px);
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding: 4px;
        border-radius: 4px;
        margin-bottom: 5px;
        cursor: move;
        background-color: var(--baseColor);
        border: 1px solid var(--borderColor);
    `, 
[
  c(`> .draggable-show-item`,`
  display: none;
    `, 
[
      
]
    ),c(`&.on,
        &:hover`,`
  border-color: var(--primaryColorHover) !important;
    `, 
[
  c(`> .name`,`
  color: var(--primaryColorHover);
    `, 
[
      
]
    )    
]
    ),c(`> .name`,`
  font-family: "Source Han Sans CN";
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 20px;
    `, 
[
      
]
    )    
]
    )    
]
    )    
]
    ),c(`> .b`,`
  width: 0;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    `, 
[
  c(`> .top`,`
  height: 41.8px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--dividerColor);
    `, 
[
      
]
    ),c(`> .content`,`
  width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      background-color: var(--dividerColor);
    `, 
[
  c(`> .null`,`
  position: absolute;
        pointer-events: none;
        z-index: 2;
        color: var(--textColor3);
    `, 
[
      
]
    ),c(`.draggable-con-div`,`
  padding: 10px;
        width: 100%;
        background-color: var(--dividerColor);
    `, 
[
  c(`> .draggable-con`,`
  min-height: calc(var(--height) - 40px - 22px);
          background-color: var(--baseColor);
    `, 
[
  c(`&.draggableLoading`,`
  box-shadow: 0px 0px 4px var(--primaryColor);
    `, 
[
      
]
    )    
]
    )    
]
    )    
]
    )    
]
    ),c(`> .c`,`
  width: 280px;
    box-sizing: border-box;
    display: flex;
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