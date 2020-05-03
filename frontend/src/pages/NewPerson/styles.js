import styled, { css } from 'styled-components';

const dragActive = css`
    border-color: #78e5d5;
`;

const dragReject = css`
    border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
    className: "dropzone"
})`
    margin-top: 10px;
    border: 2px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;
    height: 190px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: height 0.2s ease;

    ${props => props.isDragActive && dragActive};
    ${props => props.isDragReject && dragReject};
`;

const messageColors = {
    default: '#999',
    error: '#e57878',
    success: '#78e5d5'
};

export const UploadMessage = styled.p`
    color: ${props => messageColors[props.type || 'default']};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0px;
`;

export const Preview = styled.div`
    width: 36px;
    height: 36px;
    border raius: 5px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    margin-right: 10px;   
`