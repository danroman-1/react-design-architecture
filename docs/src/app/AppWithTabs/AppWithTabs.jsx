import React from 'react';

import AppBar, { ActionArea } from 'react-md/AppBar';
import { IconButton } from 'react-md/Buttons';
import { Tabs, Tab } from 'react-md/Tabs';
import { numstr } from '../utils';

const AppWithTabs = ({ centered = false, scrollable = false, fixedWidth = false }) => {
  return (
    <AppBar
      primary
      menuButton={<IconButton className="menu-btn">menu</IconButton>}
      title="Page title"
      actionsRight={(
        <ActionArea>
          <IconButton>search</IconButton>
          <IconButton>more_vert</IconButton>
        </ActionArea>
      )}
      >
      <Tabs primary centered={centered} scrollable={scrollable} fixedWidth={fixedWidth}>
        {Array.apply(null, new Array(scrollable ? 9 : 3)).map((_, i) => (
        <Tab
          key={i}
          label={`Item ${numstr[i]}`}
          >
          <div style={{ minHeight: '80px' }} />
        </Tab>
        ))}
      </Tabs>
    </AppBar>
  );
};

export default AppWithTabs;
