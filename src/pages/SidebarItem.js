import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  padding: 30px;
  font-size: 18px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

function SidebarItem({ menu }) {
  return (
    <Item>
      {menu.name}
    </Item>
  );
}

export default SidebarItem;