import { BaseCon } from "./BaseCon";
import DraggableCon from "../com/draggable.vue";
import "../style/table.scss";
import { Layout } from "./Layout";
import Item from "../com/item.vue";
import { predefineColors } from "../config/predefineColors";

/**
 * 单元格
 */
class Cell extends Layout {
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

  render({ ctx, activateCon, formData, parent }) {
    if (formData && this.hide) {
      return null;
    }
    return (
      <div
        class={[
          "controller controls__ cell",
          activateCon?.key == this.key ? "on" : "border",
          formData ? "preview" : "",
        ].join(" ")}
        onClick={(e) => {
          e.stopPropagation();
          ctx.emit("activateConF", this);
        }}
      >
        {activateCon?.key == this.key
          ? [
              <div class="con-name">
                <span>{this.conName}</span>
                {this.hide ? (
                  <el-icon style="margin-left: 2px">
                    <Hide />
                  </el-icon>
                ) : null}
              </div>,
              <div class="handler-button">
                <el-icon
                  title="选择父组件"
                  onClick={(e) => {
                    e.stopPropagation();
                    ctx.emit("activateConF", parent);
                  }}
                >
                  <Back />
                </el-icon>
                {this.getHandler(...arguments)}
              </div>,
            ]
          : null}
        <div class="content">{this.renderRaw(...arguments)}</div>
      </div>
    );
  }

  /**
   * @param {{parent: Table}} op
   * @param {number} row
   * @param {number} col
   * @returns
   */
  getHandler({ parent, ctx }, row, col) {
    return [
      <el-dropdown trigger="click" placement="bottom-end" size="small">
        {{
          default: () => {
            return (
              <el-icon color="white">
                <Menu />
              </el-icon>
            );
          },
          dropdown: () => {
            return (
              <el-dropdown-menu>
                <el-dropdown-item
                  onClick={() => {
                    parent.insert("left", row, col);
                  }}
                >
                  <el-icon>
                    <CaretLeft />
                  </el-icon>
                  插入左侧列
                </el-dropdown-item>
                <el-dropdown-item
                  onClick={() => {
                    parent.insert("right", row, col);
                  }}
                >
                  <el-icon>
                    <CaretRight />
                  </el-icon>
                  插入右侧列
                </el-dropdown-item>
                <el-dropdown-item
                  onClick={() => {
                    parent.insert("up", row, col);
                  }}
                >
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                  插入上方行
                </el-dropdown-item>
                <el-dropdown-item
                  onClick={() => {
                    parent.insert("down", row, col);
                  }}
                >
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                  插入下方行
                </el-dropdown-item>
                <el-dropdown-item
                  divided
                  disabled={!parent.merge("left", row, col, true)}
                  onClick={() => {
                    parent.merge("left", row, col, false, (con) => {
                      ctx.emit("activateConF", con);
                    });
                  }}
                >
                  <el-icon>
                    <ArrowLeft />
                  </el-icon>
                  合并左侧单元格
                </el-dropdown-item>
                <el-dropdown-item
                  disabled={!parent.merge("right", row, col, true)}
                  onClick={() => {
                    parent.merge("right", row, col, false, (con) => {
                      ctx.emit("activateConF", con);
                    });
                  }}
                >
                  <el-icon>
                    <ArrowRight />
                  </el-icon>
                  合并右侧单元格
                </el-dropdown-item>
                <el-dropdown-item
                  disabled={!parent.merge("row", row, col, true)}
                  onClick={() => {
                    parent.merge("row", row, col, false, (con) => {
                      ctx.emit("activateConF", con);
                    });
                  }}
                >
                  合并整行
                </el-dropdown-item>
                <el-dropdown-item
                  divided
                  disabled={!parent.merge("up", row, col, true)}
                  onClick={() => {
                    parent.merge("up", row, col, false, (con) => {
                      ctx.emit("activateConF", con);
                    });
                  }}
                >
                  <el-icon>
                    <ArrowUp />
                  </el-icon>
                  合并上方单元格
                </el-dropdown-item>
                <el-dropdown-item
                  disabled={!parent.merge("down", row, col, true)}
                  onClick={() => {
                    parent.merge("down", row, col, false, (con) => {
                      ctx.emit("activateConF", con);
                    });
                  }}
                >
                  <el-icon>
                    <ArrowDown />
                  </el-icon>
                  合并下方单元格
                </el-dropdown-item>
                <el-dropdown-item
                  disabled={!parent.merge("col", row, col, true)}
                  onClick={() => {
                    parent.merge("col", row, col, false, (con) => {
                      ctx.emit("activateConF", con);
                    });
                  }}
                >
                  合并整列
                </el-dropdown-item>
                <el-dropdown-item
                  divided
                  onClick={() => {
                    parent.revocationMerge("row", row, col);
                  }}
                >
                  撤销行合并
                </el-dropdown-item>
                <el-dropdown-item
                  onClick={() => {
                    parent.revocationMerge("col", row, col);
                  }}
                >
                  撤销列合并
                </el-dropdown-item>
                <el-dropdown-item
                  divided
                  disabled={!parent.merge("col", row, col, true)}
                  onClick={() => {
                    parent.delete("col", row, col);
                  }}
                >
                  <el-icon>
                    <DeleteFilled />
                  </el-icon>
                  删除整列
                </el-dropdown-item>
                <el-dropdown-item
                  disabled={!parent.merge("row", row, col, true)}
                  onClick={() => {
                    parent.delete("row", row, col);
                  }}
                >
                  <el-icon>
                    <DeleteFilled />
                  </el-icon>
                  删除整行
                </el-dropdown-item>
              </el-dropdown-menu>
            );
          },
        }}
      </el-dropdown>,
    ];
  }

  renderRaw({ ctx, formConfig, cons, activateCon, formData }) {
    return formData ? (
      this.childs.map((con) => {
        return (
          <Item
            key={con.key}
            parent={this}
            formConfig={formConfig}
            formData={formData}
            cons={cons}
            con={con}
            preview
          />
        );
      })
    ) : (
      <DraggableCon
        parent={this}
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

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments);
    hasEditor &&
      _.find((_) => _.title == "常用属性").childs.unshift(
        ...[
          {
            label: "边框宽度",
            editor: (
              <el-input-number
                size="small"
                model-value={this.borderWidth}
                onChange={(_) => {
                  this.borderWidth = _;
                }}
              />
            ),
          },
          {
            label: "边框颜色",
            editor: (
              <el-color-picker
                model-value={this.borderColor}
                onChange={(v) => {
                  this.borderColor = v;
                }}
                predefine={predefineColors}
                size="small"
              />
            ),
          },
        ]
      );
    return _;
  }
}

/**
 * 表格
 */
export class Table extends Layout {
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

  initConfig(configs, toCons) {
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
   * @param {'left'|'right'|'up'|'down'} type
   * @param {number} row
   * @param {number} col
   */
  insert(type, row, col) {
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
   * @param {'left'|'right'|'up'|'down'|'row'|'col'} type
   * @param {number} row
   * @param {number} col
   * @param {boolean} judge 是否只是判断
   * @param {(con: BaseCon)=>{}} activateConF
   */
  merge(type, row, col, judge = false, activateConF) {
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
            activateConF(target);
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
            activateConF(target);
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
   * @param {'row'|'col'} type
   * @param {number} row
   * @param {number} col
   */
  revocationMerge(type, row, col) {
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
   * @param {'row'|'col'} type
   * @param {number} row
   * @param {number} col
   */
  delete(type, row, col) {
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

  getHandler() {
    let _ = super.getHandler(...arguments);
    _.splice(
      -1,
      0,
      ...[
        <el-icon
          title="插入新行"
          onClick={(e) => {
            e.stopPropagation();
            let colNum = Math.max(...this.list.map((_) => _.length));
            this.list.push(new Array(colNum).fill(0).map(() => new Cell()));
          }}
        >
          <CaretBottom />
        </el-icon>,
        <el-icon
          title="插入新列"
          onClick={(e) => {
            e.stopPropagation();
            this.list.forEach((_) => {
              _.push(new Cell());
            });
          }}
        >
          <CaretRight />
        </el-icon>,
      ]
    );
    return _;
  }

  renderRaw(op) {
    return (
      <div class={["controls__ table", op.formData ? "preview" : ""].join(" ")}>
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
                        {__.render(
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

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments);
    hasEditor &&
      _.find((_) => _.title == "常用属性").childs.unshift(
        ...[
          {
            label: "边框宽度",
            editor: (
              <el-input-number
                size="small"
                model-value={this.borderWidth}
                onChange={(_) => {
                  this.borderWidth = _;
                }}
              />
            ),
          },
          {
            label: "边框颜色",
            editor: (
              <el-color-picker
                model-value={this.borderColor}
                onChange={(v) => {
                  this.borderColor = v;
                }}
                predefine={predefineColors}
                size="small"
              />
            ),
          },
        ]
      );
    return _;
  }
}
