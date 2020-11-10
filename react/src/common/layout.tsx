/**
 * 定义全局通用样式标签
 */
import styled from 'styled-components';
import { appTheme } from "./constants";
// import logo from './logo.png';
// background-image:url(${logo});

export const Title = styled.span`
		font-family: "楷体",serif;
		font-weight:700;
		font-style: normal;
		font-size:22pt;
		text-indent:18px;
		display:flex;
		align-items: center;
		&:before{
            content:'';
			background-size:51px 42px;
			height:42px;
			width:51px;
		}
	`;

export const Main = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    width:100%;
`;

export const Content = styled.div`
    display:flex;
    flex-direction:row;
    height:100%;
    width:100%;
    overflow:hidden;
`;


export const MainDivLoading = styled.div`
	position: fixed;
	left:0;
	top: 0;
	bottom: 0;
	right: 0;
	display:flex;
	justify-content: center;
	align-items: center;
`;
export const SpacerDiv = styled.div`
    flex: 1 1 0%;
    flex-basis: 0%;
`;

export const IconI = styled.i`
	color:${appTheme.btnColor};
`;

export const LinkBtn = styled.span<{ color: string }>`
	color: ${(props: any) => props.color};
	cursor:pointer;
	user-select:none;
	&:hover {
		text-decoration:underline;
	}
`;