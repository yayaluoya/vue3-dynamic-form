import { BaseCon } from "./BaseCon";
import DraggableCon from "../com/draggable.vue";
import "../style/table.scss";

/**
 * 单元格
 */
class Cell extends BaseCon {
  /** 控件类型 */
  static ConType = "Cell";
  /** 控件名字 */
  static ConName = "单元格";

  towable = false;
  colspan = 1;
  rowspan = 1;
  /** 消失 */
  disappear = false;

  /**
   *
   * @param {{parent: Table}} _
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
                  onClick={() => {
                    parent.merge("left", row, col, (con) => {
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
                  onClick={() => {
                    parent.merge("right", row, col, (con) => {
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
                  onClick={() => {
                    parent.merge("row", row, col, (con) => {
                      ctx.emit("activateConF", con);
                    });
                  }}
                >
                  合并整行
                </el-dropdown-item>
                <el-dropdown-item
                  divided
                  onClick={() => {
                    parent.merge("up", row, col, (con) => {
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
                  onClick={() => {
                    parent.merge("down", row, col, (con) => {
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
                  onClick={() => {
                    parent.merge("col", row, col, (con) => {
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

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  renderRaw({ ctx, formConfig, cons, activateCon }) {
    return (
      <div
        class={[
          "controls__ cell",
          activateCon?.key == this.key ? "" : "border",
        ].join(" ")}
      >
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
      </div>
    );
  }
}

/**
 * 表格
 */
export class Table extends BaseCon {
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
   * @param {(con: BaseCon)=>{}} activateConF
   */
  merge(type, row, col, activateConF) {
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
          if (target && !target.disappear && target.rowspan == on.rowspan) {
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
          if (target && !target.disappear && target.colspan == on.colspan) {
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
        break;
      case "col":
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

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  renderRaw(op) {
    return (
      <div class="controls__ table">
        <table>
          <tbody>
            {this.list.map((_, row) => {
              return (
                <tr key={row}>
                  {_.map((__, col) => {
                    return __.disappear ? null : (
                      <td key={col} colspan={__.colspan} rowspan={__.rowspan}>
                        {__.renderCol(
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
}
