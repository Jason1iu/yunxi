import pako from 'pako';
import React, { Component, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import ReactResizeDetector from 'react-resize-detector';

export interface JiaControlProps {
    offsetHeight?: number; // 减去的高度
    readOnly?: boolean;
    style?: CSSProperties;
    dictions?: any[]; // 代码字典
    id?: string; // canvas 元素的id
    data?: any; // jiagrid数据
    anchorCellClick?: (e: any) => void; // 超链接点击事件
    focusCellChanged?: (e: any) => void; // 焦点单元格改变事件
    cellValueChanged?: (e: any) => void; // 单元格值改变
    selectionChanged?: (e: any) => void; // 选中区域改变
    readOnlyCellRendering?: boolean;
    center?: boolean;
    afterSetGrid?: (e: any) => void;
    [key: string]: any;
}


export class JiaControl extends Component<JiaControlProps> {
    divRef: any;
    jiaControl: any;
    cavXGrid: any;
    divContainer: any;
    constructor(props: JiaControlProps) {
        super(props);
        this.jiaControl = null;
        this.divRef = React.createRef();
        if (this.props.forwardedRef && 'function' == typeof this.props.forwardedRef) {
            this.props.forwardedRef(this);
        }
    }
    getTableControl() {
        return this.jiaControl;
    }
    getGrid() {
        return this.jiaControl.getGrid();
    }
    getSelectionRange() {
        return this.jiaControl.getSelectionRange();
    }
    /**
     * 返回焦点单元格
     */
    getFocusedCell() {
        return this.jiaControl.getFocusedCell();
    }

    /**
     * 返回表格控件数据
     */
    getTableData(callback?: any) {
        if (!this.jiaControl) {
            return "";
        }
        const g = this.jiaControl.getGrid();
        if (callback && !callback(this.jiaControl.getGrid())) {
            return null;
        }
        const data = pako.gzip(JSON.stringify(g), { to: 'string' });
        return window.btoa(data);
    }
    /**
     * 插入行
     */
    insertRows(insertAtRow: number, count: number, insertAfter?: boolean) {
        this.jiaControl.insertRows(insertAtRow, count, insertAfter || true);
    }

    /**
     * 删除行
     */
    deleteRows(rowIndexFrom: number, rowIndexTo: number) {
        this.jiaControl.deleteRows(rowIndexFrom, rowIndexTo);
    }

    stopEdit() {
        if (!this.jiaControl) {
            return;
        }
        this.jiaControl.stopCellEditing();
    }

    componentDidUpdate(prevProps: Readonly<JiaControlProps>) {
        const Jiagrid = (window as any).JiaGrid;
        if (this.props.data != prevProps.data) {
            const data = 'string' === typeof this.props.data ? JSON.parse(this.props.data) : this.props.data;
            const grid = new Jiagrid.Grid(data);
            if (this.jiaControl) {
                this.jiaControl.setGrid(grid);
                if (this.props.afterSetGrid) {
                    this.props.afterSetGrid(this.jiaControl);
                }
            }
        }
        if (this.jiaControl && this.props.dictions != prevProps.dictions) {
            const dicts = new Jiagrid.Dictions(this.props.dictions);
            this.jiaControl.setDictions(dicts);
        }

        let invalidate = false;
        if (this.jiaControl && this.props.readOnly !== prevProps.readOnly) {
            this.jiaControl.setReadOnly(this.props.readOnly);
            invalidate = true;
        }
        if (this.jiaControl && this.props.readOnlyCellRendering !== prevProps.readOnlyCellRendering) {
            this.jiaControl.settings.readOnlyCellRendering = this.props.readOnlyCellRendering;
            invalidate = true;
        }
        if (invalidate)
            this.jiaControl.invalidate();

        if (this.jiaControl && this.props.center !== prevProps.center) {
            this.jiaControl.settings.horzCenter = this.props.center;
            this.jiaControl.recalcLayout();
        }
    }

    componentWillUnmount() {
        if (this.jiaControl && this.jiaControl.unmount)
            this.jiaControl.unmount();
    }

    componentDidMount() {
        this.ensureCreateJiaControl(this.divRef.current);
    }

    resize = (width: number, height: number) => {
        if (this.cavXGrid && this.jiaControl) {
            this.jiaControl.resizeTo(width, height);
            this.jiaControl.recalcLayout();
        }
    }
    render() {
        const style = Object.assign({ width: '100%', height: '100%', overflow: 'hidden' }, this.props.style);
        return (<div tabIndex={0} style={style} ref={this.divRef} >
            <ReactResizeDetector
                handleWidth={true}
                handleHeight={true}
                onResize={this.resize}
            />
        </div>);
    }

    ensureCreateJiaControl(dom: any): void {
        if (this.jiaControl) {
            return;
        }
        const div: any = ReactDOM.findDOMNode(dom);
        if (!div) {
            return;
        }
        this.divContainer = div;
        const cavXGrid = document.createElement("canvas");
        this.cavXGrid = cavXGrid;

        const width = div.clientWidth;
        const height = div.clientHeight;
        cavXGrid.setAttribute("width", width);
        cavXGrid.setAttribute("height", height);
        div.appendChild(cavXGrid);
        const Jiagrid = (window as any).JiaGrid;
        const gw = new Jiagrid.GridControl(cavXGrid);
        gw.setReadOnly(this.props.readOnly);
        this.jiaControl = gw;

        // 设置控件背景色
        //this.jiaControl.settings.gridBgColor = new Jiagrid.Color(245, 245, 245);
        this.jiaControl.settings.columnHeaderHeight = 0;
        this.jiaControl.settings.rowHeaderWidth = 0;
        this.jiaControl.settings.showFreezeLines = false;
        this.jiaControl.settings.gridBgColor = new Jiagrid.Color(255, 255, 255);
        let center = true;
        if (this.props.center !== undefined) {
            center = this.props.center;
        }
        this.jiaControl.settings.horzCenter = center;
        if (this.props.readOnlyCellRendering !== undefined) {
            this.jiaControl.settings.readOnlyCellRendering = this.props.readOnlyCellRendering;
        }
        const dictions = this.props.dictions;
        if (dictions) {
            const dicts = new Jiagrid.Dictions(dictions);
            this.jiaControl.setDictions(dicts);
        }
        if (this.props.data) {
            const data = 'string' === typeof this.props.data ? JSON.parse(this.props.data) : this.props.data;
            const grid = new Jiagrid.Grid(data);
            gw.setGrid(grid);
            if (this.jiaControl && this.props.afterSetGrid) {
                this.props.afterSetGrid(this.jiaControl);
            }
        }
        if (this.props.anchorCellClick) {
            gw.addEventListener("AnchorCellClick", this.props.anchorCellClick);
        }
        if (this.props.focusCellChanged) {
            gw.addEventListener("FocusCellChanged", this.props.focusCellChanged);
        }
        if (this.props.cellValueChanged) {
            gw.addEventListener("CellValueChanged", this.props.cellValueChanged);
        }
        if (this.props.selectionChanged) {
            gw.addEventListener("SelectionChanged", this.props.selectionChanged);
        }
    }
}
