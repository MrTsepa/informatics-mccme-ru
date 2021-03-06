import React from 'react';
import styled  from 'styled-components';
import { palette } from 'styled-theme';

import { STATUSES } from '../../constants';
import Tooltip from '../../components/utility/Tooltip';
import { borderRadius, transition } from '../../isomorphic/config/style-util';


const StatusWrapper = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  cursor: default;
  
  > * {
    background: black;
    background: ${props => ({
      'orange': palette('other', 3),
      'green': palette('other', 4),
      'blue': palette('other', 5),
    })[props.color]};
  }
  
  .statusShort {
    margin: auto;
    width: 30px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    ${borderRadius('10px')}
    ${transition()}
    div { opacity: 1; }
    
    &.collapsed {
      width: 8px;
      height: 8px;
      ${borderRadius('10px')}
      div { opacity: 0; } 
    }
  } 
`;

export default ({status, collapsed}) => (
  <StatusWrapper color={STATUSES[status].color}>
    <Tooltip placement="right" title={STATUSES[status].long}>
      <div
        className={`statusShort ${collapsed ? 'collapsed' : ''}`}
      >
        <div>{STATUSES[status].short}</div>
      </div>
    </Tooltip>
  </StatusWrapper>
);
