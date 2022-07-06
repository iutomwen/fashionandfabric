import React, { useState } from "react";
import {
  AppShell,
  Header,
  Footer,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import AppNavBar from "./AppNavBar";
import ApplicationLogo from "../Global/ApplicationLogo";
import { APPNAME } from "@/utils/constants";
import { Sun, MoonStars } from "tabler-icons-react";

export default function AppLayout({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<AppNavBar opened={opened} />}
      footer={
        <Footer height={60} p="md">
          {APPNAME} © {new Date().getFullYear()} All rights reserved.
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Group position="apart">
              <ApplicationLogo width={120} height={46} />
              <ActionIcon
                variant="default"
                onClick={() => toggleColorScheme()}
                size={30}
              >
                {colorScheme === "dark" ? (
                  <Sun size={16} />
                ) : (
                  <MoonStars size={16} />
                )}
              </ActionIcon>
            </Group>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
