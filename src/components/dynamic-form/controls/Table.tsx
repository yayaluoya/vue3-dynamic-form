import {
  BaseCon,
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightReterItemOp,
} from "./BaseCon";
import DraggableCon from "../com/draggable.vue";
import "../style/table.scss";
import Item from "../com/item.vue";
import { predefineColors } from "../config/predefineColors";
import { NonForm } from "./NonForm";
import { NColorPicker, NDropdown, NFlex, NIcon, NInputNumber } from "naive-ui";
import {
  ArrowBack,
  ArrowDown,
  ArrowForward,
  ArrowUp,
  CaretDown,
  CaretForward,
  ChevronBack,
  ChevronDown,
  ChevronDownOutline,
  ChevronForward,
  ChevronForwardOutline,
  ChevronUp,
  EllipsisHorizontal,
  EyeOff,
  RemoveCircle,
} from "@vicons/ionicons5";
import type { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";

/**
 * 单元格
 */
class Cell extends NonForm {
  /** 控件类型 */
  static ConType = "Cell";
  /** 控件名字 */
  static ConName = "单元格";

  towable = false;
  colspan = 1;
  rowspan = 1;
  /** 消失 */
  disappear = false;

  borderColor = "";
  borderWidth = 0;

  render_(
    { ctx, activateCon, formData, parent }: IConRenderOp,
    row: number,
    col: number
  ) {
    if (formData && this.hide) {
      return null;
    }
    return (
      <div
        class={[
          "controller controls__ cell",
          activateCon?.key == this.key ? "on" : "border",
          formData ? "form-render" : "",
        ].join(" ")}
        onClick={(e) => {
          e.stopPropagation();
          ctx.emit("activateConF", this);
        }}
      >
        {activateCon?.key == this.key
          ? [
              <NFlex class="con-name" size={[3, 0]} align="center">
                <span>{this.conName}</span>
                {this.hide ? (
                  <NIcon size={15}>
                    <EyeOff />
                  </NIcon>
                ) : null}
              </NFlex>,
              <NFlex class="handler-button" size={[3, 0]} align="center">
                <div
                  title="选择父组件"
                  onClick={(e: Event) => {
                    e.stopPropagation();
                    ctx.emit("activateConF", parent);
                  }}
                >
                  <NIcon size={15}>
                    <ArrowBack />
                  </NIcon>
                </div>
                {this.getHandler_(arguments[0], row, col)}
              </NFlex>,
            ]
          : null}
        <div class="content">{this.renderRaw(arguments[0])}</div>
      </div>
    );
  }

  getHandler_(
    {
      parent,
      ctx,
    }: IConRenderOp & {
      parent: Table;
    },
    row: number,
    col: number
  ) {
    let op: (DropdownMixedOption & { h?: () => void })[] = [
      {
        label: "插入左侧列",
        icon: () => (
          <NIcon>
            <ArrowBack />
          </NIcon>
        ),
        h: () => {
          parent.insert("left", row, col);
        },
      },
      {
        label: "插入右侧列",
        icon: () => (
          <NIcon>
            <ArrowForward />
          </NIcon>
        ),
        h: () => {
          parent.insert("right", row, col);
        },
      },
      {
        label: "插入上方行",
        icon: () => (
          <NIcon>
            <ArrowUp />
          </NIcon>
        ),
        h: () => {
          parent.insert("up", row, col);
        },
      },
      {
        label: "插入下方行",
        icon: () => (
          <NIcon>
            <ArrowDown />
          </NIcon>
        ),
        h: () => {
          parent.insert("down", row, col);
        },
      },
      {
        type: "divider",
      },
      {
        label: "合并左侧单元格",
        icon: () => (
          <NIcon>
            <ChevronBack />
          </NIcon>
        ),
        disabled: !parent.merge("left", row, col, true),
        h: () => {
          parent.merge("left", row, col, false, (con) => {
            ctx.emit("activateConF", con);
          });
        },
      },
      {
        label: "合并右侧单元格",
        icon: () => (
          <NIcon>
            <ChevronForward />
          </NIcon>
        ),
        disabled: !parent.merge("right", row, col, true),
        h: () => {
          parent.merge("right", row, col, false, (con) => {
            ctx.emit("activateConF", con);
          });
        },
      },
      {
        label: "合并整行",
        disabled: !parent.merge("row", row, col, true),
        h: () => {
          parent.merge("row", row, col, false, (con) => {
            ctx.emit("activateConF", con);
          });
        },
      },
      {
        type: "divider",
      },
      {
        label: "合并上方单元格",
        icon: () => (
          <NIcon>
            <ChevronUp />
          </NIcon>
        ),
        disabled: !parent.merge("up", row, col, true),
        h: () => {
          parent.merge("up", row, col, false, (con) => {
            ctx.emit("activateConF", con);
          });
        },
      },
      {
        label: "合并下方单元格",
        icon: () => (
          <NIcon>
            <ChevronDown />
          </NIcon>
        ),
        disabled: !parent.merge("down", row, col, true),
        h: () => {
          parent.merge("down", row, col, false, (con) => {
            ctx.emit("activateConF", con);
          });
        },
      },
      {
        label: "合并整列",
        disabled: !parent.merge("col", row, col, true),
        h: () => {
          parent.merge("col", row, col, false, (con) => {
            ctx.emit("activateConF", con);
          });
        },
      },
      {
        type: "divider",
      },
      {
        label: "撤销垂直合并",
        disabled: this.rowspan == 1,
        h: () => {
          parent.revocationMerge("row", row, col);
        },
      },
      {
        label: "撤销水平合并",
        disabled: this.colspan == 1,
        h: () => {
          parent.revocationMerge("col", row, col);
        },
      },
      {
        type: "divider",
      },
      {
        label: "删除整列",
        icon: () => (
          <NIcon>
            <RemoveCircle />
          </NIcon>
        ),
        disabled: !parent.merge("col", row, col, true),
        h: () => {
          parent.delete("col", row, col);
        },
      },
      {
        label: "删除整行",
        icon: () => (
          <NIcon>
            <RemoveCircle />
          </NIcon>
        ),
        disabled: !parent.merge("row", row, col, true),
        h: () => {
          parent.delete("row", row, col);
        },
      },
    ];
    return [
      <NDropdown
        trigger="click"
        size="small"
        options={op.map((_, i) => {
          return {
            ..._,
            h: undefined,
            key: i,
          };
        })}
        onSelect={(e: number) => {
          op[e]?.h?.();
        }}
      >
        <NIcon>
          <EllipsisHorizontal />
        </NIcon>
      </NDropdown>,
    ];
  }

  renderRaw({ ctx, formConfig, cons, activateCon, formData }: IConRenderOp) {
    return formData ? (
      <>
        {this.childs.map((con) => {
          return (
            <Item
              key={con.key}
              parent={this as BaseCon}
              formConfig={formConfig}
              formData={formData}
              cons={cons}
              con={con}
              formRender
            />
          );
        })}
      </>
    ) : (
      <DraggableCon
        parent={this as BaseCon}
        cons={this.childs}
        formConfig={formConfig}
        activateCon={activateCon}
        onUpdate:cons={(_) => {
          this.childs = _;
        }}
        onUpdate:activateCon={(_) => {
          ctx.emit("activateConF", _);
        }}
        style={
          this.childs.length <= 0 ? "min-height: 50px;" : "min-height: 20px;"
        }
      />
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightReterItemOp["childs"] = [
      {
        label: "边框宽度",
        editor: <NInputNumber v-model:value={this.borderWidth} />,
      },
      {
        label: "边框颜色",
        editor: (
          <NColorPicker
            v-model:value={this.borderColor}
            swatches={predefineColors}
          />
        ),
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}

/**
 * 表格
 */
export class Table extends NonForm {
  /** 控件类型 */
  static ConType = "Table";
  /** 控件名字 */
  static ConName = "表格";
  /** 单例对象 */
  static I = new Table();

  list = [
    [new Cell(), new Cell()],
    [new Cell(), new Cell()],
  ];

  borderColor = "#afafaf";
  borderWidth = 1;

  initConfig(configs: any, toCons: any) {
    super.initConfig(configs, toCons);
    this.list = this.list.map((_) => {
      return toCons(_, [Cell]);
    });
    return this;
  }

  getChild() {
    return this.list.reduce((a, b) => {
      return [...a, ...b];
    }, []);
  }

  /**
   * 插入
   * @param type
   * @param row
   * @param col
   */
  insert(type: "left" | "right" | "up" | "down", row: number, col: number) {
    let colNum = Math.max(...this.list.map((_) => _.length));
    switch (type) {
      case "left":
        this.list.forEach((_) => {
          _.splice(col, 0, new Cell());
        });
        break;
      case "right":
        this.list.forEach((_) => {
          _.splice(col + 1, 0, new Cell());
        });
        break;
      case "up":
        this.list.splice(
          row,
          0,
          new Array(colNum).fill(0).map(() => new Cell())
        );
        break;
      case "down":
        this.list.splice(
          row + 1,
          0,
          new Array(colNum).fill(0).map(() => new Cell())
        );
        break;
    }
  }
  /**
   * 合并
   * @param type
   * @param row
   * @param col
   * @param judge 是否只是判断
   * @param activateConF
   */
  merge(
    type: "left" | "right" | "up" | "down" | "row" | "col",
    row: number,
    col: number,
    judge = false,
    activateConF?: (con: BaseCon) => void
  ) {
    let on = this.list[row][col];
    switch (type) {
      case "left":
        {
          let target = this.list[row].find((_, i) => {
            return (
              _.rowspan == on.rowspan &&
              i + _.colspan - 1 == col - 1 &&
              !_.disappear &&
              i < col
            );
          });
          if (judge) {
            return !!target;
          }
          if (target) {
            on.disappear = true;
            target.colspan += on.colspan;
            activateConF?.(target);
          }
        }
        break;
      case "right":
        {
          let target = this.list[row][col + on.colspan];
          let is_ = target && !target.disappear && target.rowspan == on.rowspan;
          if (judge) {
            return is_;
          }
          if (is_) {
            target.disappear = true;
            on.colspan += target.colspan;
          }
        }
        break;
      case "up":
        {
          let target = this.list
            .map((_) => _[col])
            .find((_, i) => {
              return (
                _.colspan == on.colspan &&
                i + _.rowspan - 1 == row - 1 &&
                !_.disappear &&
                i < row
              );
            });
          if (judge) {
            return !!target;
          }
          if (target) {
            on.disappear = true;
            target.rowspan += on.rowspan;
            activateConF?.(target);
          }
        }
        break;
      case "down":
        {
          let target = this.list[row + on.rowspan]?.[col];
          let is_ = target && !target.disappear && target.colspan == on.colspan;
          if (judge) {
            return is_;
          }
          if (is_) {
            on.rowspan += target.rowspan;
            target.disappear = true;
          }
        }
        break;
      case "row":
        {
          let list = this.list[row];
          let is_ =
            [...new Set(list.filter((_) => !_.disappear).map((_) => _.rowspan))]
              .length == 1 &&
            list.reduce((a, b) => {
              return a + (b.disappear ? 0 : b.colspan);
            }, 0) == list.length;
          if (judge) {
            return is_ && this.list[row][0].colspan != this.list[row].length;
          }
          if (is_) {
            list.forEach((_, i) => {
              if (i == 0) {
                _.colspan = list.length;
              } else {
                _.disappear = true;
              }
            });
          }
        }
        break;
      case "col":
        {
          let list = this.list.map((_) => _[col]);
          let is_ =
            [...new Set(list.filter((_) => !_.disappear).map((_) => _.colspan))]
              .length == 1 &&
            list.reduce((a, b) => {
              return a + (b.disappear ? 0 : b.rowspan);
            }, 0) == list.length;
          if (judge) {
            return is_ && this.list[0][col].rowspan != this.list.length;
          }
          if (is_) {
            list.forEach((_, i) => {
              if (i == 0) {
                _.rowspan = list.length;
              } else {
                _.disappear = true;
              }
            });
          }
        }
        break;
    }
  }
  /**
   * 撤销合并
   * @param type
   * @param row
   * @param col
   */
  revocationMerge(type: "row" | "col", row: number, col: number) {
    let on = this.list[row][col];
    switch (type) {
      case "row":
        {
          let endRow = row + on.rowspan;
          let endCol = col + on.colspan;
          for (let i = row; i < endRow; i++) {
            for (let j = col; j < endCol; j++) {
              let _ = this.list[i][j];
              if (i == row && j == col) {
                _.rowspan = 1;
                _.disappear = false;
              } else {
                _.colspan = 1;
                _.rowspan = 1;
                _.disappear = i == row;
              }
            }
          }
        }
        break;
      case "col":
        {
          let endRow = row + on.rowspan;
          let endCol = col + on.colspan;
          for (let i = row; i < endRow; i++) {
            for (let j = col; j < endCol; j++) {
              let _ = this.list[i][j];
              if (i == row && j == col) {
                _.colspan = 1;
                _.disappear = false;
              } else {
                _.colspan = 1;
                _.rowspan = 1;
                _.disappear = j == col;
              }
            }
          }
        }
        break;
    }
  }
  /**
   * 删除
   * @param type
   * @param row
   * @param col
   */
  delete(type: "row" | "col", row: number, col: number) {
    switch (type) {
      case "row":
        this.list.splice(row, 1);
        break;
      case "col":
        this.list.forEach((_) => {
          _.splice(col, 1);
        });
        break;
    }
  }

  getHandler(op: IConRenderOp) {
    let _ = super.getHandler(op);
    _.splice(
      -1,
      0,
      ...[
        <div
          title="插入新行"
          onClick={(e: Event) => {
            e.stopPropagation();
            let colNum = Math.max(...this.list.map((_) => _.length));
            this.list.push(new Array(colNum).fill(0).map(() => new Cell()));
          }}
        >
          <NIcon size={15}>
            <CaretDown />
          </NIcon>
        </div>,
        <div
          title="插入新列"
          onClick={(e: Event) => {
            e.stopPropagation();
            this.list.forEach((_) => {
              _.push(new Cell());
            });
          }}
        >
          <NIcon size={15}>
            <CaretForward />
          </NIcon>
        </div>,
      ]
    );
    return _;
  }

  renderRaw(op: IConRenderOp) {
    return (
      <div
        class={["controls__ table", op.formData ? "form-render" : ""].join(" ")}
      >
        <table>
          <tbody>
            {this.list.map((_, row) => {
              return (
                <tr key={row}>
                  {_.map((__, col) => {
                    return __.disappear ? null : (
                      <td
                        style={`
                        border-color: ${__.borderColor || this.borderColor};
                        border-width: ${__.borderWidth || this.borderWidth}px;
                        `}
                        key={col}
                        colspan={__.colspan}
                        rowspan={__.rowspan}
                      >
                        {__.render_(
                          {
                            ...op,
                            parent: this,
                          },
                          row,
                          col
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightReterItemOp["childs"] = [
      {
        label: "边框宽度",
        editor: <NInputNumber v-model:value={this.borderWidth} />,
      },
      {
        label: "边框颜色",
        editor: (
          <NColorPicker
            v-model:value={this.borderColor}
            swatches={predefineColors}
          />
        ),
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
