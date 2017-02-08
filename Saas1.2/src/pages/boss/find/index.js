"use strict";

import React from 'react';
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
} from 'react-weui';

export default class MsgDemo extends React.Component {
    render() {
        return (
        <div className="findBodys findBoxs">
            <Panel>
                <PanelBody>
                    <MediaBox type="small_appmsg">
                        <Cells access>
                            <Cell href="#share">
                                <CellHeader><i className='findIcos fenx'></i></CellHeader>
                                <CellBody>
                                    <p>分享店铺</p>
                                </CellBody>
                                <CellFooter />
                            </Cell>
                        </Cells>
                    </MediaBox>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody>
                    <MediaBox type="small_appmsg">
                        <Cells access>
                            <Cell href="#clueBag">
                                <CellHeader><i className='findIcos clue-bag'></i></CellHeader>
                                <CellBody>
                                    <p>线索加油包</p>
                                </CellBody>
                                <CellFooter />
                            </Cell>
                        </Cells>
                    </MediaBox>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody>
                    <MediaBox type="small_appmsg">
                        <Cells access>
                            <Cell href="#account">
                                <CellHeader><i className='findIcos manage'></i></CellHeader>
                                <CellBody>
                                    <p>账号管理</p>
                                </CellBody>
                                <CellFooter/>
                            </Cell>
                        </Cells>
                    </MediaBox>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody>
                    <MediaBox type="small_appmsg">
                        <Cells access>
                            <Cell href="#feedback">
                                <CellHeader><i className='findIcos'></i></CellHeader>
                                <CellBody>
                                    <p>意见反馈</p>
                                </CellBody>
                                <CellFooter/>
                            </Cell>
                        </Cells>
                    </MediaBox>
                </PanelBody>
            </Panel>
        </div>
        );
    }
};
