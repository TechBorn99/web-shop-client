import { Collapse } from 'antd';
import React from 'react';

interface WebShopCollapseProps {
  header: string;
  className?: string;
  children: any[];
}

const { Panel } = Collapse;

const WebShopCollapse = ({
  header,
  className,
  children,
}: WebShopCollapseProps) => {
  return (
    <Collapse>
      <Panel key={header} header={header} className={className}>
        {children}
      </Panel>
    </Collapse>
  );
};

export default WebShopCollapse;
